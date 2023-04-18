/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-04-14 16:25:32                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 16:44:05                               *
 *****************************************************************************/

import { Injectable } from '@nestjs/common';

import * as projectsDto from "../../dto/projects.dto";
import * as tasksDto from "../../dto/tasks.dto";
import * as ticketsDto from "../../dto/tickets.dto";

@Injectable()
export class ActivityService {
  
  getPttActivitiesOnEdit(
    user: any, 
    oldPTT: projectsDto.PublicOutput | tasksDto.PublicOutput | ticketsDto.PublicOutput, 
    newPTT: any) {

    let activities = []
    if (oldPTT.name != newPTT.name)
      activities.push({ txt: "set", type: "name", value: newPTT.name })
    if (oldPTT.description != newPTT.description)
      activities.push({ txt: "edit description"})
    if (oldPTT.status != newPTT.status)
      activities.push({ txt: "set", type: "status", value: newPTT.status})

    if (oldPTT instanceof projectsDto.PublicOutput && newPTT instanceof projectsDto.UpdateInput) {
      if (oldPTT.actualVersion != newPTT.actualVersion)
        activities.push({ txt: "set", type: "version", value: newPTT.actualVersion})
    }

    if ((oldPTT instanceof tasksDto.PublicOutput ) || 
        (oldPTT instanceof ticketsDto.PublicOutput)) {
      if (oldPTT.level != newPTT.level)
        activities.push({ txt: "set", type: "level", value: newPTT.level})
      if (oldPTT.targetVersion && (!newPTT.targetVersion))
        activities.push({ txt: "removing version"})
      else if (!oldPTT.targetVersion && newPTT.targetVersion && newPTT.targetVersion.name)
        activities.push({ txt: "set", type: "version", value: newPTT.targetVersion.name})
      else if (oldPTT.targetVersion && oldPTT.targetVersion.name &&
             newPTT.targetVersion && newPTT.targetVersion.name && 
             oldPTT.targetVersion.name != newPTT.targetVersion.name)
             activities.push({ txt: "set", type: "version", value: newPTT.targetVersion.name})
    }
    
    if (oldPTT.assignments?.length < newPTT.assignments?.length) {
      let newAssigned = newPTT.assignments.filter(({ id: id1 }) => !oldPTT.assignments.some(({ id: id2 }) => id2 === id1));
      activities.push(newAssigned[0].id == user.id ? { txt: "assigned himself" } : 
      { txt: "assigned ", target: newAssigned[0].id })        
    } else if (oldPTT.assignments?.length > newPTT.assignments?.length) {
      let delAssigned = oldPTT.assignments.filter(({ id: id1 }) => !newPTT.assignments.some(({ id: id2 }) => id2 === id1));
      activities.push(delAssigned[0].id == user.id ? { txt: "unassigned himself" } : 
      { txt: "unassigned ", target: delAssigned[0].id })        
    }

    if (oldPTT.labels?.length < newPTT.labels?.length) {
      let newLabel = newPTT.labels.filter(({ id: id1 }) => !oldPTT.labels.some(({ id: id2 }) => id2 === id1));
      activities.push({ txt: "add", label: newLabel[0].id })        
    } else if (oldPTT.labels?.length > newPTT.labels?.length) {
      let delLabel = oldPTT.labels.filter(({ id: id1 }) => !newPTT.labels.some(({ id: id2 }) => id2 === id1));
      activities.push({ txt: "remove", label: delLabel[0].id })        
    }

    return activities;
  }

}