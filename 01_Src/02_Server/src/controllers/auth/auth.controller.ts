/*
* Filename: auth.controller.ts
* Author: Jbristhuille
* Date: Tue Feb 21 2023 11:50:29
*
* Description: Authentication endpoint
*/

/* SUMMARY
  * Imports
  * Dto
  * getAll
  * register
*/

/* Imports */
import { Controller, Post, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import { sha256 } from 'js-sha256';
import { PrismaService } from 'src/prisma.service';
/***/

/* Dto */
import * as usersDto from '../../dto/users.dto';
/***/

@Controller()
export class AuthController {
  constructor(private prisma: PrismaService) { 
  }

  /**
  * Get all users
  * @returns - List of all user public informations 
  */
  @Get('users')
  async getAll(): Promise<usersDto.PublicOutput[]> {
    try {
      const res = await this.prisma.user.findMany({});
      return res.map((el) => new usersDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Register new user 
  * @param name - User's name
  * @param email - User's email
  * @param password - User's password
  * @returns - New registered user details
  */
  @Post('users')
  async register(@Body() body: usersDto.RegisterInput): Promise<usersDto.DetailsOutput> {
    try {
      let passwd = String(sha256(body.password));
      const res = await this.prisma.user.create({
        data: {
          name: body.name,
          password: passwd,
          email: body.email
        }
      });
      return new usersDto.DetailsOutput(res); // tmp
    } catch (err) {
      if (err.code == "P2002") {
        throw new HttpException("Email Already Exist", HttpStatus.NOT_ACCEPTABLE)
      } else {
        console.error(`${new Date().toISOString()} - ${err}`);
        throw err;
      }
    }
  }
  /***/
}
