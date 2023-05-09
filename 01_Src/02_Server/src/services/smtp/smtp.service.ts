/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-02 15:27:20                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-04 18:08:05                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Init nodemailer 
  * Get smtp configuration from database
  * Send email
*/

/* Imports */
import { Injectable } from "@nestjs/common";
import { Smtp } from "@prisma/client";
import * as nodemailer from "nodemailer";
import * as jwt from "jsonwebtoken";
/***/

/* Services */
import { PrismaService } from "src/prisma.service";
/***/

/* Interfaces */
interface ITransporter {
  sendMail: (options: {
    from: string,
    to: string,
    subject: string,
    text: string
  }) => void
}
/***/

@Injectable()
export class SmtpService {
  private transporter: ITransporter = null;

  constructor(private prisma: PrismaService) {
  }

  /**
  * Init nodemailer 
  */
  public async init(): Promise<void> {
    try {
      let {host, port, user, password} = await this.getConfig();
      let pass = await jwt.verify(password, process.env.SALT);

      this.transporter = nodemailer.createTransport({
        name: "www.sendinblue.com",
        host: host,
        port: port,
        secure: port === 465 ? true : false,
        auth: {
          type: "login",
          user: user,
          pass: pass
        },
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false
        }
      });
    } catch (err) {
      throw err;
    }
  }
  /***/

  /**
  * Get smtp configuration from database
  */
  public getConfig(): Promise<Smtp> {
    return this.prisma.smtp.findFirst();
  }
  /***/

  /**
  * Send email
  * @param to - Receiver email adress
  * @param subject - Email subject
  * @param content - Email content
  */
  public async sendMail(to: string, subject: string, content: string): Promise<void> {
    try {
      let ret = await this.transporter.sendMail({
        from: process.env.EMAIL_SYS,
        to: to,
        subject: subject,
        text: content
      });
  
      console.log(ret);
    } catch (err) {
      throw err;
    }
  }
  /***/
}
