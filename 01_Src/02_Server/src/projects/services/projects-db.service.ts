import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Projects } from '../projects.entity';

@Injectable()
export class ProjectsDbService {
    constructor(@InjectRepository(Projects) private projectsRepository: Repository<Projects>) {
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
}
