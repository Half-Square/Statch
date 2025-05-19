/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-09-22 16:24:56                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2025-05-19 17:02:33                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Update smtp input
  * Update System Input
  * Update features input
  * Public output
  * Public smtp output
  * Public features output
*/

/* Imports */
import { IsString, IsNumber, IsOptional, IsIn, IsBoolean } from "class-validator";
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
* Update features input 
*/
class UpdateFeaturesInput {
  @IsBoolean()
    allowSignup: boolean;
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

/**
* Public features output 
*/
class PublicFeaturesOutput {
  allowSignup: boolean;

  constructor(data: PublicFeaturesOutput) {
    if (data) {
      this.allowSignup = data.allowSignup;
    }
  }
}
/***/

export {
  UpdateSmtpInput,
  PublicOutput,
  UpdateSysInput,
  UpdateFeaturesInput,
  PublicSmtpOutput,
  PublicFeaturesOutput
};
