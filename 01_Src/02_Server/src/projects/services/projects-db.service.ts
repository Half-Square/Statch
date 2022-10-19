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
import { Repository, DataSource, ObjectID } from 'typeorm';
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
    public findAll(): any {
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
    public async findById(id): Promise<any> {
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
    public async insertOne(data: CreateProjectsDto): Promise<any> {
        let project = new Projects();
        project.name = data.name || "";
        project.status = "new";
        project.version = data.version || "0.0.0";
        project.created = Math.round(new Date().getTime()/1000); // In unix format
        project.description = data.description || "";
        project.docs = [];
        project.tasks = [];
        project.comments = [];
        project.owner = 0; // temp
        project.assignees = [];

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
          await queryRunner.manager.save(project);
      
          await queryRunner.commitTransaction();
        } catch (err) {
          // since we have errors lets rollback the changes we made
          await queryRunner.rollbackTransaction();
        } finally {
          // you need to release a queryRunner which was manually instantiated
          await queryRunner.release();
          return project;
        }
    }
    /***/
}
