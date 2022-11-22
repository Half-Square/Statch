/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-20 10:10:24
 * @ Description: Manage tasks collection access
 */

/* SUMMARY
    * Nest
    * Entities
    * DTO
    * Name: findByProject
    * Name: getById
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

/* DTO */
import { CreateTasksDto } from '../dto/create-tasks.dto';
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

    /*
    * Name: getById
    * Descritpion: Get task by id
    * 
    * Args:
    * - id (String): Task ID to get
    *
    * Return (Any): Task data
    */
    public getById(id: String): Promise<Tasks> {
        return new Promise((resolve, reject) => {
            this.TasksRepository.findOneBy({_id: new ObjectId(id)}).then((data) => {
                return resolve(data);
            }).catch((err) => {
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR))
            });
        });
    }
    /***/

    /*
    * Name: insertOne
    * Description: Insert one item on projects collection
    * 
    * Args:
    * - projectId (String): Parent project ID
    * - data (CreateProjectsDto): Project data
    *   - name (String): Project name
    *   - version (String): Project version
    *   - description (String): Project description
    * 
    * Return (ObjectID): Inserted project ID
    */
    public insertOne(projectId: string, data: CreateTasksDto): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            let toSave = {
                project: new ObjectId(projectId),
                name: data.name,
                status: "new",
                created: Math.round(new Date().getTime()/1000), // In unix format
                description: data.description || "",
                tickets: [],
                comments: [],
                owner: 0, // temp
                assignees: []
            };

            this.datasource.getMongoRepository(Tasks).insertOne(toSave).then((data) => {
                if (data.insertedCount != 1) throw "An errror occured";
                return resolve(data.insertedId);
            }).catch((err) => {
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/
}
