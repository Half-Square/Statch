/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-25 15:20:21                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-17 00:56:37                              *
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
    collection: string,
    reject?: string[]
  ): Promise<string> {
    return new Promise(async(resolve) => {
      if(!id) return resolve("");

      if(collection.length === 0) return resolve(id);
      if(id.toLocaleLowerCase() == collection) return resolve(id);
      if(reject?.includes(id.toLocaleLowerCase())) return resolve(id);

      let el: any = await this.recovery.getSingleSync(collection, id);

      return resolve(el ? el[key] : "");
    });
  }

}
