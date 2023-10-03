/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 16:24:56                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-22 16:43:29                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Update smtp input
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
* Public output 
*/
class PublicOutput {
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
  PublicSmtpOutput
};
