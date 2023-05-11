/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-03-17 17:24:53                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-05-11 16:29:07                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
*/

/* Imports */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/***/

/* Services */
import { ApiService } from 'src/app/services/api/api.service';
/***/

/* Interfaces */
import { TaskInterface } from 'src/app/services/project-list/project-list.service';
/***/

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  constructor(private api: ApiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public parentId: string = "";
  public taskList: Array<TaskInterface>= new Array<TaskInterface>;

  ngOnInit() {
    this.route.queryParams.subscribe((query) => {
      this.parentId = query["id"] || "";
      let prefix = this.parentId ? `projects/${this.parentId}/` : "";
      this.api.request("GET", `${prefix}tasks?id=${this.parentId}`).then((ret) => {
        this.taskList = ret;
      }).catch((err) => {
        console.error(err);
      });
    });
  }

  async openNewTask(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.api.request("POST", `projects/${this.parentId}/tasks`, {
        name: "New task",
        description: "My awesome new task"
      }).then((ret: any) => {
        if (ret.id)
          this.router.navigate(["/task/", ret.id ])
        else
          console.error("New task 1 error >> "+ret)
      }).catch((error: any) => {
        console.error("New task 2 error >> "+error)
      })
    })
  }
}
