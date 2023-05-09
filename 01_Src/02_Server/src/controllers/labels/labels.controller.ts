import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Headers,
  HttpException,
  HttpStatus,
  UseGuards,
  Delete
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

import * as labelsDto from "../../dto/labels.dto";

/* Services */
import {PrismaService} from "../../prisma.service";
/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-04-13 12:02:48                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 16:50:04                               *
 *****************************************************************************/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
/***/

@Controller("api/labels")
@UseGuards(ConnectedGuard)
export class LabelsController {
  constructor(private prisma: PrismaService) {}

  @Get("")
  async getAll(): Promise<labelsDto.PublicOutput[]> {
    try {
      const res = await this.prisma.label.findMany({});
      return res.map((el) => new labelsDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }

  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<labelsDto.DetailsOutput> {
    try {
      const res = await this.prisma.label.findUnique({ where: { id: id } });
      if (res) return new labelsDto.DetailsOutput(res);
      else throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }

  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body() body: labelsDto.UpdateInput,
    @Headers("x-token") token: string,
  ) : Promise<labelsDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);

      let res = await this.prisma.label.update({
        where: {
          id: id
        },
        data: {
          name: body.name,
          color: body.color,
          description: body.description, 
          activitys: {
            create: {
              authorId: user.id,
              action: "edited"
            }
          }
        }
      });
      return new labelsDto.DetailsOutput(res);
    } catch (err) {
      if (err.code === "P2025") {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      }
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }

  @Post("")
  async create(
    @Body() body: labelsDto.CreateInput,
    @Headers("x-token") token: string,
  ) : Promise<labelsDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);

      let toSave = { name: body.name, color: body.color, description: body.description, 
        activitys: {
          create: {
            authorId: user.id,
            action: "create"
          }
        }
      };

      const res = await this.prisma.label.create({
        data: toSave
      });
      return new labelsDto.DetailsOutput(res);
    } catch (err) {
      if (err.code == "P2003")
        throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
      else throw err;
    }
  }

  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<void> {
    try {
      await this.prisma.label.deleteMany({where: {id: id}}).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }

}
