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
/***/

/* Services */
import { UsersDbService } from './services/users-db.service';
/***/

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers: [UsersDbService],
    controllers: [UsersController]
})
export class UsersModule {}
