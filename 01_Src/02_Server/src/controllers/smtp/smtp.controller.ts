/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-02 15:07:14                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-04 18:13:04                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Dto
  * Guards
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
  Put,
  Headers,
  UseGuards
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
/***/

/* Services */
import { SmtpService } from "src/services/smtp/smtp.service";
import { PrismaService } from "src/prisma.service";
/***/

/* Dto */
import * as smtpDto from "../../dto/smtp.dto";
/***/

/* Guards */
import { ConnectedGuard } from "src/guards/connected/connected.guard";
/***/

@Controller("api/smtp")
@UseGuards(ConnectedGuard)
export class SmtpController {
  constructor(private smtp: SmtpService,
              private prisma: PrismaService) {
    this.smtp.init();
  }

  /**
  * Test email sending, throw error on fail
  * @param token - User token
  */
  @Get("test")
  public async test(@Headers("x-token") token: string): Promise<{message: string}> {
    try {
      let user = jwt.verify(token, process.env.SALT);

      await this.smtp.sendMail(user.email, "Hello world", "This is a test");
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
      let data = {
        ...body,
        password: body.password ? String(jwt.sign(body.password, process.env.SALT)) : null // Save password as ciphered token
      };

      if (!body.password) delete data.password; // Prevent empty password overwrite

      let ret = await this.prisma.smtp.updateMany({
        data: data
      });

      this.smtp.init();

      if (ret.count === 1) return new smtpDto.ConfigOuput(body);
      else throw "No smtp configuration found";
    } catch (err) {
      console.error(`${new Date().toISOString()} - ${err}`);
      throw err;
    }
  }
  /***/
}