/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 12:29:37
 * @ Description: Manage users database and request
 */

/* SUMMARY
    * Nest
    * Entities
    * Controllers
*/

/* Nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

/* Entities */
import { Users } from './users.entity';
/***/

/* Controllers */
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
