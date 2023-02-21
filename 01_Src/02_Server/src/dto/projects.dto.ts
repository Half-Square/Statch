import {Comment, Task} from "@prisma/client";
import {
  IsString,
  IsOptional,
  IsArray
} from "class-validator";
import * as commentsDto from "./comments.dto";
import * as tasksDto from "./tasks.dto";

class CreateInput {
  @IsString()
    name: string;

  @IsString()
    description: string;

  @IsString()
  @IsOptional()
    status: string;

  @IsString()
  @IsOptional()
    version: string;
}

class UpdateInput {
  @IsString()
  @IsOptional()
    name: string;

  @IsString()
  @IsOptional()
    status: string;

  @IsString()
  @IsOptional()
    version: string;

  @IsString()
  @IsOptional()
    description: string;
}

class PublicOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    status: string;

  @IsString()
    version: string;

  @IsString()
    created: Date;

  @IsString()
    description: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.name;
      this.version = data.version;
      this.created = data.created;
      this.description = data.description;
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

  @IsString()
    version: string;

  @IsString()
    created: Date;

  @IsString()
    description: string;

  @IsArray()
    comments: Comment[];

  @IsArray()
    tasks: Task[];

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.name;
      this.version = data.version;
      this.created = data.created;
      this.description = data.description;
      this.comments = data.comments.map(
        (el) => new commentsDto.PublicOutput(el),
      );
      this.tasks = data.tasks.map((el) => new tasksDto.PublicOutput(el));
    }
  }
}

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
