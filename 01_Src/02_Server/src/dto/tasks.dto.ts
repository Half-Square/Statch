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

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.status = data.status;
        }
    }
}

export {
    createInput,
    updateInput,
    publicOutput,
    detailsOutput
}