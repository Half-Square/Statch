/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 14:25:08                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 14:30:31                               *
 *****************************************************************************/

import { Injectable } from '@angular/core';


export interface ProjectInterface {
  tasks: [ TaskInterface ]
}

export class TaskInterface {

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
