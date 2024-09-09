/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2024-01-12 11:37:38                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2024-01-12 16:13:35                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Guards
  * Interfaces
  * Get stats for project
*/

/* Imports */
import {
  Controller,
  Get,
  Param,
  UseGuards
} from "@nestjs/common";
/***/

/* Services */
import { ILabelByMonth, StatsService } from "./stats.service";
/***/

/* Guards */
import { IsConnectedGuard } from "src/guards/is-connected.guard";
/***/

/* Interfaces */
interface IStats {
  tasks: {
    total: number,
    status: {name: string, nb: number}[],
    owners: {id: string, nb: number}[],
    newByMonth: {year: number, tasks: number[]}[],
    labels: {id: string, nb: number}[],
    versions: {id: string, nb: number}[],
    levels: {name: string, nb: number}[],
    labelByMonth: ILabelByMonth[]
  }
}
/***/

@Controller("api")
@UseGuards(IsConnectedGuard)
export class StatsController {
  constructor(private stats: StatsService) {
  }

  /**
  * Get stats for project
  * @param id - Projet id 
  * @return - Stats for project
  */
  @Get("projects/:id/stats")
  async getProjectStats(@Param("id") id: string): Promise<IStats> {
    return {
      tasks: {
        total: await this.stats.nbTasks(id),
        status: await this.stats.nbTasksByStatus(id),
        owners: await this.stats.nbTasksByOwner(id),
        newByMonth: await this.stats.nbNewTasksByMonth(id),
        labels: await this.stats.nbTasksByLabel(id),
        versions: await this.stats.nbTasksByVersion(id),
        levels: await this.stats.nbTasksByLevel(id),
        labelByMonth: await this.stats.nbTasksByLabelByMont(id)
      }
    };
  }
  /***/
}
