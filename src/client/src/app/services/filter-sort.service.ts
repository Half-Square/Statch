import { Injectable } from "@angular/core";
import * as _ from "lodash";

import { IAssignments, ILabels, IProjects, ITasks, ITickets } from "src/app/interfaces";

@Injectable({
  providedIn: "root"
})
export class FilterSortService {
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

  public sortItems<T extends IProjects | ITasks | ITickets>(
    items: T[],
    sortBy: any
  ): T[] {
    return _.orderBy(items, sortBy.map((el: any) => el.id), Array(sortBy.length).fill("asc") as ("asc" | "desc")[]);
  }
}
