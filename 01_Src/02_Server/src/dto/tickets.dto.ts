import { IsNumber, IsOptional, IsString } from "class-validator"

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
    taskId: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
            this.taskId = data.taskId;
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

    @IsString()
    taskId: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
            this.taskId = data.taskId;
        }
    }
}

export {
    createInput,
    updateInput,
    publicOutput,
    detailsOutput
}