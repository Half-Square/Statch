/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-04-13 11:38:12                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-18 16:32:12                               *
 *****************************************************************************/

import {IsObject, IsString, IsArray, IsOptional} from "class-validator";

/* Dto */
import * as usersDto from "../dto/users.dto";
import * as projectsDto from "../dto/projects.dto";
import * as tasksDto from "../dto/tasks.dto";
import * as ticketsDto from "../dto/tickets.dto";
import * as labelsDto from "../dto/labels.dto";
/***/


class ProjectOutput {
  @IsString()
    id: string;
  
  @IsString()
    created: Date;
  
  @IsObject()
    author: usersDto.PublicOutput;

  @IsString()
    action: string;

  @IsString()
  @IsOptional()
    type: string;

  @IsString()
  @IsOptional()
    value: string;  
  
  @IsObject()
  @IsOptional()
    target: usersDto.PublicOutput;

  @IsObject()
  @IsOptional()
    task: tasksDto.PublicOutput;

  @IsObject()  
  @IsOptional()
    ticket: ticketsDto.PublicOutput;

  @IsObject()
  @IsOptional()
    label: labelsDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.author = new usersDto.PublicOutput(data.author);
      this.action = data.action;
      if (data.type)
        this.type = data.type;
      if (data.value)
        this.value = data.value;
      if (data.task)
        this.task = data.task;
      if (data.ticket)
        this.ticket = data.ticket;
      if (data.label)
        this.label = data.label;
      if (data.target)
        this.target = new usersDto.PublicOutput(data.target);
    }
  }
}

class TaskOutput {
  @IsString()
    id: string;
  
  @IsString()
    created: Date;
  
  @IsObject()
    author: usersDto.PublicOutput;

  @IsString()
    action: string;

  @IsString()
  @IsOptional()
    type: string;

  @IsString()
  @IsOptional()
    value: string;  
    
  @IsObject()
  @IsOptional()
    target: usersDto.PublicOutput;

  @IsObject()  
  @IsOptional()
    ticket: ticketsDto.PublicOutput;

  @IsObject()
  @IsOptional()
    label: labelsDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.author = new usersDto.PublicOutput(data.author);
      this.action = data.action;
      if (data.type)
        this.type = data.type;
      if (data.value)
        this.value = data.value;
      if (data.ticket)
        this.ticket = data.ticket;
      if (data.label)
        this.label = data.label;
      if (data.target)
        this.target = new usersDto.PublicOutput(data.target);
    }
  }
}

class TicketOutput {
  @IsString()
    id: string;
  
  @IsString()
    created: Date;
  
  @IsObject()
    author: usersDto.PublicOutput;

  @IsString()
    action: string;

  @IsString()
  @IsOptional()
    type: string;

  @IsString()
  @IsOptional()
    value: string;  
    
  @IsObject()
  @IsOptional()
    target: usersDto.PublicOutput;

  @IsObject()
  @IsOptional()
    label: labelsDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.author = new usersDto.PublicOutput(data.author);
      this.action = data.action;

      if (data.type)
        this.type = data.type;
      if (data.value)
        this.value = data.value;
      if (data.label)
        this.label = data.label;
      if (data.target)
        this.target = new usersDto.PublicOutput(data.target);
    }
  }
}

class DetailsOutput {
  @IsString()
    id: string;
  
  @IsString()
    created: Date;
  
  @IsObject()
    author: usersDto.PublicOutput;

  @IsString()
    action: string;

  @IsString()
  @IsOptional()
    type: string;

  @IsString()
  @IsOptional()
    value: string;  
    
  @IsObject()
  @IsOptional()
    target: usersDto.PublicOutput;

  @IsObject()
  @IsOptional()
    project: projectsDto.PublicOutput;

  @IsObject()
  @IsOptional()
    task: tasksDto.PublicOutput;

  @IsObject()  
  @IsOptional()
    ticket: ticketsDto.PublicOutput;

  @IsObject()
  @IsOptional()
    label: labelsDto.PublicOutput;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.author = new usersDto.PublicOutput(data.author);
      this.action = data.action;

      if (data.type)
        this.type = data.type;
      if (data.value)
        this.value = data.value;
      if (data.project)
        this.project = data.project;
      if (data.task)
        this.task = data.task;
      if (data.ticket)
        this.ticket = data.ticket;
      if (data.label)
        this.label = data.label;
      if (data.target)
        this.target = new usersDto.PublicOutput(data.target);
    }
  }
}
export {DetailsOutput, ProjectOutput, TaskOutput, TicketOutput};