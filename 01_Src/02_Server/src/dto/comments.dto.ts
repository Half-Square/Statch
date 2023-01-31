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

    @IsNumber()
    parentId: number;

    constructor(data: Comment) {
        if (data) {
            this.id = data.id;
            this.created = data.created;
            this.content = data.content;
            this.parentId = data.parentId;
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

    @IsNumber()
    parentId: number;

    constructor(data: Comment) {
        if (data) {
            this.id = data.id;
            this.created = data.created;
            this.content = data.content;
            this.parentId = data.parentId;
        }
    }
}

export {
    createInput,
    publicOutput,
    detailsOutput
}