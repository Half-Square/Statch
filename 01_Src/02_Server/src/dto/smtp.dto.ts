/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-03 15:37:13                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-04 18:02:21                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Edit configuration input 
  * Config output 
*/

/* Imports */
import { IsNumber, IsOptional, IsString } from "class-validator";
/***/

/**
* Edit configuration input 
*/
class ConfigInput {
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
* Config output 
*/
class ConfigOuput {
  @IsString()
    host: string;
  
  @IsNumber()
    port: number;

  @IsString()
    user: string;

  constructor(data?: ConfigInput) {
    if (data) {
      this.host = data.host;
      this.port = data.port;
      this.user = data.user;
    }
  }
}
/***/

export {
  ConfigInput,
  ConfigOuput
};