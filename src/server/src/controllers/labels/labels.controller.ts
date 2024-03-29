/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-20 15:37:10                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2024-01-31 17:08:52                               *
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
  UseGuards
} from "@nestjs/common";
/***/

/* Services */
import { SocketService } from "src/services/socket/socket.service";
import { PrismaService } from "src/prisma.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
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
  @UseGuards(IsConnectedGuard)
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
  @UseGuards(IsConnectedGuard)
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
  @UseGuards(IsConnectedGuard)
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
  @UseGuards(IsConnectedGuard)
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
  @UseGuards(IsConnectedGuard)
  async delete(@Param("id") id: string): Promise<{message: string}> {
    await this.prisma.label.delete({where: {id: id}});
    this.socket.broadcast("labels", {id: id}, true);
    return {message: `Label ${id} has been removed`};
  }
  /***/
}
