/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-13 14:10:50                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-11-16 17:29:36                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Guards
  * Get all projects
  * Get on project by id
  * Create new project
  * Update project
  * Delete project
*/

/* Imports */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  SetMetadata
} from "@nestjs/common";
import { Role } from "@prisma/client";
/***/

/* DTO */
import * as rolesDTO from "./roles.dto";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
import { SocketService } from "src/services/socket/socket.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
import { IsPermissionsGuard } from "src/guards/is-perms.guard";
/***/

@Controller("api/roles")
@UseGuards(IsConnectedGuard)
export class RolesController {
  constructor(private prisma: PrismaService,
              private socket: SocketService) {
  }

  /**
  * Get all roles
  * @return - Roles list 
  */
  @Get()
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "projects", actions: ["create", "delete"]}])
  async getAll(): Promise<Role[]> {
    try {
      return await this.prisma.role.findMany({
        include: {
          users: true
        }
      });
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Get on role by id
  * @param id - Role's id to get
  * @return - Role data 
  */
  @Get(":id")
  async getById(@Param("id") id: string): Promise<Role> {
    try {
      const ret = await this.prisma.role.findUnique({
        where: {id: id},
        include: {
          users: true
        }
      });
      if (ret) return ret;
      else throw new HttpException(`Role ${id} Not Found`, HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Create new role
  * @param data - New role data 
  */
  @Post()
  async create(
    @Body() body: rolesDTO.CreateInput): Promise<Role> {
    try {      
      const newRole = await this.prisma.role.create({
        data: {
          name: body.name,
          permissions: JSON.stringify(body.permissions),
          users: body.users ? {
            create: body.users.map((el) => {
              return {userId: el.userId};
            })
          } : undefined
        },
        include: {
          users: true
        }
      });

      this.socket.broadcast("roles", newRole);
      return newRole;
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Update role
  * @param id - Role to update
  * @param body - Data to update 
  */
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: rolesDTO.UpdateInput): Promise<Role> {
    try {
      const role = await this.prisma.role.update({
        where: {id: id},
        data: {
          ...body,
          users: body.users ? {
            deleteMany: {},
            create: body.users.map((el) => {
              return {userId: el.userId};
            })
          } : undefined
        },
        include: {
          users: true
        }
      });

      this.socket.broadcast("roles", role);
      return role;
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Delete role
  * @param id - Role to delete
  * @return - Message success 
  */
  @Delete(":id")
  async deleteById(@Param("id") id: string): Promise<{message: string}> {
    try {
      await this.prisma.role.delete({where: {id: id}});
      this.socket.broadcast("roles", {id: id}, true);

      return {message: `Roles ${id} deleted`};
    } catch (err) {
      throw err;
    }
  }
  /***/
}
