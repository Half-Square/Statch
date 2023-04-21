/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-02-21 14:06:44                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-04-14 15:34:46                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import {INestApplication, Injectable, NestMiddleware, OnModuleInit} from "@nestjs/common";
import {Prisma, PrismaClient, User} from "@prisma/client";
import { connect } from "http2";
/***/

type DBContext = {
  user: User;
};

export class ContextPrismaClient extends PrismaClient {
  
  constructor() {
    super()
    this.$use(this.consumeContextMiddleware)
  }

  private addContextProxy(model: Object, _context: DBContext) {
    return new Proxy(model, {
      get(target, p, receiver) {
        const method = Reflect.get(target, p, receiver);
  
        if (typeof method !== 'function') {
          return method;
        }
  
        return (args: unknown) => {
          if (typeof args !== 'object') {
            return method.call(target, args);
          }
  
          return method.call(target, { ...args, _context });
        };
      },
    });
  }
  
  public setContext(
    _context: DBContext
  ): ContextPrismaClient {
    let _this = this;
    return new Proxy(this, {
      get(target, p, receiver) {
        const original = Reflect.get(target, p, receiver);
  
        if (
          typeof p !== 'string' ||
          /^\$.+/.test(p) ||
          typeof original !== 'object'
        ) {
          return original;
        }
  
        return _this.addContextProxy(original, _context);
      },
    });
  }
  
  private consumeContextMiddleware: Prisma.Middleware = async (params, next) => {
    let findTab = [ "findFirst", "findMany", "findRaw",  "findUnique"]
    const before = Date.now()
    let context = params.args._context;

    if (!findTab.includes(params.action) && context) {
      console.log("Params with context: ",JSON.stringify(params.args._context))
    }

    params.args = (({ _context, ...o }) => o)(params.args)
    const result = await next(params);
    const after = Date.now()
    
    if (!findTab.includes(params.action)) {
      console.log("Params: ",JSON.stringify(params))
      console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
    }
    
    return result;
  }
}

