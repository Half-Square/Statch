/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-02 15:27:20                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-04 15:23:54                               *
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
      let {host, port, secure, user, password} = await this.getConfig();

      this.transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: secure,
        auth: {
          user: user,
          pass: password
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
    let ret = await this.transporter.sendMail({
      from: process.env.EMAIL_SYS,
      to: to,
      subject: subject,
      text: content
    });

    console.log(ret);
  }
  /***/
}
