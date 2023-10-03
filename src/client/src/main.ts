/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-30 11:59:28                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-30 11:59:45                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
/***/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
