import { IsString, IsNumber } from 'class-validator';
import { Comment } from '@prisma/client';

class createInput {
    @IsString()
    content: string;
}

class detailsOutput {
    @IsNumber()
    id: number;

    @IsString()
    created: Date;

    @IsString()
    content: string;

    constructor(data: Comment) {
        if (data) {
            this.id = data.id;
            this.created = data.created;
            this.content = data.content;
        }
    }
}

class publicOutput {
    @IsNumber()
    id: number;

    @IsString()
    created: Date;

    @IsString()
    content: string;

    constructor(data: Comment) {
        if (data) {
            this.id = data.id;
            this.created = data.created;
            this.content = data.content;
        }
    }
}

export {
    createInput,
    publicOutput,
    detailsOutput
}