/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-09-20 15:37:10                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:39:02                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Guards
  * Dto
  * Get all labels
  * Get label by id
  * Create label
  * Edit label
  * Delete label
*/

/* Imports */
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  SetMetadata
} from "@nestjs/common";
/***/

/* Services */
import { SocketService } from "src/services/socket/socket.service";
import { PrismaService } from "src/prisma.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
import { IsPermissionsGuard } from "src/guards/is-perms.guard";
/***/

/* Dto */
import * as labelsDto from "./labels.dto";
import { Label } from "@prisma/client";
/***/

@Controller("api/labels")
@UseGuards(IsConnectedGuard)
export class LabelsController {
  constructor(private prisma: PrismaService,
              private socket: SocketService) {
  }

  /**
  * Get all labels
  * @return - Labels list 
  */
  @Get()
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "labels", actions: ["view"]}])
  async getAll(): Promise<Label[]> {
    return await this.prisma.label.findMany();
  }
  /***/

  /**
  * Get label by id
  * @param id - Label's id
  * @return - Label data
  */
  @Get("/:id")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "labels", actions: ["view"]}])
  async getById(@Param("id") id: string): Promise<Label> {
    let label = await this.prisma.label.findFirst({where: {id: id}});
    if (label) return label;
    else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }
  /***/

  /**
  * Create label
  * @param body - Label content
  * @return - New label 
  */
  @Post("")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "labels", actions: ["create"]}])
  async create(@Body() body: labelsDto.CreateInput): Promise<Label> {
    let label = await this.prisma.label.create({
      data: body
    });

    this.socket.broadcast("labels", label);
    return label;
  }
  /***/

  /**
  * Edit label
  * @param id - Label to update
  * @param body - Data to update 
  * @return - Update label
  */
  @Put(":id")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "labels", actions: [{type: "update", actions: ["name", "description"]}]}])
  async update(@Param("id") id: string, @Body() body: labelsDto.UpdateInput): Promise<Label> {
    let label =  await this.prisma.label.update({
      where: {id: id},
      data: body
    });

    this.socket.broadcast("labels", label);
    return label;
  }
  /***/

  /**
  * Delete label
  * @param id - Label to delete
  * @return - Message 
  */
  @Delete("/:id")
  @UseGuards(IsPermissionsGuard)
  @SetMetadata("permissions", [{type: "labels", actions: ["delete"]}])
  async delete(@Param("id") id: string): Promise<{message: string}> {
    await this.prisma.label.delete({where: {id: id}});
    this.socket.broadcast("labels", {id: id}, true);
    return {message: `Label ${id} has been removed`};
  }
  /***/
}
