/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-03-17 13:57:41                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-09-29 15:25:21                              *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter  } from "@angular/core";

@Component({
  selector: "component-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() iconPosition: string = "";
  @Output() isOpenChange = new EventEmitter();

  public closeModal(): void {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
