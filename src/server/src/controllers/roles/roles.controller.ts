/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-13 14:10:50                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:19:38                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Guards
  * Get all roles
  * Get on role by id
  * Create new role
  * Update role
  * Delete role
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
  @SetMetadata("permissions", [{type: "permissions", actions: ["view"]}])
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
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "permissions", actions: ["view"]}])
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
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "permissions", actions: ["create"]}])
  async create(
    @Body() body: rolesDTO.CreateInput): Promise<Role> {
    try {      
      const newRole = await this.prisma.role.create({
        data: {
          name: body.name,
          permissions: JSON.stringify(body.permissions),
          users: body.users ? {
            connect: body.users.map(el => {
              return el;
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
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "permissions", actions: ["update"]}])
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
            connect: body.users.map(el => {
              return el;
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
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "permissions", actions: ["delete"]}])
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
