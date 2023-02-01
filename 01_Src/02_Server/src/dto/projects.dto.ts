import { Comment, Task } from "@prisma/client";
import { IsString, IsNumber, IsOptional, ValidateNested, IsArray } from "class-validator"
import * as commentsDto from './comments.dto';
import * as tasksDto from './tasks.dto';

class createInput {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    version: string;
}

class updateInput {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    version: string;

    @IsString()
    @IsOptional()
    description: string;
}

class publicOutput {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    status: string;
    
    @IsString()
    version: string;
    
    @IsString()
    created: Date;

    @IsString()
    description: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.name;
            this.version = data.version;
            this.created = data.created;
            this.description = data.description;
        }
    }
}

class detailsOutput {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    status: string;
    
    @IsString()
    version: string;
    
    @IsString()
    created: Date;

    @IsString()
    description: string;

    @IsArray()
    comments: Comment[];

    @IsArray()
    tasks: Task[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.name;
            this.version = data.version;
            this.created = data.created;
            this.description = data.description;
            this.comments = data.comments.map((el) => new commentsDto.publicOutput(el));
            this.tasks = data.tasks.map((el) => new tasksDto.publicOutput(el));
        }
    }
}

export {
    createInput,
    updateInput,
    publicOutput,
    detailsOutput,
}