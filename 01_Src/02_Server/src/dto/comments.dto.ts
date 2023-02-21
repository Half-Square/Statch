import {IsString} from "class-validator";
import {Comment} from "@prisma/client";

class CreateInput {
  @IsString()
    content: string;
}

class DetailsOutput {
  @IsString()
    id: string;

  @IsString()
    created: Date;

  @IsString()
    content: string;

  constructor(data: Comment) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.content = data.content;
    }
  }
}

class PublicOutput {
  @IsString()
    id: string;

  @IsString()
    created: Date;

  @IsString()
    content: string;

  constructor(data: Comment) {
    if (data) {
      this.id = data.id;
      this.created = data.created;
      this.content = data.content;
    }
  }
}

export {CreateInput, PublicOutput, DetailsOutput};
