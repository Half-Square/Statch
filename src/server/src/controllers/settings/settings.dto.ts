/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 16:24:56                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-06 11:52:21                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Update smtp input
  * Update System Input
  * Public output
  * Public smtp output
*/

/* Imports */
import { IsString, IsNumber, IsOptional, IsIn } from "class-validator";
/***/

/**
* Update smtp input 
*/
class UpdateSmtpInput {
  @IsString()
    host: string;

  @IsNumber()
    port: number;

  @IsString()
    user: string;

  @IsString()
  @IsOptional()
    password: string;
}
/***/

/**
* Update System Input
*/
class UpdateSysInput {
  @IsString()
    host: string;

  @IsString()
    api: string;

  @IsString()
    socket: string;

  @IsString()
  @IsIn(["prod", "demo"])
    mode: "prod" | "demo";
}
/***/

/**
* Public output 
*/
class PublicOutput {
  sys?: {
    host: string,
    api: string,
    socket: string,
    mode: "prod" | "demo"
  };

  smtp: {
    host: string;
    port: number;
    user: string;
  };

  constructor(data: PublicOutput) {
    if (data) {
      this.smtp = {
        host: data.smtp.host,
        port: data.smtp.port,
        user: data.smtp.user
      };

      if (data.sys) this.sys = data.sys;
    }
  }
}
/***/

/**
* Public smtp output 
*/
class PublicSmtpOutput {
  host: string;
  port: number;
  user: string;

  constructor(data: PublicSmtpOutput) {
    if (data) {
      this.host = data.host;
      this.port = data.port;
      this.user = data.user;
    }
  }
}
/***/

export {
  UpdateSmtpInput,
  PublicOutput,
  UpdateSysInput,
  PublicSmtpOutput
};
