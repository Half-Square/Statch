/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-04-14 16:25:32                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-14 19:22:35                               *
 *****************************************************************************/

import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityService {
  
  getPttActivitiesOnEdit(user: any, type: string, proj: any, body: any) {
    let activities = []
    if (proj.name != body.name)
      activities.push({ txt: "set name to "+body.name})
    if (proj.description != body.description)
      activities.push({ txt: "edit description"})
    if (proj.status != body.status)
      activities.push({ txt: "set status to "+body.status})

    if (type == "project") {
      if (proj.actualVersion != body.actualVersion)
        activities.push({ txt: "set version to "+body.actualVersion})
    }

    if (type != "project") {
      if (proj.level != body.level)
        activities.push({ txt: "set level to "+body.level})
      if (proj.targetVersion && (!body.targetVersion))
        activities.push({  txt: "removing version"})
      else if (!proj.targetVersion && body.targetVersion && body.targetVersion.name)
        activities.push({ txt: "set version to "+body.targetVersion.name})
      else if (proj.targetVersion && proj.targetVersion.name &&
             body.targetVersion && body.targetVersion.name && 
             proj.targetVersion.name != body.targetVersion.name)
             activities.push({ txt: "set version to "+body.targetVersion.name})
    }
    
    let assignments = proj.assignments.map((el) => el.user)
    if (assignments?.length < body.assignments?.length) {
      let newAssigned = body.assignments.filter(({ id: id1 }) => !assignments.some(({ id: id2 }) => id2 === id1));
      activities.push(newAssigned[0].id == user.id ? { txt: "assigned himself" } : 
      { txt: "assigned ", target: newAssigned[0].id })        
    } else if (assignments?.length > body.assignments?.length) {
      let delAssigned = assignments.filter(({ id: id1 }) => !body.assignments.some(({ id: id2 }) => id2 === id1));
      activities.push(delAssigned[0].id == user.id ? { txt: "unassigned himself" } : 
      { txt: "unassigned ", target: delAssigned[0].id })        
    }

    let labels = proj.labels.map((el) => el.label)
    if (labels?.length < body.labels?.length) {
      let newLabel = body.labels.filter(({ id: id1 }) => !labels.some(({ id: id2 }) => id2 === id1));
      activities.push({ txt: "label "+newLabel[0].name+" added" })        
    } else if (labels?.length > body.labels?.length) {
      let delLabel = labels.filter(({ id: id1 }) => !body.labels.some(({ id: id2 }) => id2 === id1));
      activities.push({ txt: "label "+delLabel[0].name+" deleted" })        
    }

    return activities;
  }

}
