/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:27:57
 * @ Description: Manage projects collection database access
 */

/* SUMMARY
    * Nest
    * Entities
    * DTO
    * Name: findAll
    * Name: findById
    * Name: insertOne
    * Name: updateOne
*/

/* Nest */
import { Injectable } from '@nestjs/common';
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
/***/

@Injectable()
export class ProjectsDbService {
    constructor(
            @InjectRepository(Projects) private projectsRepository: Repository<Projects>,
            private dataSource: DataSource
        ) {
    }

    /*
    * Name: findAll
    * Description: Get all items in users collection
    * 
    * Return (Any[]): List of all items in collection
    */
    public findAll(): Promise<any[]> {
        return this.projectsRepository.find();
    }
    /***/

    /*
    * Name: findById
    * Description: Get item by id
    * 
    * Args:
    * - id (String): Item id to get
    * 
    * Return (Any): Project data
    */
    public async findById(id: string): Promise<any> {
      return this.projectsRepository.findOneBy({_id: new ObjectId(id)});
    }
    /***/

    /*
    * Name: insertOne
    * Description: Insert one item on projects collection
    * 
    * Args:
    * - data (CreateProjectsDto): Project data
    * 
    * Return (String): Inserted project ID
    */
    public insertOne(data: CreateProjectsDto): Promise<ObjectID> {
        return new Promise((resolve) => {
            let toSave = {
                name: data.name || "",
                status: "new",
                version: data.version || "0.0.0",
                created: Math.round(new Date().getTime()/1000), // In unix format
                description: data.description || "",
                docs: [],
                tasks: [],
                comments: [],
                owner: 0, // temp
                assignees: []
            };

            this.dataSource.getMongoRepository(Projects).insertOne(toSave).then((data) => {
                return resolve(data.insertedId);
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
    public async updateOne(id: ObjectID, data: EditProjectsDto): Promise<ObjectID> {
        let toSave = {};

        if (data.name) toSave['name'] = data.name;
        if (data.status) toSave['status'] = data.status;
        if (data.version) toSave['version'] = data.version;
        if (data.description) toSave['descrription'] = data.description;

        if (data.assignees) {
            let tmp = [];

            data.assignees.forEach((el) => {
                tmp.push(el._id);
            });

            toSave['assignees'] = tmp;
        }

        await this.dataSource.getMongoRepository(Projects).updateOne({
            _id: new ObjectId(id)
        }, {
            $set: toSave
        });
        
        return id;
    }
    /***/
}
