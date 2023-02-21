import {IsOptional, IsString} from "class-validator";

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
    taskId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.taskId = data.taskId;
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
    taskId: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.status = data.status;
      this.taskId = data.taskId;
    }
  }
}

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};
