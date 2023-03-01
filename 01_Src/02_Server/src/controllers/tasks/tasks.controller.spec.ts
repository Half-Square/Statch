/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-23 10:39:11                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-28 14:24:58                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Create tasks
  * Get all tasks
  * Get one task
  * Delete task by id
*/

/* Imports */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { TasksController } from './tasks.controller';
import { Project, User } from '@prisma/client';
import * as jwt from "jsonwebtoken";
/***/

/* Dto */
import * as tasksDto from "../../dto/tasks.dto";
/***/

describe('TasksController', () => {
  let controller: TasksController;
  let prisma: PrismaService;
  let parents: Project[] = [];
  let tasks = [];
  let user: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [PrismaService]
    }).compile();

    controller = module.get<TasksController>(TasksController);
    prisma = module.get<PrismaService>(PrismaService);
  
    user = await prisma.user.create({
      data: {
        name: "test",
        email: "task@test.fr",
        password: "123"
      }
    });

    user["token"] = jwt.sign(user, process.env.SALT);

    parents.push(await prisma.project.create({
      data: {
        name: "Test project n° 1",
        description: "Testing purpose",
        ownerId: user.id
      }
    }));

    parents.push(await prisma.project.create({
      data: {
        name: "Test project n° 2",
        description: "Testing purpose",
        ownerId: user.id
      }
    }));
  });

  afterAll(async () => {
    await prisma.task.delete({where: {id: tasks[1].id}});
    for(let i: number = 0; i < parents.length; i++) await prisma.project.delete({where: {id: parents[i].id}});
    await prisma.user.delete({where: {id: user.id}});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
  * Create tasks 
  */
  describe("create", () => {
    const data: tasksDto.CreateInput[] = [{
      name: "Test task n° 1",
      description: "Testing purpose"
    }, {
      name: "Test task n° 2",
      description: "Testing purpose"
    }];

    beforeAll(async () => {
      let t1 = await controller.create(parents[0].id, user["token"], data[0]);
      let t2 = await controller.create(parents[1].id, user["token"], data[1]);

      tasks.push(t1);
      tasks.push(t2);
    });

    it("Must return an object", () => {
      expect(typeof tasks[0] === "object").toBe(true);
    });

    it("Must return correct value", () => {
      expect(typeof tasks[0].id === "string");
      expect(tasks[0].name).toBe("Test task n° 1");
      expect(tasks[0].description).toBe("Testing purpose");
      expect(tasks[0].created).toBeInstanceOf(Date);
      expect(tasks[0].status).toBe("new");
      expect(tasks[0].projectId).toBe(parents[0].id);
      expect(Array.isArray(tasks[0].comments)).toBe(true);
      expect(tasks[0].comments.length).toBe(0);
      expect(Array.isArray(tasks[0].tickets)).toBe(true);
      expect(tasks[0].tickets.length).toBe(0);
      expect(typeof tasks[0].owner).toBe("object");
      expect(tasks[0].owner.id).toBe(user.id);
      expect(tasks[0].owner.name).toBe(user.name);
      expect(tasks[0].owner.email).toBe(user.email);
      expect(tasks[0].owner.validate).toBe(user.validate);
    });

    it("Must create database entry", async () => {
      const ret = await prisma.task.findUnique({where: {id: tasks[0].id}});
      expect(ret).toBeDefined();
    });
  });
  /***/

  /**
  * Get all tasks 
  */
  describe("getAll", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getAll();
    });

    it("Must return an object", () => {
      expect(Array.isArray(ret)).toBe(true);
    });

    it("Must have all tasks", () => {
      expect(ret.filter((el) => el.projectId === parents[0].id).length).toBeGreaterThan(0);
      expect(ret.filter((el) => el.projectId === parents[1].id).length).toBeGreaterThan(0);
    });

    it("Must return correct value type", () => {
      expect(typeof ret[0].id === "string").toBe(true);
      expect(typeof ret[0].name === "string").toBe(true);
      expect(typeof ret[0].description === "string").toBe(true);
      expect(typeof ret[0].status === "string");
      expect(ret[0].created).toBeInstanceOf(Date);
      expect(typeof ret[0].projectId === "string").toBe(true);
    });

    it("Must return correct owner", () => {
      let tmp = ret.find((el) => el.owner.id === user.id);

      expect(tmp).toBeDefined();
      expect(typeof tmp.owner).toBe("object");
      expect(tmp.owner.id).toBe(user.id);
      expect(tmp.owner.name).toBe(user.name);
      expect(tmp.owner.email).toBe(user.email);
      expect(tmp.owner.validate).toBe(user.validate);
    });
  });
  /***/

  /**
  * Get one task 
  */
  describe("getById", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getById(tasks[0].id);
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return correct value", () => {
      expect(ret.id).toBe(tasks[0].id);
      expect(ret.name).toBe(tasks[0].name);
      expect(ret.description).toBe(tasks[0].description);
      expect(ret.created).toStrictEqual(tasks[0].created);
      expect(ret.status).toBe(tasks[0].status);
      expect(ret.projectId).toBe(parents[0].id);
      expect(ret.projectId).toBe(tasks[0].projectId);
      expect(Array.isArray(ret.comments)).toBe(true);
      expect(ret.comments.length).toBe(0);
      expect(Array.isArray(ret.tickets)).toBe(true);
      expect(ret.tickets.length).toBe(0);
      expect(typeof ret.owner).toBe("object");
      expect(ret.owner.id).toBe(user.id);
      expect(ret.owner.name).toBe(user.name);
      expect(ret.owner.email).toBe(user.email);
      expect(ret.owner.validate).toBe(user.validate);
    });
  });
  /***/

  /**
  * Get all tasks in project
  */
  describe("getAllFromProject", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getAllFromProject(parents[0].id);
    });

    it("Must return an array", () => {
      expect(Array.isArray(ret)).toBe(true);
    });

    it("Return correct value type", () => {
      expect(typeof ret[0].id === "string").toBe(true);
      expect(typeof ret[0].name === "string").toBe(true);
      expect(typeof ret[0].description).toBe("string");
      expect(typeof ret[0].status === "string").toBe(true);
      expect(ret[0].created).toBeInstanceOf(Date);
      expect(typeof ret[0].projectId === "string").toBe(true);
    });

    it("Must not contain another parentId", () => {
      let tmp = ret.filter((el) => el.parentId === parents[0].id);
      expect(tmp.length).toBe(0);
    });

    it("Must return correct owner", () => {
      let tmp = ret.find((el) => el.owner.id === user.id);

      expect(tmp).toBeDefined();
      expect(typeof tmp.owner).toBe("object");
      expect(tmp.owner.id).toBe(user.id);
      expect(tmp.owner.name).toBe(user.name);
      expect(tmp.owner.email).toBe(user.email);
      expect(tmp.owner.validate).toBe(user.validate);
    });
  });
  /***/

  /**
  * Update task by id 
  */
  describe("update", () => {
    const data: tasksDto.UpdateInput = {
      name: "Updated",
      description: "Updated",
      status: "open"
    }
    let ret;
    
    beforeAll(async () => {
      ret = await controller.update(tasks[0].id, data);
    });

    it("Must retunr an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return correct value type", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(typeof ret.name === "string").toBe(true);
      expect(typeof ret.description).toBe("string");
      expect(typeof ret.status === "string").toBe(true);
      expect(ret.created).toBeInstanceOf(Date);
      expect(Array.isArray(ret.comments)).toBe(true);
      expect(Array.isArray(ret.tickets)).toBe(true);
      expect(typeof ret.projectId === "string").toBe(true);
    });

    it("Must return correct updated value", () => {
      expect(ret.status).toBe("open");
      expect(ret.name).toBe("Updated");
      expect(ret.description).toBe("Updated");
    });

    it("Must return correct owner", () => {
      expect(typeof ret.owner).toBe("object");
      expect(ret.owner.id).toBe(user.id);
      expect(ret.owner.name).toBe(user.name);
      expect(ret.owner.email).toBe(user.email);
      expect(ret.owner.validate).toBe(user.validate);
    });

    it("Must not modify another field", () => {
      expect(ret.created).toStrictEqual(tasks[0].created);
      expect(ret.owner).toStrictEqual(tasks[0].owner);
    });
  });
  /***/

  /**
  * Delete tasks by id 
  */
  describe("delete", () => {
    beforeAll(async () => {
      await controller.delete(tasks[0].id);
    });

    it("Must remove database entry", async () => {
      let ret = await prisma.task.findUnique({where: {id: tasks[0].id}});
      expect(ret === null || ret === undefined).toBe(true);
    });
  });
  /***/
});