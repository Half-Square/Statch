/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-06-16 10:35:39                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2024-01-17 14:44:35                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Check
  * Identify
  * UpdateData
*/

/* Imports */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
/***/

@Injectable()
export class PermsService {

  constructor(private prisma: PrismaService) {}

  /**
   * Check if user can acces to an action
   * @param rules - Rules need to check
   * @param user - User information
   * @returns - Boolean
   */
  check(rules, user): boolean {
    if(!rules) return true;
    
    if (!user || !user.role) return false;

    const roles = user.role;

    const permissions = JSON.parse(roles.permissions)[0];
    let hasPermission = true;

    for (const actionSet of rules) {
      let elementType = actionSet.type;

      const actions = actionSet.actions;

      for (const action of actions) {
        
        if (typeof action == "string") {
          const vAction = permissions[elementType][action];

          if(!vAction)
            hasPermission = false;
        } else if (typeof action === "object") {
          const sActions = action["actions"] as string[];
          console.log(sActions);
          
          for (const sAction of sActions) {
            const subActions = permissions[elementType][action["type"]][sAction];
            
            // eslint-disable-next-line max-depth
            if (!subActions)
              hasPermission = false;
          }
        }
      }
    }
    
    return hasPermission;
  }
  /***/

  /**
   * Identify changes beetwenn old and new data
   * @param oldData - Old data
   * @param newData - New data 
   * @returns - Changes
   */
  private indentifyChanges(oldData, newData): any {
    const changes = {};
    for (const key in oldData) {

      if (oldData[key] != newData[key] && key != "assignments" && key != "labels") {
        changes[key] = { oldValue: oldData[key], newValue: newData[key] };
      } else if (key == "assignments") {
        const oldAssignments = oldData[key];
        const newAssignments = newData[key];

        if(oldAssignments.length !== newAssignments.length)
          changes[key] = { oldValue: oldData[key], newValue: newData[key] };
        
        oldAssignments.forEach(oldAssignment => {
          const same = newAssignments.find(
            newAssignment => newAssignment.userId === oldAssignment.userId);
          if(!same)
            changes[key] = { oldValue: oldData[key], newValue: newData[key] };
        });
      }  else if (key == "labels") {
        if(oldData[key].length != newData[key].length)
          changes[key] = { oldValue: oldData[key], newValue: newData[key] };
      }
    }

    return changes;
  }
  /***/


  /**
   * Change data or not
   * @param data - New data
   * @param id - Id of data
   * @param type - Type of data
   * @param user - User information
   * @param rules - Rules need to check
   * @returns - Boolean
   */
  async updateData(data: any, id: string, type: string, user, rules): Promise<boolean> {
    let oldData;

    if(type == "projects") {
      oldData = await this.prisma.project.findUnique({
        where: {id: id},
        include: {
          labels: true,
          assignments: true
        }
      });
    }
    if(type == "tasks") {
      oldData = await this.prisma.task.findUnique({
        where: {id: id},
        include: {
          labels: true,
          assignments: true
        }
      });
    }
    if(type == "tickets") {
      oldData = await this.prisma.ticket.findUnique({
        where: {id: id},
        include: {
          labels: true,
          assignments: true
        }
      });
    }
    if(type == "profile") {
      oldData = await this.prisma.user.findUnique({
        where: {id: id}
      });
    }
    
    const changes = this.indentifyChanges(oldData, data);
    
    let keyChanges = [];

    for (let i = 0; i < rules.length; i++) {
      const element = rules[i];
      if (changes.hasOwnProperty(element)) {
        keyChanges.push(element);
      }
    }

    const hasPermission = this.check([{type: type, actions: [{type: "update", actions: keyChanges}]}], user);
    
    return hasPermission;
  }
  /***/
}
