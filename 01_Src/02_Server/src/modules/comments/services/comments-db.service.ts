/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-11-04 10:09:07
 * @ Description: Manage comments collection database access
 */

/* SUMMARY
    * Nest
    * Entities
    * Name: getAllInParent
    * Name: insertOne
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
    * Name: getAllInParent
    * Description: Get all items in collection
    * 
    * Args:
    * - parentId(ObjectID): Parent ID
    * 
    * Return (Comments[]): List of comments
    */
    public getAllInParent(parentId: ObjectID): Promise<Comments[]> {
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

    /*
    * Name: getById
    * Description: Get comment by id
    * 
    * Args:
    * - id (ObjectId): Comment ID
    * 
    * Return (Comments): Comment data
    */
    public getById(id: ObjectID): Promise<Comments> {
        return new Promise((resolve, reject) => {
            this.commentsRepository.findOneBy({_id: new ObjectId(id)}).then((comment) => {
                if (comment) return resolve(comment);
                else return reject(new HttpException('Not Found', HttpStatus.NOT_FOUND));
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: insertOne
    * Description: Insert new comment
    * 
    * Args:
    * - parent (ObjectID): Parent ID
    * - content (String): Comment content
    * - author (ObjectID): Author user ID
    * 
    * Return (ObjectId): New comment ID
    */
    public insertOne(content: String, parent: ObjectID, author: ObjectID): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            this.datasource.getMongoRepository(Comments).insertOne({
                author: author,
                created: Math.round(new Date().getTime()/1000), // In unix format
                content: content,
                parent: new ObjectId(parent),
                reply: []
            }).then((res) => {
                if (res.insertedCount === 1) return resolve(res.insertedId);
                else throw "No Item Inserted";
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/
}
