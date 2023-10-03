/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-25 15:38:06                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-02 18:37:09                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Pipes
*/

/* Imports */
import { NgModule } from "@angular/core";
/***/

/* Pipes */
import { RecoveryPipe } from "./recovery.pipe";
import { SearchPipe } from "./search.pipe";
import { DateDifferencePipe } from "./date-difference.pipe";
import { OrderByPipe } from "./order-by.pipe";
/***/

@NgModule({
  declarations: [
    RecoveryPipe,
    SearchPipe,
    DateDifferencePipe,
    OrderByPipe
  ],
  imports: [

  ],
  providers: [

  ],
  exports: [
    RecoveryPipe,
    SearchPipe,
    DateDifferencePipe,
    OrderByPipe
  ]
})
export class PipesModule { }
