import { Project } from "@prisma/client";
import { IsString, IsNumber, IsOptional } from "class-validator"

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

    constructor(data: Project) {
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

    constructor(data: Project) {
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

export {
    createInput,
    publicOutput,
    detailsOutput
}