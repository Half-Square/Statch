/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:25:08                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 20:38:40                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api/api.service';


export interface ProjectInterface {
  name: string,
  description: string,
  id: string,
  status: string,
  created: string,
  version: string,
  tasks: Array<TaskInterface>
}

export interface TaskInterface {
  name: string,
  description: string,
  id: string,
  status: string,
  created: string,
  tickets: Array<TicketInterface>
}

export interface TicketInterface {
  name: string,
  description: string,
  id: string,
  created: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  private static api: ApiService = new ApiService();

  private static projectList: Array<ProjectInterface>;

  public static projectListChange:
    Subject<Array<ProjectInterface>> = new Subject<Array<ProjectInterface>>();

  public static get projects(): Array<ProjectInterface> {
    if (!this.projectList) {
      this.getProjectList();
      return new Array<ProjectInterface>
    }
    return this.projectList;
  }

  public static getProjectList(): Promise<Array<ProjectInterface>> {
    console.log("getProjectList");

    return new Promise<Array<ProjectInterface>>((resolve, reject) => {
      this.api.request("GET", "projects")
      .then((ret: Array<ProjectInterface>) => {
        let map: any = {};

        if (this.projectList)
          this.projectList.forEach((project) => {
              map[project["id"]] = project;
          });
        if (ret)
          ret.forEach((project) => {
              map[project["id"]] = project;
          });
        this.projectList = Object.values(map);
        this.projectListChange.next(this.projectList);
        return ret
      })
    })
  }


  public static async getProject(projectId: string): Promise<ProjectInterface> {
    return new Promise<ProjectInterface>((resolve, reject) => {
      this.api.request("GET", "projects/"+projectId)
      .then((ret: ProjectInterface) => {
        let changed = false
        this.projectList.forEach(project => {
          if (projectId == project.id) {
            project = ret;
            changed = true;
          }
        });
        if (!changed)
          this.projectList.push(ret)

        this.projectListChange.next(this.projectList);
        return resolve(ret)
      }).catch((err) => {
        return reject(err)
      })
    })
  }
}
