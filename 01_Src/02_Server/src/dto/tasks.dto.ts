import { IsNumber, IsOptional, IsString, IsArray } from "class-validator"
import { Ticket } from "@prisma/client";
import * as ticketsDto from './tickets.dto';

class createInput {
    @IsString()
    name: string;
}

class updateInput {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    status: string;
}

class publicOutput {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    status: string;

    @IsString()
    projectId: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
            this.projectId = data.projectId
        }
    }
}

class detailsOutput {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    status: string;

    @IsArray()
    tickets: Ticket[]

    @IsString()
    projectId: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
            this.tickets = data.tickets.map((el) => new ticketsDto.publicOutput(el));
            this.projectId = data.projectId;
        }
    }
}

export {
    createInput,
    updateInput,
    publicOutput,
    detailsOutput
}