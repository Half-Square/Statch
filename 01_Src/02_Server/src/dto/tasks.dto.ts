import { IsNumber, IsString } from "class-validator"

class createInput {
    @IsString()
    name: string;
}

class publicOutput {
    @IsString()
    id: number;

    @IsString()
    name: string;

    @IsString()
    status: string;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
        }
    }
}

class detailsOutput {
    @IsString()
    id: number;

    @IsString()
    name: string;

    @IsString()
    status: string;

    @IsNumber()
    projectId: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
            this.projectId = data.projectId;
        }
    }
}

export {
    createInput,
    publicOutput,
    detailsOutput
}