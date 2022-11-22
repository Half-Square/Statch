/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:27:57
 * @ Description: Manage projects collection database access
 */

/* SUMMARY
    * Nest
    * Entities
    * DTO
    * Name: getAll
    * Name: getById
    * Name: insertOne
    * Name: updateOne
*/

/* Nest */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ObjectID, getMongoManager } from 'typeorm';
import { ObjectId } from 'mongodb';
/***/

/* Entities */
import { Projects } from '../projects.entity';
/***/

/* DTO */
import { CreateProjectsDto } from '../dto/create-projects';
import { EditProjectsDto } from '../dto/edit-projects.dto';
import { rejects } from 'assert';
/***/

@Injectable()
export class ProjectsDbService {
    constructor(
            @InjectRepository(Projects) private projectsRepository: Repository<Projects>,
            private dataSource: DataSource
        ) {
    }

    /*
    * Name: getAll
    * Description: Get all items in users collection
    * 
    * Return (Projects[]): List of all items in collection
    */
    public getAll(): Promise<Projects[]> {
        return new Promise((resolve, reject) => {
            this.projectsRepository.find().then((data) => {
                return resolve(data);
            }).catch((err) => {
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: getById
    * Description: Get item by id
    * 
    * Args:
    * - id (String): Item id to get
    * 
    * Return (Project): Project data
    */
    public getById(id: string): Promise<Projects> {
        return new Promise((resolve, reject) => {
            if (!ObjectId.isValid(id)) return reject(new HttpException("Invalid ID", HttpStatus.BAD_REQUEST));

            this.projectsRepository.findOneBy({_id: new ObjectId(id)}).then((data) => {
                if (data && data._id) return resolve(data);
                else return reject(new HttpException("Project Not Foud", HttpStatus.NOT_FOUND));
            }).catch((err) => {
                console.error(err);
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });            
        });
    }
    /***/

    /*
    * Name: insertOne
    * Description: Insert one item on projects collection
    * 
    * Args:
    * - data (CreateProjectsDto): Project data
    *   - name (String): Project name
    *   - version (String): Project version
    *   - description (String): Project description
    * 
    * Return (ObjectID): Inserted project ID
    */
    public insertOne(data: CreateProjectsDto): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            let toSave = {
                name: data.name,
                status: "new",
                version: data.version,
                created: Math.round(new Date().getTime()/1000), // In unix format
                description: data.description || "",
                docs: [],
                tasks: [],
                comments: [],
                owner: 0, // temp
                assignees: []
            };

            this.dataSource.getMongoRepository(Projects).insertOne(toSave).then((data) => {
                if (data.insertedCount != 1) throw "An errror occured";
                return resolve(data.insertedId);
            }).catch((err) => {
                return reject(new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/

    /*
    * Name: updateOne
    * Description: Update project with data sended by client
    * 
    * Args:
    * - id (ObjectID): Project ID
    * - data (EditProjectsDto):
    *   - name (String): Project name
    *   - status (string): Project status
    *   - version (string): Project version
    *   - description (string): Project description
    *   - assignees (ObjectID[]): Users affected to the project
    */
    public updateOne(id: ObjectID, data: EditProjectsDto): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            let toSave = {};

            if (data.name) toSave['name'] = data.name;
            if (data.status) toSave['status'] = data.status;
            if (data.version) toSave['version'] = data.version;
            if (data.description) toSave['descrription'] = data.description;
            toSave['assignees'] = data.assignees.map((el) => el._id);
            toSave['tasks'] = data.tasks;
            toSave['comments'] = data.comments;

            this.dataSource.getMongoRepository(Projects).updateOne({
                _id: new ObjectId(id)
            }, {
                $set: toSave
            }).then((data) => {
                return resolve(id);
            }).catch((err) => {
                return reject(new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
            });
        });
    }
    /***/
}
