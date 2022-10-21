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
    * Name: modifyById
*/

/* Nest */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, ObjectID, getMongoManager } from 'typeorm';
import { ObjectId } from 'mongodb';
/***/

/* Entities */
import { Projects } from '../projects.entity';
import { Users } from '../../users/users.entity';
/***/

/* DTO */
import { CreateProjectsDto } from '../dto/create-projects';
import { EditProjectsDto } from '../dto/edit-projects.dto';
import { PublicUserDto } from '../../users/dto/public-user.dto';
/***/

@Injectable()
export class ProjectsDbService {
    constructor(
            @InjectRepository(Projects) private projectsRepository: Repository<Projects>,
            @InjectRepository(Users) private usersRepository: Repository<Users>,
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

    /*
    * Name: modifyById
    * Description: Update projects informations
    *
    * Args:
    * - id (String): Project id to modify
    * - data (EditProjectsDto): Data to update
    * 
    * Return (any): Updated project
    */
    public async modifyById(id: string, data: EditProjectsDto): Promise<any> {
      let project = await this.projectsRepository.findOneBy({_id: new ObjectId(id)});
      let users = [];

      if (project) {
        for (let i = 0; i < data.assignees.length; i++) {
          users.push(new ObjectId(data.assignees[i]));
        }  

        await this.dataSource.getMongoRepository(Projects).update({
          _id: new ObjectId(id)
        }, {
          assignees: users
        });

        for (let i = 0; i < users.length; i ++) {
          users[i] = await this.usersRepository.findOneBy({_id: users[i]});
        }

        project.assignees = users;
      }

      return project;
    }
    /***/
}
