/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-28 09:54:19
 * @ Description: Auth module, manage user authentification
 */

/* SUMMARY
    * Nest
    * Controllers
    * Services
    * Modules
    * Entities
*/

/* Nest */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

/* Controllers */
import { AuthController } from './controllers/auth.controller';
/***/

/* Services */
import { FormatService } from 'src/services/format/format.service';
import { TokenService } from './services/token.service';
import { UsersDbService } from '../users/services/users-db.service';
/***/

/* Modules */
import { UsersModule } from '../users/users.module';
/***/

/* Entities */
import { Users } from '../users/users.entity';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        forwardRef(() => UsersModule)
    ],
    controllers: [AuthController],
    providers: [FormatService, TokenService, UsersDbService],
    exports: [TokenService]
})
export class AuthModule {}
