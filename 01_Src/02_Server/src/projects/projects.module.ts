/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 14:35:24
 * @ Description: Manage projects database and requests
 */

/* Nest */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/***/

import { Projects } from './projects.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Projects])
    ],
    providers: [],
    controllers: []
})
export class ProjectsModule {}
