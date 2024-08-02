/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2024-01-11 14:55:06                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-02 20:43:48                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Filter list of items by parameters
  * Sort list of items by parameters
  * Sort list of items by versions
  * Sort list of items by levels
  * Sort list of items by status
  * Sort list of items by status, levels
*/

/* Imports */
import { Injectable } from "@angular/core";
import * as _ from "lodash";
/***/

/* Interfaces */
import {
  IAssignments,
  ILabels,
  IProjects,
  ITasks,
  ITickets,
  IVersions

} from "src/app/interfaces";
/***/

@Injectable({
  providedIn: "root"
})
export class FilterSortService {
  /**
  * Filter list of items by parameters
  * @param items - List of items need to filter
  * @param filters - Filters parameters
  * @returns - List of items filtered
  */
  public filterItems<T extends IProjects | ITasks | ITickets>(
    items: T[],
    filters: any
  ): T[] {

    let filteredItems = _.cloneDeep(items);

    // Assignments
    if (filters.assignments.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        return filters.assignments.some((assignment: IAssignments) => {
          return item.assignments.some((itemAssignment: IAssignments) => {
            return assignment.id === itemAssignment.userId;
          });
        });
      });
    }

    // Versions
    if (filters.version.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        if ("actualVersion" in item) {
          if(filters.version === null)
            return (item as IProjects).actualVersion === null;
          else
            return filters.version.some(
              (versions: {
                id: string,
                name: string,
                projectId: string}
              ) => (item as IProjects).actualVersion === versions.id
            );
        } else {
          if(filters.version === null)
            return (item as ITasks | ITickets).targetVersionId === null;
          else
            return filters.version.some(
              (versions: {
                id: string,
                name: string,
                taskId?: string,
                ticketId?: string}
              ) => (item as ITasks | ITickets).targetVersionId === versions.id
            );
        }
      });
    }

    // Status
    if (filters.status.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        return filters.status.some(
          (status: {id: string, status: string}) => item.status === status.status
        );
      });
    }

    // Labels
    if (filters.labels.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        return filters.labels.some((labels: ILabels) => {
          if(item.labels.length == 0) return item;
          return item.labels.some((itemLabels: any) => {
            return labels.id === itemLabels.labelId;
          });
        });
      });
    }

    // Levels
    if (filters.level.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        return filters.level.some(
          (level: {id: string, level: string}) => item.level === level.level
        );
      });
    }

    return filteredItems;
  }
  /***/

  /**
  * Sort list of items by parameters
  * @param items - List of items need to sort
  * @param sortBy - Sorts parameters
  * @returns - List of items sorted
  */
  public sortItems<T extends IProjects | ITasks | ITickets>(
    items: T[],
    sortBy: any
  ): T[] {
    let sortItems = _.cloneDeep(items);

    sortBy.map((sort: any) => {
      if(sort.id === "level")
        sortItems = this.sortLevels(sortItems);
      if(sort.id === "status")
        sortItems = this.sortStatus(sortItems);
      if(sort.id === "labels")
        sortItems = _.orderBy(sortItems, "labels", ["asc"]);
      if(sort.id === "assignments")
        sortItems = _.orderBy(sortItems, "assignments", ["asc"]);
      if(sort.id === "actualVersion")
        sortItems = _.orderBy(sortItems, "actualVersion", ["asc"]);
      if(sort.id === "targetVersion")
        sortItems = _.orderBy(sortItems, "targetVersion", ["asc"]);
    });

    return sortItems;

  }
  /***/

  /**
  * Sort list of items by versions
  * @param items - List of items need to sort
  * @returns - List of items sorted
  */
  public sortVersions(items: IVersions[]): IVersions[] {
    const getVersionParts = (items: IVersions): number[] => items.name.split(".").map(Number);
    return _.orderBy(items, getVersionParts, ["desc"]);
  }
  /***/

  /**
  * Sort list of items by levels
  * @param items -  List of items need to sort
  * @returns - List of items sorted
  */
  public sortLevels<T extends IProjects | ITasks | ITickets>(items: T[]): T[] {
    const levelOrder: Record<string, number>
      = { high: 1, moderate: 2, normal: 3, low: 4 };
    const getLevelWeight =
      (item: T): number => levelOrder[item.level as keyof typeof levelOrder];

    return _.orderBy(items, getLevelWeight, ["asc"]);
  }
  /***/

  /**
  * Sort list of items by status
  * @param items -  List of items need to sort
  * @returns - List of items sorted
  */
  public sortStatus<T extends IProjects | ITasks | ITickets>(items: T[]): T[] {
    const statusOrder: Record<string, number>
      = { progress: 1, new: 2, wait: 3, reject: 4, done: 5 };
    const getStatusWeight =
    (item: T): number => statusOrder[item.status as keyof typeof statusOrder];

    return _.orderBy(items, getStatusWeight, ["asc"]);
  }
  /***/

  /**
  * Sort list of items by status, levels
  * @param items -  List of items need to sort
  * @returns - List of items sorted
  */
  public sortPTT<T extends IProjects | ITasks | ITickets>(items: T[]): T[] {
    const levelOrder: Record<string, number>
      = { high: 1, moderate: 2, normal: 3, low: 4 };
    const statusOrder: Record<string, number>
      = { progress: 1, new: 2, wait: 3, reject: 4, done: 5 };

    const sortByLevel =
      (item: T): number => levelOrder[item.level as keyof typeof levelOrder];
    const sortByStatus =
      (item: T): number => statusOrder[item.status as keyof typeof statusOrder];

    const sortBy = [
      sortByStatus,
      sortByLevel
    ];
    return _.orderBy(items, sortBy, "asc");
  }
  /***/
}
