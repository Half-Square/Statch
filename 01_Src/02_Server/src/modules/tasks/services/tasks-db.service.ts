/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 10:10:24
 * @ Description: Manage tasks collection access
 */

/* SUMMARY
    * Nest
    * Entities
*/

/* Nest */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ObjectID } from 'typeorm';
import { ObjectId } from 'mongodb';
/***/

/* Entitites */
import { Tasks } from '../tasks.entity';
/***/

@Injectable()
export class TasksDbService {
    constructor(@InjectRepository(Tasks) private TasksRepository: Repository<Tasks>,
                private datasource: DataSource) {

    }

    /*
    * Name: findByProject
    * Description: Get all tasks in project
    * 
    * Args:
    * id (String): Project id
    * 
    * Return (Any[]): List of project tasks
    */
    public findByProject(id: string): Promise<Tasks[]> {
        return new Promise((resolve, reject) => {
            this.TasksRepository.findBy({project: new ObjectId(id)}).then((data) => {
                return resolve(data);
            }).catch((err) => {
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR))
            });
        });
    }
    /***/
}