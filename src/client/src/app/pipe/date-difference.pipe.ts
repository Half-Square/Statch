/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-03-29 16:53:46                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-25 11:25:02                              *
 ****************************************************************************/

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateDifference"
})
export class DateDifferencePipe implements PipeTransform {

  transform(value: string): string {
    const currentDate: Date = new Date();
    const givenDate: Date = new Date(value);
    const diffInMs: number = currentDate.getTime() - givenDate.getTime();
    const diffInDays: number = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours: number = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes: number = Math.floor(diffInMs / (1000 * 60));
    const diffInSeconds: number = Math.floor(diffInMs / 1000);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds > 0) {
      return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    } else {
      return "now";
    }
  }

}
