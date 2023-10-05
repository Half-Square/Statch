/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 16:24:56                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-05 21:02:50                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Update smtp input
  * Update System Input
  * Public output
  * Public smtp output
*/

/* Imports */
import { IsString, IsNumber, IsOptional } from "class-validator";
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
}
/***/

/**
* Public output 
*/
class PublicOutput {
  sys?: {
    host: string,
    api: string,
    socket: string
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

      if (data.sys) {
        this.sys = {
          host: data.sys.host,
          api: data.sys.api,
          socket: data.sys.socket
        };
      }
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
