/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-09-27 09:48:39                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-07-26 15:43:51                               *
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
import { ActivitiesService } from "./activities.service";
/***/

@Controller("api")
@UseGuards(IsConnectedGuard)
export class ActivitiesController {
  constructor(private prisma: PrismaService,
              private activities: ActivitiesService) {
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
      return this.activities.formatAssignment(el);
    });
    
    let act = await this.prisma.activity.findMany({
      where: {
        OR: queries
      },
      orderBy: {created: "desc"}
    });
  
    return act.map((el) => this.activities.unFormat(el));
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

    return act.map((el) => {
      return this.activities.unFormat(el);
    });
  }
  /***/
}
