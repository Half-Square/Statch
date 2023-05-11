/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 13:03:45                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-11 11:16:26                               *
 *****************************************************************************/

/* SUMMARY
  * RegisterInput
  * ConnectInput
  * PublicOuput
  * DetailsOutput
  * ConnectOutput
*/

/* Imports */
import { IsBoolean, IsOptional, IsString } from "class-validator";

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

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.validate = data.validate;
      this.isAdmin = data.isAdmin;
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

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.validate = data.validate;
      this.isAdmin = data.isAdmin;
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

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.token = data.token;
      this.isAdmin = data.isAdmin;
    }
  }
}
/***/

export {
  RegisterInput,
  ConnectInput,
  UpdateInput,
  RightInput,
  PublicOutput,
  DetailsOutput,
  ConnectOutput
};