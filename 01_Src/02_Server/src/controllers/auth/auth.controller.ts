/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 13:01:19                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 13:53:25                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * getAll
  * getOne
  * register
  * activate
*/

/* Imports */
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Put
} from "@nestjs/common";
import { sha256 } from "js-sha256";
import { PrismaService } from "src/prisma.service";
import * as jwt from 'jsonwebtoken';
/***/

/* Dto */
import * as usersDto from "../../dto/users.dto";
/***/

@Controller()
export class AuthController {
  constructor(private prisma: PrismaService) { 
  }

  /**
  * Get all users
  * @returns - List of all user public informations 
  */
  @Get("users")
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
  * Get one user
  * @returns - User's details
  */
  @Get("users/:id")
  async getOne(@Param("id") id: string): Promise<usersDto.DetailsOutput> {
    try {
      const res = await this.prisma.user.findUnique({where: {id: id}});
      return new usersDto.DetailsOutput(res);
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
  @Post("users")
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
      return new usersDto.DetailsOutput(res);
    } catch (err) {
      if (err.code == "P2002") {
        throw new HttpException("Email Already Exist", HttpStatus.NOT_ACCEPTABLE);
      } else {
        console.error(`${new Date().toISOString()} - ${err}`);
        throw err;
      }
    }
  }
  /***/

  /**
  * Connect user
  * @param email - User's email
  * @param password - User's password
  * @returns - User connected details
  */
  @Post('login')
  async login(@Body() body: usersDto.ConnectInput): Promise<usersDto.ConnectOutput> {
    try {
      const res = await this.prisma.user.findUnique({where: {email: body.email}});
      if (!res) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      
      if (res.password !== sha256(body.password)) {
        throw new HttpException("Invalid Password", HttpStatus.BAD_REQUEST);
      }

      delete res.password;
      res['token'] = jwt.sign(res, process.env.SALT, {algorithm: 'HS256'});
      return new usersDto.ConnectOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Activate user
  * @returns - User's details
  */
  @Put("users/:id")
  async activate(@Param("id") id: string): Promise<usersDto.DetailsOutput> {
    try {
      const res = await this.prisma.user.update({
        data: {validate: true},
        where: {id: id} 
      });

      return new usersDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}
