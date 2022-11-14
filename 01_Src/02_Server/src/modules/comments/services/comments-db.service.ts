/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 10:09:07
 * @ Description: Manage comments collection database access
 */

/* SUMMARY
    * Nest
    * Entities
    * Name: getAll
*/

/* Nest */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ObjectID, getMongoManager } from 'typeorm';
import { ObjectId } from 'mongodb';
/***/

/* Entities */
import { Comments } from '../comments.entity';
/***/

@Injectable()
export class CommentsDbService {
    constructor(@InjectRepository(Comments) private commentsRepository: Repository<Comments>,
                private datasource: DataSource) {
    }

    /*
    * Name: getAll
    * Description: Get all items in collection
    * 
    * Args:
    * - parentId(ObjectID): Parent ID
    * 
    * Return (Comments[]): List of comments
    */
    public getAll(parentId: ObjectID): Promise<Comments[]> {
        return new Promise((resolve, reject) => {
            this.commentsRepository.findBy({parent: new ObjectId(parentId)}).then((comments) => {
                return resolve(comments);
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/
}
