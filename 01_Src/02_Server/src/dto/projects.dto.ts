import { Comment } from "@prisma/client";
import { IsString, IsNumber, IsOptional, ValidateNested } from "class-validator"
import { Type } from 'class-transformer';

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

    @ValidateNested({ each: true })
    @Type(() => Comment)
    comments: Comment[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.name;
            this.version = data.version;
            this.created = data.created;
            this.description = data.description;
            this.comments = data.comments;
        }
    }
}

export {
    createInput,
    publicOutput,
    detailsOutput
}