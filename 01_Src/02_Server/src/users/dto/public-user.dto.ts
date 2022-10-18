/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-16 13:18:54
 * @ Description: Public informations DTO returned for users collection
 */

export class PublicUserDto {
    id: number;
    name: string;
    lastName: string;
    email: string;
    image: string;

    constructor(data) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.image = data.image || ''
    }
}
