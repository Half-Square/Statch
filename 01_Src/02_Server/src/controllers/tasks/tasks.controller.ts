/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:21:47                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 12:44:58                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Guards
  * getAll
  * getById
  * update
  * getAllFromProject
  * create
  * delete
*/

/* Imports */
import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
  UseGuards,
  Delete,
  Headers
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import {PrismaService} from "../../prisma.service";
import * as tasksDto from "../../dto/tasks.dto";
/***/

/* Guards */
import { ConnectedGuard } from "../../guards/connected/connected.guard";
import { Prisma } from "@prisma/client";
import { ActivityService } from "src/services/activity/activity.service";
/***/

@Controller("api")
@UseGuards(ConnectedGuard)
export class TasksController {
  constructor(private prisma: PrismaService,
              private activityService: ActivityService) {}

  /**
  * Get all tasks in database
  * @returns List of all tasks
  */
  @Get("tasks")
  async getAll(): Promise<tasksDto.PublicOutput[]> {
    try {
      let res = await this.prisma.task.findMany({include: {owner: true}});
      return res.map((el) => new tasksDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Get task by ID
  * @param id - Task's ID to get
  * @returns - Task details
  */
  @Get("tasks/:id")
  async getById(@Param("id") id: string): Promise<tasksDto.DetailsOutput> {
    try {
      let res = await this.prisma.task.findUnique({
        where: {id: id},
        include: {
          targetVersion: true,
          tickets: {
            orderBy: {
              targetVersion: {
                name: "desc"
              }
            },
            include: {
              owner: true,
              targetVersion: true,
              labels: {
                include: {label: true}
              }
            }
          },
          comments: {
            include: {author: true}, orderBy: { created: "asc"}
          },
          owner: true,
          assignments: {
            include: {user: true}
          },
          labels: {
            include: {label: true}
          },
          activitys: { orderBy: {created:  "desc" }, take: 8, include: {author: true, target: true, project: true, task: true, ticket: true} }
        }
      });

      if (res) return new tasksDto.DetailsOutput(res);
      else throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Update tasks
  * @param id - Task's ID to update
  * @param body - Data to update 
  * @returns - Updated task's details
  */
  @Put("tasks/:id")
  async update(
    @Param("id") id: string,
    @Body() body: tasksDto.UpdateInput,
    @Headers("x-token") token: string
  ): Promise<tasksDto.DetailsOutput> {
    try {    
      let user = jwt.verify(token, process.env.SALT);

      let includeQuery = {
        targetVersion: true,
        tickets: {
          orderBy: { targetVersion: { name: "desc" } },
          include: {
            owner: true,
            targetVersion: true
          }
        },
        comments: {
          include: {author: true}, orderBy: { created: "asc"}
        },
        owner: true,
        assignments: { include: {user: true} },
        labels: { include: {label: true} },
        activitys: { orderBy: {created:  "desc" }, take: 8, include: {author: true, target: true, project: true, task: true, ticket: true} }
      } as Prisma.TaskInclude;

      let task = await this.prisma.task.findUnique({
        where: { id: id}, include: includeQuery
      })

      let activities = this.activityService.getPttActivitiesOnEdit(user,'task', task, body)

      let res = await this.prisma.task.update({
        where: {id: id},
        data: {
          name: body.name,
          status: body.status,
          level: body.level,
          description: body.description,
          targetVersion: body.targetVersion && body.targetVersion.id ?{
            connect: { id: body.targetVersion.id }
          } : {},
          assignments: {
            deleteMany: {},
            create: body.assignments.map((el) => {
              return {userId: el.id};
            }) 
          },
          labels: {
            deleteMany: {},
            create: body.labels?.map(label => ({
              label: {
                connect: {
                  id: body.labels.find(t => t.id === label.id).id
                }
              }
            }))
          },
          activitys: {
            create: activities?.map(act =>  ({
              authorId: user.id,
              action: act.txt,
              targetId: act.target,
              projectId: task.projectId,
              labelId: act.label,
              type: act.type,
              value: act.value
            }))
          }
        },
        include: includeQuery
      });
      return new tasksDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Get all tasks in project
   * @param id - Project's ID
   * @returns - Tasks list in project
   */
  @Get("projects/:id/tasks")
  async getAllFromProject(
    @Param("id") id: string,
  ): Promise<tasksDto.PublicOutput[]> {
    try {
      let res = await this.prisma.task.findMany({
        where: {projectId: id},
        include: {owner: true}
      });
      return res.map((el) => new tasksDto.PublicOutput(el));
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
   * Create new task
   * @param id - Project's ID where create task
   * @param body - Creation data
   * @returns (Task) - Task's details
   */
  @Post("projects/:id/tasks")
  async create(
    @Param("id") id: string,
    @Headers("x-token") token: string,
    @Body() body: tasksDto.CreateInput,
  ): Promise<tasksDto.DetailsOutput> {
    try {
      let user = jwt.verify(token, process.env.SALT);
      let res = await this.prisma.task.create({
        data: {
          name: body.name,
          description: body.description,
          projectId: id,
          ownerId: user.id,
          assignments: {
            create: [{
              userId: user.id
            }]
          }
        },
        include: {
          targetVersion: true,
          comments: {
            include: {author: true}, orderBy: { created: "asc"}
          },
          tickets: {
            orderBy: {
              targetVersion: { name: "desc" }
            },
            include: {
              owner: true,
              targetVersion: true
            }
          },
          owner: true,
          assignments: {
            include: {user: true}
          },
          labels: {
            include: {label: true}
          },
          activitys: { orderBy: {created:  "desc" }, take: 8, include: {author: true, target: true, project: true, task: true, ticket: true} }
        }
      });

      await this.prisma.activity.create({ 
        data: {
          authorId: user.id,
          action: "create task",
          taskId: res.id,
          projectId: id
        }
      })
      return new tasksDto.DetailsOutput(res);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Delete task by id 
  */
  @Delete("tasks/:id")
  async delete(@Param("id") id: string): Promise<Object> {
    try {
      this.prisma.task.delete({where: {id: id}}).then(()=>{
        return {id: id};
      }).catch(() => {
        throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
      });
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
    return {id: ""};
  }
  /***/
}
