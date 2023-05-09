/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 13:01:19                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-30 12:49:49                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * getAll
  * getOne
  * register
  * activate
  * delete
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
  Put,
  UseGuards,
  Delete
} from "@nestjs/common";
import { sha256 } from "js-sha256";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import * as usersDto from "../../dto/users.dto";
import { ConnectedGuard } from "../../guards/connected/connected.guard";
import { IsAdminGuard } from "../../guards/is-admin/is-admin.guard";
/***/

/* Services */
import { PrismaService } from "../../prisma.service";
/***/

@Controller("api")
export class AuthController {
  constructor(private prisma: PrismaService) { 
  }

  /**
  * Get all users
  * @returns - List of all user public informations 
  */
  @Get("users")
  @UseGuards(ConnectedGuard)
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
  @UseGuards(ConnectedGuard)
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
  * Get one user
  * @returns - User's details
  */
  @Get("isadmin")
  @UseGuards(IsAdminGuard)
  async isAdmin(): Promise<boolean> {
    return true;
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
      let count = await (await this.prisma.user.findMany()).length;
      
      const res = await this.prisma.user.create({
        data: {
          name: body.name,
          password: passwd,
          email: body.email,
          validate: count === 0,
          isAdmin: count === 0 
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
  @Post("login")
  async login(@Body() body: usersDto.ConnectInput): Promise<usersDto.ConnectOutput> {
    try {
      const res = await this.prisma.user.findUnique({where: {email: body.email}});
      if (!res) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      

      if (res.password !== sha256(body.password)) {
        throw new HttpException("Invalid Password", HttpStatus.BAD_REQUEST);
      }

      if (!res.validate) throw new HttpException("Not validate yet", HttpStatus.BAD_REQUEST);

      delete res.password;
      
      res["token"] = jwt.sign(res, process.env.SALT, {
        algorithm: "HS256",
        expiresIn: process.env.SESSION_TIME
      });

      return new usersDto.ConnectOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  // /**
  // * Edit user
  // * @returns - User's details
  // */
  // @Put("users/:id")
  // @UseGuards(ConnectedGuard)
  // async editUser(@Param("id") id: string, @Body() body: usersDto.UpdateInput,): Promise<usersDto.DetailsOutput> {
  //   try {
  //     const res = await this.prisma.user.update({
  //       data: {validate: true},
  //       where: {id: id} 
  //     });

  //     return new usersDto.DetailsOutput(res);
  //   } catch (err) {
  //     console.error(`${new Date().toISOString()} - ${err}`);
  //     throw err;
  //   }
  // }
  // /***/

  /**
  * Activate user
  * @returns - User's details
  */
  @Put("users/:id/right")
  @UseGuards(IsAdminGuard)
  async activate(@Param("id") id: string,  @Body() body: usersDto.RightInput,): Promise<usersDto.DetailsOutput> {
    try {
      const res = await this.prisma.user.update({
        where: {id: id},
        data: body
      });

      return new usersDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Remove user by id
  * @returns - Success message
  */
  @Delete("users/:id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.prisma.user.delete({where: {id: id}}).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });

    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}
