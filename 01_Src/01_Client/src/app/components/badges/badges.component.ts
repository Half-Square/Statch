/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-04-11 16:09:50                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-04-11 16:39:36                               *
 *****************************************************************************/

import { Component, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent {
  @Input() number: number = 0;

  @Input() size: string = "md";
  @Input() top: number = 0;
  @Input() right: number = 0;

  public classes: string = "";

  public position(): any {
    let ret = {
      'top': this.top+'px',
      'right': this.right+'px'
    }
    return ret
  }

  ngOnInit(): void {
    this.classes = this.size;
  }
}
