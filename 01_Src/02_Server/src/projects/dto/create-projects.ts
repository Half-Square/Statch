/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-18 14:57:21
 * @ Description: Projects creation model
 */

export class CreateProjectsDto {
    name: string;
    version: string;
    description: string;
    
    constructor(data) {
        this.name = data.name || "";
        this.version = data.version || "0.0.0";
        this.description = data.description || "";
    }
}