/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2023-09-22 16:14:03                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2025-05-21 09:36:19                               *
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
  * Update smtp settings
  * Get system settings 
  * Update system settings
*/

/* Imports */
import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body,
  HttpException,
  HttpStatus
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
import { IsConnectedGuard } from "src/guards/is-connected.guard";
/***/

@Controller("api/settings")
export class SettingsController {
  constructor(private settings: SettingsService) {
  }

  /**
  * Get all settings
  * @return - Settings file 
  */
  @Get()
  @UseGuards(IsAdminGuard)
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
  @UseGuards(IsAdminGuard, IsConnectedGuard)
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
  @UseGuards(IsAdminGuard, IsConnectedGuard)
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

    if (config.sys) throw new HttpException("Forbidden ressource", HttpStatus.FORBIDDEN);
    config.sys = body;

    if (config.sys.mode === "demo") {
      ret = this.settings.initDemo();
      config["demo"] = ret;
    } else ret = {message: "Settings saved !"};
    
    this.settings.saveSettings(config);
    return ret;
  }
  /***/

  /**
  * Get features settings
  * @return - Features settings 
  */
  @Get("features")
  getFeatures(): settingsDto.PublicFeaturesOutput {
    let settings = this.settings.getSettings();
    return new settingsDto.PublicFeaturesOutput(settings.features);
  }
  /***/

  /**
  * Update features settings
  * @param body - Features settings to update
  * @return - Features settings 
  */
  @Put("features")
  @UseGuards(IsAdminGuard, IsConnectedGuard)
  updateFeatures(
    @Body() body: settingsDto.UpdateFeaturesInput
  ): settingsDto.PublicFeaturesOutput {
    let settings = this.settings.getSettings();
    settings.features = {...settings.features, ...body};
    settings = this.settings.saveSettings(settings);

    return new settingsDto.PublicFeaturesOutput(settings.features);
  }
  /***/
}
