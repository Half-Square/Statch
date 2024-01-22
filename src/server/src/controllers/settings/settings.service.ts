/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-10-06 11:46:37                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-22 15:50:38                               *
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
    const defaultRole = await this.prisma.role.findFirst({ where: { name: "demoRole" } });

    if(!defaultRole) {
      await this.prisma.role.create({
        data: {
          id: "demoRole",
          name: "demoRole",
          default: true,
          permissions: JSON.stringify([{
            projects: {
              create: true,
              update: {
                view: true,
                assignee: true,
                version: true,
                status: true,
                labels: true,
                level: true,
                title: true,
                description: true
              },
              view: true,
              delete: true,
              assignSelf: true,
              comment: {
                view: true,
                create: true,
                delete: true,
                update: true,
                updateSelf: true
              }
            },
            tasks: {
              create: true,
              update: {
                view: true,
                assignee: true,
                version: true,
                status: true,
                labels: true,
                level: true,
                title: true,
                description: true
              },
              view: true,
              delete: true,
              assignSelf: true,
              comment: {
                view: true,
                create: true,
                delete: true,
                update: true,
                updateSelf: true
              }
            },
            tickets: {
              create: true,
              update: {
                view: true,
                assignee: true,
                version: true,
                status: true,
                labels: true,
                level: true,
                title: true,
                description: true
              },
              view: true,
              delete: true,
              assignSelf: true,
              comment: {
                view: true,
                create: true,
                delete: true,
                update: true,
                updateSelf: true
              }
            },
            versions: {
              view: true,
              create: true
            },
            labels: {
              create: true,
              view: true,
              update: {
                view: true,
                name: true,
                description: true
              },
              delete: true
            },
            smtp: {
              update: true,
              view: true
            },
            users: {
              view: true,
              update: true
            },
            database: {
              view: true,
              import: true,
              export: true
            },
            permissions: {
              view: true,
              create: true,
              update: true,
              delete: true
            },
            profile: {
              view: true,
              update: {
                view: true,
                name: true,
                email: true,
                picture: true
              }
            }
          }])
        }
      });
    }

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

    await this.prisma.role.update({
      where: {id: "demoRole"},
      data: {
        users: {
          connect: {
            id: "demo"
          }
        }
      }
    });

    demo = await this.prisma.user.findUnique({
      where: {id: "demo"},
      include: {
        role: true
      }
    });
    
    demo["token"] = jwt.sign(demo, process.env.SALT, {algorithm: "HS256"});
    return new usersDto.ConnectOutput(demo);
  }
  /***/
}
