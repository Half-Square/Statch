/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-22 11:15:20                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-22 14:48:02                              *
 ****************************************************************************/

import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { CommentInterface } from 'src/app/services/project-list/project-list.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent {

  constructor(private api: ApiService) {}

  @Input() comments: Array<CommentInterface> = [];

  @Input() targetType: string = "";
  @Input() targetId: string = "";

  @Input() onEdit: boolean = false;

  public newCommentContent: string = "";

  /**
  * @name newComment
  * @descr POST new comment on Api then add it to the comments List
  *
  */
  public newComment(): void {
    let path = this.targetType+"/"+this.targetId+"/comments"
    this.api.request("POST", path, { content: this.newCommentContent} )
    .then((ret: any) => {
      this.comments.push(ret)
    })
  }
  /***/
}
