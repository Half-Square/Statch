/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 09:54:19
 * @ Description: Auth module, manage user authentification
 */

/* SUMMARY
    * Nest
    * Controllers
*/

/* Nest */
import { Module } from '@nestjs/common';
/***/

/* Controllers */
import { AuthController } from './controllers/auth.controller';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
/***/

@Module({
  controllers: [AuthController],
  providers: [FormatService]
})
export class AuthModule {}
