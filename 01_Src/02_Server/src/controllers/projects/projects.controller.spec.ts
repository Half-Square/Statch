/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-23 10:40:24                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-28 11:23:33                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Create new project
  * Get all projects
  * Get one project
  * Update project
  * Delete project
*/

/* Imports */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { ProjectsController } from './projects.controller';
import { Project, User } from '@prisma/client';
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import * as projectsDto from "../../dto/projects.dto";
/***/

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let prisma: PrismaService;
  let testProject: Project;
  let user: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [PrismaService]
    }).compile();
    
    controller = module.get<ProjectsController>(ProjectsController);
    prisma = module.get<PrismaService>(PrismaService);

    user = await prisma.user.create({data: {
      name: "test",
      email: "project@test.fr",
      password: "123"
    }});

    user["token"] = jwt.sign(user, process.env.SALT);
  });

  afterAll(async () => {
    await prisma.user.delete({where: {id: user.id}});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
  * Create new project 
  */
  describe("create", () => {
    const data: projectsDto.CreateInput = {
      name: "Test project",
      description: "First project for testing purpose",
      version: "1.0.0",
      status: "new"
    };
    let ret;

    beforeAll(async () => {
      ret = await controller.create(data, user["token"]);
    });

    afterAll(() => {
      testProject = ret;
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return value", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(ret.name === data.name).toBe(true);
      expect(ret.status === data.status).toBe(true);
      expect(ret.version === data.version).toBe(true);
      expect(ret.created).toBeInstanceOf(Date);
      expect(ret.description === data.description).toBe(true);
      expect(Array.isArray(ret.comments)).toBe(true);
      expect(ret.comments.length).toBe(0);
      expect(Array.isArray(ret.tasks)).toBe(true);
      expect(ret.tasks.length).toBe(0);
      expect(typeof ret.owner).toBe("object");
      expect(ret.owner.id).toBe(user.id);
      expect(ret.owner.name).toBe(user.name);
      expect(ret.owner.email).toBe(user.email);
      expect(ret.owner.validate).toBe(user.validate);      
    });
  });
  /***/

  /**
  * Get all projects 
  */
  describe("getAll", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getAll();
    });

    it("Must return an array", () => {
      expect(Array.isArray(ret)).toBe(true);
    });

    it("Must contain", () => {
      expect(typeof ret[0].id === "string").toBe(true);
      expect(typeof ret[0].name === "string").toBe(true);
      expect(typeof ret[0].status === "string").toBe(true);
      expect(typeof ret[0].description === "string").toBe(true);
      expect(typeof ret[0].version === "string").toBe(true);
      expect(ret[0].created).toBeInstanceOf(Date);
      expect(typeof ret[0].owner).toBe("object");
    });

    it("Must contain correct owner", () => {
      let testInst = ret.find((el) => el.owner.id === user.id);

      expect(testInst).toBeDefined();
      expect(testInst.owner.id).toBe(user.id);
      expect(testInst.owner.name).toBe(user.name);
      expect(testInst.owner.email).toBe(user.email);
      expect(testInst.owner.validate).toBe(user.validate);
    });
  });
  /***/

  /**
  * Get one project 
  */
  describe("getOne", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getOne(testProject.id);
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return value", () => {
      expect(ret.id).toBe(testProject.id);
      expect(ret.name).toBe(testProject.name);
      expect(ret.description).toBe(testProject.description);
      expect(ret.created).toStrictEqual(testProject.created);
      expect(ret.status).toBe(testProject.status);
      expect(ret.version).toBe(testProject.version);
      expect(Array.isArray(ret.comments) && ret.comments.length === 0).toBe(true);
      expect(Array.isArray(ret.tasks) && ret.tasks.length === 0).toBe(true);
      expect(typeof ret.owner).toBe("object");
      expect(ret.owner.id).toBe(user.id);
      expect(ret.owner.name).toBe(user.name);
      expect(ret.owner.email).toBe(user.email);
      expect(ret.owner.validate).toBe(user.validate);
    });
  });
  /***/

  /**
  * Update project 
  */
  describe("update", () => {
    let ret;
    const data: projectsDto.UpdateInput = {
      name: "Updated test",
      description: "Updated description",
      version: "1.1.0",
      status: "open"
    };

    beforeAll(async () => {
      ret = await controller.update(testProject.id, data);
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return value", () => {
      expect(ret.id).toBe(testProject.id);
      expect(ret.name).toBe(data.name);
      expect(ret.description).toBe(data.description);
      expect(ret.created).toBeInstanceOf(Date);
      expect(ret.status).toBe(data.status);
      expect(ret.version).toBe(data.version);
      expect(Array.isArray(ret.comments) && ret.comments.length === 0).toBe(true);
      expect(Array.isArray(ret.tasks) && ret.tasks.length === 0).toBe(true);
      expect(typeof ret.owner).toBe("object");
      expect(ret.owner.id).toBe(user.id);
      expect(ret.owner.name).toBe(user.name);
      expect(ret.owner.email).toBe(user.email);
      expect(ret.owner.validate).toBe(user.validate);
    });

    it("Must return an error on invalid", async () => {
      try {
        await controller.update("fake id", data);
      } catch (err) {
        expect(err.status === 404).toBe(true);
      }
    });
  });
  /***/

  /**
  * Delete project 
  */
  describe("delete", () => {
    it("Must remove item", async () => {
      expect(await controller.delete(testProject.id)).toBe(undefined);
    });

    it("Must remove entry", async () => {
      let ret = await prisma.project.findUnique({where: {id: testProject.id}});
      expect(ret).toBe(null);
    });
  });
  /***/
});
