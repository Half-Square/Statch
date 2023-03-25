/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-17 12:11:36                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-25 17:27:13                              *
 ****************************************************************************/

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() userId: string = "";

  @Input() imgPath: string = "";
  @Input() alt: string = "";
  @Input() userName: string = "";

  public classes: string = "";

  ngOnInit() {
    this.userName = this.userName.charAt(0);
  }
}
