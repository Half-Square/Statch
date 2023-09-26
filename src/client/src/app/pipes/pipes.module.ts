/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-25 15:38:06                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-26 10:43:35                              *
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
/***/

@NgModule({
  declarations: [
    RecoveryPipe,
    SearchPipe,
    DateDifferencePipe
  ],
  imports: [

  ],
  providers: [

  ],
  exports: [
    RecoveryPipe,
    SearchPipe,
    DateDifferencePipe
  ]
})
export class PipesModule { }
