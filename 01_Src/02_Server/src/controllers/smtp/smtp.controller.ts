/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-02 15:07:14                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-04 15:43:25                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Dto
  * Test email sending, throw error on fail
  * Get SMTP configuration 
*/

/* Imports */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Body,
  Put
} from "@nestjs/common";
import { sha256 } from "js-sha256";
/***/

/* Services */
import { SmtpService } from "src/services/smtp/smtp.service";
import { PrismaService } from "src/prisma.service";
/***/

/* Dto */
import * as smtpDto from "../../dto/smtp.dto";
/***/

@Controller("api/smtp")
export class SmtpController {
  constructor(private smtp: SmtpService,
              private prisma: PrismaService) {
    this.smtp.init();
  }

  /**
  * Test email sending, throw error on fail
  */
  @Get("test")
  public async test(): Promise<{message: string}> {
    try {
      await this.smtp.sendMail("test@test.fr", "Hello world", "This is a test");
      return {message: "Configuration is valid"};
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      if (err.response) {
        throw new HttpException(err.response, HttpStatus.INTERNAL_SERVER_ERROR);
      } else throw err;
    }
  }
  /***/

  /**
  * Get SMTP configuration 
  */
  @Get("config")
  public async getConfig(): Promise<smtpDto.ConfigOuput> {
    try {
      let ret = await this.smtp.getConfig();
      return new smtpDto.ConfigOuput(ret);
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/

  /**
  * Update smtp configuration
  * @param body - Request payload
  * @return - Updated configuration
  */
  @Put("config")
  public async updateConfig(
    @Body() body: smtpDto.ConfigInput
  ): Promise<smtpDto.ConfigOuput> {
    try {
      let ret = await this.prisma.smtp.updateMany({
        data: {
          ...body,
          password: String(sha256(body.password))
        }
      });

      if (ret.count === 1) return new smtpDto.ConfigOuput(body);
      else throw "No smtp configuration found";
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}