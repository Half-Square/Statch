/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-25 13:32:36                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-03 10:36:28                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Check if element has child
*/

/* Imports */
import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
import { RecoveryService } from "src/app/services/recovery.service";
/***/

/* Interfaces */
import { IAssignments, IProjects, ITasks, ITickets } from "src/app/interfaces";
/***/

@Component({
  selector: "view-my-tasks",
  templateUrl: "./my-tasks.view.html",
  styleUrls: ["./my-tasks.view.scss"]
})
export class MyTasksView implements OnInit {
  public sub: {projects: IProjects[], tasks: ITasks[], tickets: ITickets[]};
  public _ = _;
  private open: string[] = [];

  constructor(private recovery: RecoveryService,
              private api: RequestService,
              private user: UserService) {
  }

  async ngOnInit(): Promise<void> {
    const user = this.user.getUser();
    const projects = await this.recovery.getSync("projects");
    const tasks = await this.recovery.getSync("tasks");
    const tickets = await this.recovery.getSync("tickets");

    if (user) {
      this.api.get(`api/users/${user.id}/assignments`, user.token).then((data) => {
        this.sub = {
          projects: _. filter(data as IAssignments[], (el) => (
            el.projectId != null
          )).map((el) => (
            _.find(projects, (p: IAssignments) => p.id === el.projectId)
          )) as IProjects[],
          tasks: _.filter(data as IAssignments[], (el) => (
            el.taskId != null
          )).map((el) => (
            _.find(tasks, (ta: IAssignments) => ta.id === el.taskId)
          )) as ITasks[],
          tickets: _.filter(data as IAssignments[], (el) => (
            el.ticketId != null
          )).map((el) => (
            _.find(tickets, (ti: IAssignments) => ti.id === el.ticketId)
          )) as ITickets[]
        };
      });
    }
  }

  /**
  * Check if element has child
  * @param target - Potential child list
  * @param cond - Condition
  * @return - Boolean, child  or not
  */
  public hasChild(
    target: IProjects[] | ITasks[] | ITickets[],
    cond: {projectId?: string, taskId?: string}): boolean {
    if (_.find(target, cond)) return true;
    else return false;
  }
  /***/

  /**
  * Toggle collapse
  * @param id - Item's id
  */
  public toggleCollapse(id: string): void {
    let i = _.findIndex(this.open, (el) => el === id);
    if (i == -1) this.open.push(id);
    else delete this.open[i];

    this.open = _.filter(this.open, (el) => el != null); // clear array
  }
  /***/

  /**
  * Check if item is open
  * @param id - Parent id
  * @return - Boolean, open or not
  */
  public isOpen(id: string): boolean {
    return _.find(this.open, (el) => el === id) ? true :  false;
  }
  /***/
}
