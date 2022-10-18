/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:21:33
 * @ Description: Public informations returned for projects collection
 */

export class PublicProjectsDto {
    id: number;
    name: string;
    status: string;
    version: string;
    created: Date;
    description: string;
    docs: string[];
    owner: number;
    
    constructor(data) {
        this.id = data.id || 0;
        this.name = data.name || "";
        this.status = data.status || "new";
        this.version = data.version || "0.0.0";
        this.created = data.created || undefined;
        this.description = data.description || "";
        this.docs = data.docs || [];
        this.owner = data.owner || undefined;
    }
}