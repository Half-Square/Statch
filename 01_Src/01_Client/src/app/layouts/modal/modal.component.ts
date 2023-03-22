/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 13:57:41                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-20 15:35:44                              *
 *                                                                           *
 ****************************************************************************/

import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() iconPosition: string = "";

  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();

  public closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen)
  }

}
