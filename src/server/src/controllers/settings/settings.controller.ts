/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-09-22 16:14:03                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-10-06 12:07:50                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Guards
  * Dto
  * Services
  * Get settings from file
  * Save settings to file
  * Get all settings
  * Get smtp settings
  * Get system settings 
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
/***/

/* Guards */
import { IsAdminGuard } from "src/guards/is-admin.guard";
/***/

/* Dto */
import * as settingsDto from "./settings.dto";
import * as usersDto from "../users/users.dto";
/***/

/* Services */
import { SettingsService } from "./settings.service";
/***/

@Controller("api/settings")
@UseGuards(IsAdminGuard)
export class SettingsController {
  constructor(private settings: SettingsService) {
  }

  /**
  * Get all settings
  * @return - Settings file 
  */
  @Get()
  getAll(): settingsDto.PublicOutput {
    let settings = this.settings.getSettings();
    return new settingsDto.PublicOutput(settings);
  }
  /***/

  /**
  * Get smtp settings
  * @return - Smtp settings 
  */
  @Get("smtp")
  getSmtp(): settingsDto.PublicSmtpOutput {
    let settings = this.settings.getSettings();
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
    let settings = this.settings.getSettings();
    
    settings.smtp = {...settings.smtp, ...body};
    settings = this.settings.saveSettings(settings);

    return new settingsDto.PublicSmtpOutput(settings.smtp);
  }
  /***/

  /**
  * Get system settings 
  * @return - System settings
  */
  @Get("sys")
  getSys(): {host: string, api: string, socket: string} | {message: string} {
    return this.settings.getSettings().sys || {message: "Not set yet"};
  }
  /***/

  /**
  * Update system settings
  * @param body - System settings, host/api/socket 
  * @return - Updated settings
  */
  @Put("sys")
  updateSys(
    @Body() body: settingsDto.UpdateSysInput
  ): {message: string} | Promise<usersDto.ConnectOutput> {
    let ret;
    let config = this.settings.getSettings();
    config.sys = body;

    if (config.sys.mode === "demo") {
      ret = this.settings.initDemo();
      config["demo"] = ret;
    } else ret = {message: "Settings saved !"};
    
    this.settings.saveSettings(config);
    return ret;
  }
  /***/
}
