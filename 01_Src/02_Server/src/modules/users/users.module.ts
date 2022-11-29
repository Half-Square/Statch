/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 12:29:37
 * @ Description: Manage users database and request
 */

/* SUMMARY
    * Nest
    * Entities
    * Controllers
    * Services
    * Modules
*/

/* Nest */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

/* Entities */
import { Users } from './users.entity';
/***/

/* Controllers */
import { UsersController } from './controllers/users.controller';
/***/

/* Services */
import { UsersDbService } from './services/users-db.service';
import { FormatService } from 'src/services/format/format.service';
/***/

/* Modules */
import { AuthModule } from '../auth/auth.module';
import { TokenService } from '../auth/services/token.service';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        forwardRef(() => AuthModule)
    ],
    providers: [UsersDbService, FormatService],
    controllers: [UsersController],
    exports: [UsersDbService]
})
export class UsersModule {}
