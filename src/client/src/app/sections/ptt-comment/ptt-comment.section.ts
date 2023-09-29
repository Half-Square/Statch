/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-27 15:26:28                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-29 12:10:11                              *
 ****************************************************************************/

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

@Component({
  selector: "section-ptt-comment",
  templateUrl: "./ptt-comment.section.html",
  styleUrls: ["./ptt-comment.section.scss"]
})
export class PttCommentSection {
  @Input()
    comments: any = [];

  @Output()
    callback: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("contentEl", {static: false})
    contentEl!: ElementRef;

  public publish(): void {
    this.callback.emit(this.content(this.contentEl.nativeElement.value.replace(/\n/g, "<br/>")));
  }

  public content(event: Event): any {
    return this.contentEl.nativeElement.value.replace(/\n/g, "<br/>");
  }
}
