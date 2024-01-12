/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2024-01-12 11:39:28                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2024-01-12 15:14:01                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Get number of child task in project
  * Get number of child tasks in project by status
  * Get number of child tasks in project by owner
  * Get number of new tasks by month
*/

/* Imports */
import { Injectable } from "@nestjs/common";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {
  }

  /**
  * Get number of child task in project
  * @param id - Project id
  * @return - Number of tasks 
  */
  public nbTasks(id: string): Promise<number> {
    return this.prisma.task.count({where: {projectId: id}});
  }
  /***/

  /**
  * Get number of child tasks in project by status
  * @param id - Project id
  * @return - Number of tasks by status 
  */
  public async nbTasksStatus(id: string): Promise<{name: string, nb: number}[]> {
    let ret = await this.prisma.task.groupBy({
      where: {projectId: id},
      by: ["status"],
      _count: {
        _all: true
      }
    });

    return ret.map((el) => ({
      name: el.status,
      nb: el._count._all
    }));
  }
  /***/

  /**
  * Get number of child tasks in project by owner
  * @param id - Project id
  * @return - Number of tasks by status 
  */
  public async nbTasksOwner(id: string): Promise<{id: string, nb: number}[]> {
    let ret = await this.prisma.task.groupBy({
      where: {projectId: id},
      by: ["ownerId"],
      _count: {
        _all: true
      }
    });

    return ret.map((el) => ({
      id: el.ownerId,
      nb: el._count._all
    }));
  }
  /***/

  /**
  * Get number of new tasks by month 
  * @param id - Project id
  * @return - New tasks number by month
  */
  public async nbNewTasksByMonth(id: string): Promise<{year: number, tasks: number[]}[]> {
    let tasks = await this.prisma.task.findMany({where: {projectId: id}});
    let ret: {year: number, tasks: number[]}[] = [];

    tasks.forEach((task) => {
      let year = task.created.getFullYear();
      let i = ret.findIndex((el) => el.year === year);

      if (i == -1) {
        ret.push({year: year, tasks: new Array(12).fill(0)});
        i = ret.length-1;
      }

      ret[i].tasks[task.created.getMonth()] += 1;
    });

    return ret.sort((a, b) => b.year - a.year);
  }
  /***/
}
