import {IsOptional, IsString, IsArray} from "class-validator";
import {Ticket} from "@prisma/client";
import * as ticketsDto from "./tickets.dto";

class CreateInput {
  @IsString()
    name: string;
}

class UpdateInput {
  @IsString()
  @IsOptional()
    name: string;

  @IsString()
  @IsOptional()
    status: string;
}

class PublicOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    status: string;

  @IsString()
    projectId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.projectId = data.projectId;
    }
  }
}

class DetailsOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    status: string;

  @IsArray()
    tickets: Ticket[];

  @IsString()
    projectId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.tickets = data.tickets.map((el) => new ticketsDto.PublicOutput(el));
      this.projectId = data.projectId;
    }
  }
}

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
