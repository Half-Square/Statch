/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-03 15:37:13                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-04 15:40:55                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Edit configuration input 
  * Config output 
*/

/* Imports */
import { Smtp } from "@prisma/client";
import { IsBoolean, IsNumber, IsString } from "class-validator";
/***/

/**
* Edit configuration input 
*/
class ConfigInput {
  @IsString()
    host: string;
  
  @IsNumber()
    port: number;

  @IsBoolean()
    secure: boolean;

  @IsString()
    user: string;

  @IsString()
    password: string;
}
/***/

/**
* Config output 
*/
class ConfigOuput {
  @IsString()
    host: string;
  
  @IsNumber()
    port: number;

  @IsBoolean()
    secure: boolean;

  @IsString()
    user: string;

  constructor(data?: ConfigInput) {
    if (data) {
      this.host = data.host;
      this.port = data.port;
      this.user = data.user;
      this.secure = data.secure;
    }
  }
}
/***/

export {
  ConfigInput,
  ConfigOuput
};