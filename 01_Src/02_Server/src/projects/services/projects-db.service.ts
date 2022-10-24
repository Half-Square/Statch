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
      return this.projectsRepository.findBy({_id: new ObjectId(id)});
    }
    /***/

    /*
    * Name: insertOne
    * Description: Insert one item on projects collection
    * 
    * Args:
    * - data (CreateProjectsDto): Project data
    * 
    * Return (Any): Inserted project data
    */
    public insertOne(data: CreateProjectsDto): Promise<any> {
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
}
