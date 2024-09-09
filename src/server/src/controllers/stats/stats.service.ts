/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2024-01-12 11:39:28                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2024-01-12 17:03:42                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Get number of child task in project
  * Get number of child tasks in project by status
  * Get number of child tasks in project by owner
  * Get number of new tasks by month
  * Get number of tasks by labels
  * Get number of tasks by version
  * Get number of tasks by level
  * Get label distribution by month
*/

/* Imports */
import { Injectable } from "@nestjs/common";
import * as _ from "lodash";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

/* Interfaces */
export interface ILabelByMonth {
  year: number,
  month: {id: string, nb: number}[][]
}
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
  public async nbTasksByStatus(id: string): Promise<{name: string, nb: number}[]> {
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
  public async nbTasksByOwner(id: string): Promise<{id: string, nb: number}[]> {
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

  /**
  * Get number of tasks by label
  * @param id - Project id
  * @return - Number of tasks by label 
  */
  public async nbTasksByLabel(id: string): Promise<{id: string, nb: number}[]> {
    let tasks = await this.prisma.task.findMany({
      where: {projectId: id},
      include: {labels: true}
    });
    let ret: {id: string, nb: number}[] = [];

    tasks.forEach((task) => {
      task.labels.forEach((label) => {
        let i = ret.findIndex((el) => el.id == label.labelId);
        
        if (i == -1) {
          ret.push({
            id: label.labelId,
            nb: 0
          });

          i = ret.length-1;
        }
        
        ret[i].nb +=1;
      });
      
    });

    return ret;
  }
  /***/

  /**
  * Get number of tasks by version
  * @param id - Project id
  * @return - Number of tasks by version 
  */
  public async nbTasksByVersion(id: string): Promise<{id: string, nb: number}[]> {
    let ret = await this.prisma.task.groupBy({
      where: {projectId: id},
      by: ["targetVersionId"],
      _count: {
        _all: true
      }
    });

    return ret.map((el) => ({
      id: el.targetVersionId,
      nb: el._count._all
    }));
  }
  /***/

  /**
  * Get number of tasks by level
  * @param id - Project id
  * @return - number of tasks by level 
  */
  public async nbTasksByLevel(id: string): Promise<{name: string, nb: number}[]> {
    let ret = await this.prisma.task.groupBy({
      where: {projectId: id},
      by: ["level"],
      _count: {
        _all: true
      }
    });

    return ret.map((el) => ({
      name: el.level,
      nb: el._count._all
    }));
  }
  /***/

  /**
  * Get label distribution by month
  * @param id - Project id
  * @return - Status distribution by month
  */
  public async nbTasksByLabelByMont(id: string): Promise<ILabelByMonth[]> {
    let tasks = await this.prisma.task.findMany({
      where: {projectId: id},
      include: {labels: true}
    });
    let label = await this.nbTasksByLabel(id);
    let ret: ILabelByMonth[] = [];

    tasks.forEach((task) => {
      let i = ret.findIndex((el) => el.year == task.created.getFullYear());

      if (i == -1) {
        ret.push({
          year: task.created.getFullYear(),
          month: new Array(12)
        });

        i = ret.length-1;
        for(let m = 0; m < ret[i].month.length; m++) {
          ret[i].month[m] = _.cloneDeep(label).map((el) => ({...el, nb: 0}));
        }
      }
      
      task.labels.forEach((l) => {
        let index = ret[i].month[task.created.getMonth()].findIndex((el) => {
          return el.id == l.labelId;
        });
        

        if (index != -1) {
          ret[i].month[task.created.getMonth()][index].nb += 1;
        }
      });
    });

    return ret.sort((a, b) => b.year - a.year);
  }
  /***/
}
