/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-25 15:20:21                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-25 16:18:24                               *
 *****************************************************************************/

import { Pipe, PipeTransform, Inject } from "@angular/core";
import { RecoveryService } from "src/app/services/recovery.service";

@Pipe({
  name: "recovery"
})
export class RecoveryPipe implements PipeTransform {

  constructor(@Inject(RecoveryService) private recovery: RecoveryService) {

  }

  transform(id: string, key: string, collection: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if(!id) return resolve("");
      console.log("1");

      this.recovery.getSingleSync(collection, id).then((el: any) => {
        console.log(el, id);
        console.log("2");

        return resolve(el ? el[key] : "");
      });
      console.log("3");

    });
  }

}
