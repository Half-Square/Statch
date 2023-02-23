/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-21 13:03:45                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-21 13:26:15                               *
 *****************************************************************************/

/* SUMMARY
  * RegisterInput
  * ConnectInput
  * PublicOuput
  * DetailsOutput
  * ConnectOutput
*/

/* Imports */
import { IsBoolean, IsString } from "class-validator";

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
* PublicOutput
*/
class PublicOutput {
  @IsString()
    id: string;

  @IsString()
    name: string;

  @IsString()
    email: string;

  @IsString()
    password: string;

  @IsBoolean()
    validate: boolean;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.validate = data.validate;
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

  @IsString()
    password: string;

  @IsBoolean()
    validate: boolean;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.validate = data.validate;
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
    password: string;

  @IsString()
    token: boolean;

  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.token = data.token;
    }
  }
}
/***/

export {
  RegisterInput,
  ConnectInput,
  PublicOutput,
  DetailsOutput,
  ConnectOutput
};