/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-13 11:38:12                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-13 13:39:50                               *
 *****************************************************************************/

import {IsObject, IsString, IsArray, IsOptional} from "class-validator";


class CreateInput {
  @IsString()
    name: string;

  @IsString()
    color: string;
  
  @IsString()
  @IsOptional()
    description: string;
}

class UpdateInput {
  @IsString()
    id: string;
  
  @IsString()
    name: string;

  @IsString()
    color: string;

  @IsString()
  @IsOptional()
    description: string;
}

class DetailsOutput {
  @IsString()
    id: string;
  
  @IsString()
    name: string;

  @IsString()
    color: string;

  @IsString()
  @IsOptional()
    description: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.color = data.color;
      this.description = data.description;
    }
  }
}

class PublicOutput {
  @IsString()
    id: string;
  
  @IsString()
    name: string;

  @IsString()
    color: string;
  
  @IsString()
  @IsOptional()
    description: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.color = data.color;
      this.description = data.description;
    }
  }
}

export {CreateInput, UpdateInput, PublicOutput, DetailsOutput};