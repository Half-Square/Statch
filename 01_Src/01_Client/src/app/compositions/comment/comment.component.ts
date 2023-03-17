/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 13:46:29                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 13:47:01                               *
 *****************************************************************************/

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() userId: string = "md";
  @Input() name: string = "";
  @Input() lastName: string = "";
  @Input() email: string = "";
  @Input() imgPath: string = "";
  @Input() created: string = "";
  @Input() content: string = "";
}
