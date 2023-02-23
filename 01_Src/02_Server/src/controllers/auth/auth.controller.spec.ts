/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-02-23 10:44:41                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-02-23 14:58:00                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Dto
  * Services
  * Create user in database
  * Get all user
  * Get one user
  * Connect user
  * Activate user
  * Delete user
*/

/* Imports */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
/***/

/* Dto */
import * as usersDto from "../../dto/users.dto";
/***/

/* Services */
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';
/***/

describe('AuthController', () => {
  let controller: AuthController;
  let prisma: PrismaService;
  let testUser: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [PrismaService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
  * Create user in database
  */
  describe("Create user", () => {
    let ret;
    const data: usersDto.RegisterInput = {
      email: "test@test.fr",
      name: "test",
      password: "1234"
    };

    beforeAll(async () => {
      ret = await controller.register(data);
      testUser = {...ret};
    });

    it("Must return a object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Return must contain", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(typeof ret.name === "string").toBe(true);
      expect(typeof ret.email === "string").toBe(true);
      expect(typeof ret.validate === "boolean").toBe(true);
    });

    it("Return must not contain", () => {
      expect(ret["password"] === undefined).toBe(true);
    });

    it("Must create entry in database", async () => {
      const u = await prisma.user.findUnique({where: {id: ret.id}});

      expect(typeof u.id === "string").toBe(true);
      expect(typeof u.name === "string").toBe(true);
      expect(typeof u.email === "string").toBe(true);
      expect(typeof u.password === "string").toBe(true);
      expect(typeof u.validate === "boolean").toBe(true);
    });

    it("Must not be able to create duplicated email", async () => {
      const data: usersDto.RegisterInput = {
        email: "test@test.fr",
        password: "1234",
        name: "test"
      };

      try {
        await controller.register(data);
      } catch (err) {
        expect(err.status === 406).toBe(true);
      }
    });
  });
  /***/

  /**
  * Get all user 
  */
  describe("getAll", () => {
    let ret;
    
    beforeAll(async () => {
      ret = await controller.getAll()
    });

    it("Should return an array", () => {
      expect(Array.isArray(ret)).toBe(true);
    });

    it("Must contain", () => {
      expect(typeof ret[0].id == "string").toBe(true);
      expect(typeof ret[0].name == "string").toBe(true);
      expect(typeof ret[0].validate == "boolean").toBe(true);
    });

    it("Must not contain password", () => {
      expect(ret[0]["password"] === undefined).toBe(true);
    });
  });
  /***/

  /**
  * Get one user 
  */
  describe("getOne", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.getOne(testUser.id)
    });
    
    it("Must return a object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must contain", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(typeof ret.name === "string").toBe(true);
      expect(typeof ret.email === "string").toBe(true);
      expect(typeof ret.validate === "boolean").toBe(true);
    });

    it("Must not contain", () => {
      expect(ret["password"] === undefined).toBe(true);
    });

    it("Values must be", () => {
      expect(ret.id === testUser.id).toBe(true);
      expect(ret.email === testUser.email).toBe(true);
      expect(ret.name === testUser.name).toBe(true);
      expect(ret.validate === testUser.validate).toBe(true);
    });
  });
  /***/

  /**
  * Connect user 
  */
  describe("login", () => {
    const data: usersDto.ConnectInput = {
      email: "test@test.fr",
      password: "1234"
    };

    let ret;

    beforeAll(async () => {
      ret = await controller.login(data);
    });

    it("Must return object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must contain", () => {
      expect(typeof ret.id === "string").toBe(true);
      expect(typeof ret.email === "string").toBe(true);
      expect(typeof ret.name === "string").toBe(true);
      expect(typeof ret.token === "string").toBe(true);
    });

    it("Must not contain", () => {
      expect(ret["password"] === undefined).toBe(true);
    });

    it("Value must be", () => {
      expect(ret.id === testUser.id).toBe(true);
      expect(ret.email === testUser.email).toBe(true);
      expect(ret.name === testUser.name).toBe(true);
    });
  });
  /***/

  /**
  * Activate user 
  */
  describe("activate", () => {
    let ret;
    
    beforeAll(async () => {
      ret = await controller.activate(testUser.id);
    });
    
    it("Must return object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return user's details", () => {
      expect(ret.id === testUser.id).toBe(true);
      expect(ret.email === testUser.email).toBe(true);
      expect(ret.name === testUser.name).toBe(true);
      expect(ret.validate).toBe(true);
    });

    it("Must not contain", () => {
      expect(ret["password"] === undefined).toBe(true);
    });

    it("Must activate user", () => {
      expect(ret.validate === true);
    });
  });
  /***/

  /**
  * Delete user 
  */
  describe("delete", () => {
    let ret;

    beforeAll(async () => {
      ret = await controller.delete(testUser.id);
    });

    it("Must return object", () => {
      expect(typeof ret === "object").toBe(true);
    });

    it("Must return success message", () => {
      expect(ret.message === "User deleted");
    });

    it("Must remove entry in database", async () => {
      const u = await prisma.user.findUnique({where: {id: testUser.id}});
      expect(u).toBe(null);
    });
  });
  /***/
});
