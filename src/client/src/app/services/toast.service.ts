/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-09-14 16:13:14                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-09-20 16:20:17                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Watch message change
  * Print message
  * Clear message
*/

/* Imports */
import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
/***/

interface ToastInterface {
  message: string,
  type: "error" | "warn" | "info" | "success"
}

@Injectable({
  providedIn: "root"
})
export class ToastService {
  private readonly time: number = 4000; // 4 sec
  private message: string = "";
  private type: "error" | "warn" | "info" | "success" = "info";
  private observer?: Subscriber<ToastInterface>;
  private tempo?: ReturnType<typeof setTimeout> | null;

  /**
  * Watch message change
  * @return - Current message
  */
  public getMessage(): Observable<ToastInterface> {
    return new Observable((observer) => {
      this.observer = observer;
      observer.next({message: this.message, type: this.type});
    });
  }
  /***/

  /**
  * Print message
  * @param message - Message to print
  */
  public print(message: string, type: "error" | "warn" | "info" | "success" = "info"): void {
    this.clear();

    this.message = message;
    this.type = type;
    this.observer?.next({message: message, type: type});

    this.tempo = setTimeout(() => {
      this.clear();
    }, this.time);
  }
  /***/

  /**
  * Clear message
  */
  public clear(): void {
    if (this.tempo) {
      clearTimeout(this.tempo);
      this.tempo = null;
      this.message = "";
      this.observer?.next({message: this.message, type: this.type});
    }
  }
  /***/
}
