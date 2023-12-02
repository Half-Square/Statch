/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-27 09:48:39                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-12-02 16:51:27                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Guards
  * Get by target
  * Get by user
*/

/* Imports */
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Activity } from "@prisma/client";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

@Controller("api")
@UseGuards(IsConnectedGuard)
export class ActivitiesController {
  constructor(private prisma: PrismaService) {
  }

  /**
  * Get by user subscription
  * @param id - User's id 
  * @return - List of activities
  */
  @Get("users/:id/activities")
  async getByUser(@Param("id") id: string): Promise<Activity[]> {
    let ret = await this.prisma.assignment.findMany({where: {userId: id}});

    let queries = ret.map((el) => {
      let tmp = {projectId: el.projectId, tasksId: el.taskId, ticketId: el.ticketId};
      let ret = {type: "", id: ""};

      if (tmp.projectId) ret = {type: "projects", id: tmp.projectId};
      else if (tmp.tasksId) ret = {type: "tasks", id: tmp.tasksId};
      else if (tmp.ticketId) ret = {type: "tickets", id: tmp.ticketId};

      return {target: JSON.stringify(ret)};
    });
    
    let act = await this.prisma.activity.findMany({
      where: {
        OR: queries
      }
    });
  
    return act.map((el) => ({
      ...el,
      actor: JSON.parse(el.actor),
      action: JSON.parse(el.action),
      target: JSON.parse(el.target)
    }));
  }
  /***/

  /**
  * Get by target
  * @param parent - Projects, Tasks or Tickets
  * @param id - Target id 
  * @return - List of activities
  */
  @Get(":parent/:id/activities")
  async getByTarget(@Param("parent") parent: "projects" | "tasks" | "tickets", @Param("id") id: string): Promise<Activity[]> {
    let act = await this.prisma.activity.findMany({
      where: {
        OR: [
          {toPrint: id},
          {target: JSON.stringify({type: parent, id: id})}
        ]
      }
    });

    return act.map((el) => ({
      ...el,
      actor: JSON.parse(el.actor),
      action: JSON.parse(el.action),
      target: JSON.parse(el.target)
    }));
  }
  /***/
}
