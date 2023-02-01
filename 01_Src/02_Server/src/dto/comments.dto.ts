import { IsString, IsNumber } from 'class-validator';
import { Comment } from '@prisma/client';

class createInput {
    @IsString()
    content: string;
}

class detailsOutput {
    @IsString()
    id: string;

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
    @IsString()
    id: string;

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