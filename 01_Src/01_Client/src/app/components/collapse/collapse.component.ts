/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 13:07:58                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-18 01:32:13                               *
 *****************************************************************************/

import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent {
  @Input() label: string = "";
  @Input() status: string = "";

  @Input() type: string = "";
  @Input() id: string = "";

  @Input() depth: number = 0;

  @Input() noContent: boolean = false;

  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>;

  public showCollapse: boolean = false;

  public indent(): Object {
    let transform = this.depth * 16 * this.depth;
    return { transform: 'translate(' + transform + 'px)' };
  }

  public toggleCollapse(): void {
    this.showCollapse = !this.showCollapse;

    if (this.showCollapse)
      this.onOpen.emit();
  }
}
