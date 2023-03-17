/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:25:08                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 16:28:29                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';


export interface ProjectInterface {
  name: string,
  id: string,
  status: string,
  tasks: Array<TaskInterface>
}

export interface TaskInterface {
  name: string,
  id: string,
  status: string,
  tickets: Array<TicketInterface>
}

export interface TicketInterface {
  name: string,
  id: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  constructor() { }


  public static getProjectList(): Array<ProjectInterface> {
    return [];
  }
}
