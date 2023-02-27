/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-23 10:37:07                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-27 14:48:49                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Create ticket
  * Get all tickets
  * Get one ticket
  * Get all tickets in tasks
  * Update ticket
  * Delete ticket
*/

/* Imports */
import { Test, TestingModule } from '@nestjs/testing';
import { Project, Task, Ticket } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { TicketsController } from './tickets.controller';
/***/

describe('TicketsController', () => {
  let controller: TicketsController;
  let prisma: PrismaService;
  let project: Project;
  let task: Task;
  let ticket: Ticket;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [PrismaService]
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    prisma = module.get<PrismaService>(PrismaService);
  
    const projectData = {
      name: "Test project",
      description: "Testing purpose"
    };

    project = await prisma.project.create({data: projectData});

    const taskData = {
      name: "Test task",
      description: "Testing purpose",
      projectId: project.id
    };

    task = await prisma.task.create({data: taskData});
  });

  afterAll(async () => {
    await prisma.task.delete({where: {id: task.id}});
    await prisma.project.delete({where: {id: project.id}});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
  * Create ticket 
  */
  describe("create", () => {
    let ret;
    const data = {
      name: "Test ticket",
      description: "Testing purpose"
    };

    beforeAll(async () => {
      ret = await controller.create(task.id, data);
      ticket = {...ret};
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return correct value", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(ret.name).toBe(data.name);
      expect(ret.description).toBe(data.description);
      expect(ret.taskId).toBe(task.id);
      expect(Array.isArray(ret.comments)).toBe(true);
    });

    it("Must create database entry", async () => {
      let tmp = await prisma.ticket.findUnique({where: {id: ticket.id}});
      expect(tmp).toBeDefined();
    });
  });
  /***/

  /**
  * Get all tickets 
  */
  describe("getAll", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getAll();
    });

    it("Must return an array", () => {
      expect(Array.isArray(ret)).toBe(true);
    });

    it("Must return contain", () => {
      expect(typeof ret[0].id === "string").toBe(true);
      expect(typeof ret[0].name === "string").toBe(true);
      expect(typeof ret[0].description).toBe("string");
      expect(typeof ret[0].status === "string").toBe(true);
      expect(typeof ret[0].taskId === "string").toBe(true);
    });
  });
  /***/

  /**
  * Get one ticket  
  */
  describe("getOne", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getOne(ticket.id);
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must contain", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(typeof ret.name === "string").toBe(true);
      expect(typeof ret.description).toBe("string");
      expect(typeof ret.status === "string").toBe(true);
      expect(typeof ret.taskId === "string").toBe(true);
      expect(Array.isArray(ret.comments)).toBe(true);
    });

    it("Must return correct value", () => {
      expect(ret.id).toBe(ticket.id);
      expect(ret.name).toBe(ticket.name);
      expect(ret.description).toBe(ticket.description);
      expect(ret.taskId).toBe(task.id);
      expect(ret.status).toBe(ticket.status);
      expect(ret.comments.length).toBe(0);
    });
  });
  /***/

  /**
  * Get all tickets in task 
  */
  describe("getAllFromTask", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getAllFromTask(task.id);
    });

    it("Must return an array", () => {
      expect(Array.isArray(ret)).toBe(true);
    });

    it("Must contain", () => {
      expect(typeof ret[0].id === "string").toBe(true);
      expect(typeof ret[0].name === "string").toBe(true);
      expect(typeof ret[0].description).toBe("string");
      expect(typeof ret[0].status === "string").toBe(true);
    });

    it("Must found ticket", () => {
      let tmp = ret.find((el) => el.id === ticket.id);
      expect(tmp).toBeDefined();
    });
  });
  /***/

  /**
  * Update ticket 
  */
  describe("update", () => {
    let ret;
    const data = {
      name: "Updated",
      description: "Updated",
      status: "open"
    };

    beforeAll(async () => {
      ret = await controller.update(ticket.id, data);
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must contain", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(typeof ret.name === "string").toBe(true);
      expect(typeof ret.description).toBe("string");
      expect(typeof ret.status === "string").toBe(true);
      expect(typeof ret.taskId === "string").toBe(true);
      expect(Array.isArray(ret.comments)).toBe(true);
    });

    it("Must return correct value", () => {
      expect(ret.id).toBe(ticket.id);
      expect(ret.name).toBe(data.name);
      expect(ret.description).toBe(data.description);
      expect(ret.taskId).toBe(task.id);
      expect(ret.status).toBe(data.status);
      expect(ret.comments.length).toBe(0);
    });
  });
  /***/

  /**
  * Delete ticket 
  */
  describe("delete", () => {
    beforeAll(async () => {
      await controller.delete(ticket.id);
    });

    it("Must remove database entry", async () => {
      let tmp = await prisma.ticket.findUnique({where: {id: ticket.id}});
      expect(tmp === undefined || tmp === null).toBe(true);
    });
  });
  /***/
});
