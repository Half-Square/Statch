/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-06-13 14:10:50                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-06-13 17:31:06                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Get all projects
*/

/* Imports */
import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { Project } from "@prisma/client";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

@Controller("api/projects")
export class ProjectsController {
  constructor(private prisma: PrismaService) {
  }

  /**
  * Get all projects
  * @return - Projects list 
  */
  @Get()
  async getAll(): Promise<Project[]> {
    try {
      return await this.prisma.project.findMany();
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Get on project by id
  * @param id - Project's id to get
  * @return - Project data 
  */
  @Get(":id")
  async getById(@Param("id") id: string): Promise<Project> {
    try {
      const ret = await this.prisma.project.findUnique({where: {id: id}});
      if (ret) return ret;
      else throw new HttpException(`Project ${id} Not Found`, HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }
  /***/
}
