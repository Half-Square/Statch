/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 09:48:46
 * @ Description: Manage comments features
 */

/* SUMMARY
    * Nest
*/

/* Nest */
import { Module } from '@nestjs/common';
/***/

/* Controllers */
import { CommentsController } from './controllers/comments.controller';
import { CommentsDbService } from './services/comments-db.service';
/***/

@Module({
  controllers: [CommentsController],
  providers: [CommentsDbService]
})
export class CommentsModule {}
