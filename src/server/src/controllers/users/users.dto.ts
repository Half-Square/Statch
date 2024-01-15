/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-02-21 13:03:45                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-15 16:58:13                               *
 *****************************************************************************/

/* SUMMARY
  * RegisterInput
  * ConnectInput
  * UpdateInput
  * AdminInput 
  * PublicOuput
  * DetailsOutput
  * ConnectOutput
*/

/* Imports */
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

/**
* RegisterInput
*/
class RegisterInput {
  @IsString()
    name: string;

  @IsString()
    email: string;

  @IsString()
    password: string;
}
/***/

/**
* ConnectInput
*/
class ConnectInput {
  @IsString()
    email: string;

  @IsString()
    password: string;
}
/***/

/**
* UpdateInput
*/
class UpdateInput {
  @IsString()
    email: string;

  @IsString()
    name: string;

  @IsString()
  @IsOptional()
    picture: string;

  @IsString()
  @IsOptional()
    oldPicture: string;
}
/***/

/**
* RightInput
*/
class RightInput {
  @IsBoolean()
  @IsOptional()
    validate: boolean;

  @IsBoolean()
  @IsOptional()
    isAdmin: boolean;
}
/***/

/**
* AdminInput 
*/
class AdminInput {
  @IsBoolean()
    isAdmin: boolean;

  @IsBoolean()
    validate: boolean;
}
/***/

/**
* PublicOutput
*/
class PublicOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    email: string;

  @IsBoolean()
    validate: boolean;

  @IsBoolean()
    isAdmin: boolean;

  @IsString()
    picture: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.validate = data.validate;
      this.isAdmin = data.isAdmin;
      this.picture = data.picture;
    }
  }
}
/***/

/**
* DetailsOutput
*/
class DetailsOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    email: string;

  @IsBoolean()
    validate: boolean;

  @IsBoolean()
    isAdmin: boolean;

  @IsString()
    picture: string;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.validate = data.validate;
      this.isAdmin = data.isAdmin;
      this.picture = data.picture;
    }
  }
}
/***/

/**
* ConnectOutput 
*/
class ConnectOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    email: string;
    
  @IsString()
    token: boolean;

  @IsBoolean()
    isAdmin: boolean;

  @IsString()
    picture: string;
  
  @IsArray()
    role: [];

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.token = data.token;
      this.isAdmin = data.isAdmin;
      this.picture = data.picture;
      this.role = data.role;
    }
  }
}
/***/

export {
  RegisterInput,
  ConnectInput,
  UpdateInput,
  RightInput,
  AdminInput,
  PublicOutput,
  DetailsOutput,
  ConnectOutput
};
