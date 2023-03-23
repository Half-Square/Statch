/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-17 13:07:58                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-22 14:46:49                              *
 ****************************************************************************/

import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent {

  constructor() {
  }
  @Input() label: string = "";
  @Input() status: string = "";

  @Input() type: string = "";
  @Input() id: string = "";

  @Input() depth: number = 0;

  @Input() noContent: boolean = false;
  @Input() isOpen: boolean = false;

  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>;

  public showCollapse: boolean = false;
  public isInit: boolean = false;

  /**
  * @name indent
  * @descr indent colapse content from depth
  *
  */
  public indent(): Object {
    let transform = this.depth * 16 * this.depth;
    return { transform: 'translate(' + transform + 'px)' };
  }
  /***/

  /**
  * @name toggleCollapse
  * @descr Close / Open collapse
  *
  *
  */
  public toggleCollapse(): void {
    this.isInit = true;

    this.showCollapse = !this.showCollapse;
    if (this.showCollapse)
      this.onOpen.emit();
  }
  /***/

  /**
  * @name show
  * @descr return showCollapse if the component is init else isOpen
  *
  * @returns boolean
  */
  public show(): boolean {
    if (this.isInit)
      return this.showCollapse
    return this.showCollapse = this.isOpen
  }
  /***/
}
