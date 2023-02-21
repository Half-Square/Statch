/*
* Filename: users.dto.ts
* Author: Jbristhuille
* Date: Tue Feb 21 2023 11:57:43
*
* Description: Users dto model
*/

/* SUMMARY
  * RegisterInput
  * PublicOuput
  * DetailsOutput
*/

/* Imports */
import { IsBoolean, IsString } from "class-validator"

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

export {
  RegisterInput,
  PublicOutput,
  DetailsOutput
}