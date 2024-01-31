/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-10-06 11:46:37                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2024-01-31 17:18:39                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Dto
*/

/* Imports */
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { resolve } from "path";
import { PrismaService } from "src/prisma.service";
import * as jwt from "jsonwebtoken";
/***/

/* Interfaces */
export interface ISettings {
  sys?: {
    host: string,
    api: string,
    socket: string,
    mode: "prod" | "demo",
    demo?: usersDto.ConnectOutput
  },
  smtp: {
    host: string,
    port: number,
    user: string,
    password: string
  }
}
/***/

/* Dto */
import * as usersDto from "../users/users.dto";
/***/

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {
  }

  /**
  * Get settings from file
  * @return - Settings in json format 
  */
  public getSettings(): ISettings {
    return JSON.parse(fs.readFileSync(resolve("config.json"), {"encoding": "utf-8"}));
  }
  /***/
  
  /**
  * Save settings to file
  * @param data - Data to update
  * @returns - Saved settings 
  */
  public saveSettings(data: ISettings): ISettings {
    fs.writeFileSync(resolve("config.json"), JSON.stringify(data));
    return this.getSettings();
  }
  /***/

  /**
  * Init demo mode 
  * @return - Demo user
  */
  public async initDemo(): Promise<usersDto.ConnectOutput> {
    let demo = await this.prisma.user.findUnique({where: {id: "demo"}});
    if (!demo) {
      await this.prisma.user.create({
        data: {
          id: "demo",
          name: "Demo",
          email: "demo@statch.app",
          password: "",
          validate: true
        }
      });
    }

    demo = await this.prisma.user.findUnique({
      where: {id: "demo"}
    });
    
    demo["token"] = jwt.sign(demo, process.env.SALT, {algorithm: "HS256"});
    return new usersDto.ConnectOutput(demo);
  }
  /***/
}
