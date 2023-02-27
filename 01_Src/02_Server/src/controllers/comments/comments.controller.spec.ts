/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-23 10:45:52                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-24 17:18:41                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Create comment
  * Get comments from parent
  * Delete comment
*/

/* Imports */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { CommentsController } from './comments.controller';
import { Project, Comment } from '@prisma/client';
/***/

/* Dto */
import * as commentsDto from "../../dto/comments.dto";
import * as projectsDto from "../../dto/projects.dto";
/***/

describe('CommentsController', () => {
  let controller: CommentsController;
  let prisma: PrismaService;
  let testParent: Project;
  let testComment: Comment;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [PrismaService]
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    prisma = module.get<PrismaService>(PrismaService);

    const data: projectsDto.CreateInput = {
      name: "Test project",
      description: "Testing purpose",
      status: "new",
      version: "1.0.0"
    };

    testParent = await prisma.project.create({data: data});
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
  * Create comments from parent
  */
  describe("addComments", () => {
    let ret;
    const data: commentsDto.CreateInput = {
      content: "Good job !"
    };

    beforeAll(async () => {
      ret = await controller.addComment({
        parent: "projects",
        id: testParent.id
      }, data);

      testComment = {...ret};
    });

    it("Must return object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must create database entry", async () => {
      let c = await prisma.comment.findUnique({where: {id: ret.id}});
      expect(c !== null && c !== undefined).toBe(true);
    });

    it("Must return value", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(ret.created).toBeInstanceOf(Date);
      expect(typeof ret.content === "string").toBe(true);
    });
  });
  /***/

  /**
  * Get comments from parent
  */
  describe("getComments", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getComments({
        parent: "projects",
        id: testParent.id
      });
    });

    it("Must return an object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must contain", () => {
      expect(ret[0].id).toBe(testComment.id);
      expect(ret[0].created).toStrictEqual(testComment.created);
      expect(ret[0].content).toBe(testComment.content);
    });

    it("Return correct comments nb", () => {
      expect(ret.length === 1).toBe(true);
    });
  });
  /***/

  /**
  * Delete comment
  */
  describe("delete", () => {
    beforeAll(async () => {
      await controller.delete(testComment.id);
    });

    afterAll(async () => {
      await prisma.project.delete({where: {id: testParent.id}});
    });

    it("Must remove db entry", async () => {
      try {
        prisma.comment.delete({where: {id: testComment.id}});
      } catch (err) {
        expect(err.status).toBe(404);
      }
    });
  });
  /***/
});
