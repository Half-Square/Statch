/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 16:14:03                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-09-22 16:43:01                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Guards
  * Dto
  * Interfaces
  * Get settings from file
  * Save settings to file
  * Get all settings
  * Get smtp settings
  * Update smtp settings
*/

/* Imports */
import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body
} from "@nestjs/common";
import * as fs from "fs";
import { resolve } from "path";
/***/

/* Guards */
import { IsAdminGuard } from "src/guards/is-admin.guard";
/***/

/* Dto */
import * as settingsDto from "./settings.dto";
/***/

/* Interfaces */
interface ISettings {
  smtp: {
    host: string,
    port: number,
    user: string,
    password: string
  }
}
/***/

@Controller("api/settings")
@UseGuards(IsAdminGuard)
export class SettingsController {
  /**
  * Get settings from file
  * @return - Settings in json format 
  */
  private getSettings(): ISettings {
    return JSON.parse(fs.readFileSync(resolve("config.json"), {"encoding": "utf-8"}));
  }
  /***/

  /**
  * Save settings to file
  * @param data - Data to update
  * @returns - Saved settings 
  */
  private saveSettings(data: ISettings): ISettings {
    fs.writeFileSync(resolve("config.json"), JSON.stringify(data));
    return this.getSettings();
  }
  /***/

  /**
  * Get all settings
  * @return - Settings file 
  */
  @Get()
  getAll(): settingsDto.PublicOutput {
    let settings = this.getSettings();
    return new settingsDto.PublicOutput(settings);
  }
  /***/

  /**
  * Get smtp settings
  * @return - Smtp settings 
  */
  @Get("smtp")
  getSmtp(): settingsDto.PublicSmtpOutput {
    let settings = this.getSettings();
    return new settingsDto.PublicSmtpOutput(settings.smtp);
  }
  /***/

  /**
  * Update smtp settings
  * @param body - Settings to update
  * @return - Smtp settings 
  */
  @Put("smtp")
  updateSmtp(@Body() body: settingsDto.UpdateSmtpInput): settingsDto.PublicSmtpOutput {
    let settings = this.getSettings();
    
    settings.smtp = {...settings.smtp, ...body};
    settings = this.saveSettings(settings);

    return new settingsDto.PublicSmtpOutput(settings.smtp);
  }
  /***/
}
