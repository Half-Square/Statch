/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-25 15:20:21                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-11-17 09:31:30                              *
 ****************************************************************************/

import { Pipe, PipeTransform, Inject } from "@angular/core";
import { RecoveryService } from "src/app/services/recovery.service";

/* eslint-disable  @typescript-eslint/no-explicit-any */
@Pipe({
  name: "recovery"
})
export class RecoveryPipe implements PipeTransform {

  constructor(@Inject(RecoveryService) private recovery: RecoveryService) {
  }

  transform(
    id: string | null,
    key: string,
    collection: string
  ): Promise<string> {
    return new Promise(async(resolve) => {
      if(!id) return resolve("");
      else if(collection.length === 0) return resolve(id);
      else if(id.toLocaleLowerCase() == collection) return resolve(id);

      let el: any = await this.recovery.getSingleSync(collection, id);

      return resolve(el ? el[key] : "");
    });
  }

}
