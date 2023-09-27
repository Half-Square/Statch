/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-09-27 14:08:53                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-09-27 14:08:53                               *
 *****************************************************************************/

import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: "section-ptt-header",
  templateUrl: "./ptt-header.section.html",
  styleUrls: ["./ptt-header.section.scss"]
})
export class PttHeaderSection {

  constructor(private renderer: Renderer2) {
    this.renderer.listen("window", "click", (e: Event) => {
      if(!this.titleEl.nativeElement.contains(e.target) &&
         !this.descriptionEl.nativeElement.contains(e.target)) {
        this.edit = false;
        this.callback.emit(this.content(this.contentEl));
      }
    });
  }

  @Input()
    edit: boolean = false;

  @Input()
    title: string = "";

  @Input()
    description: string = "";

  @Output()
    callback: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("titleEl", { static: false })
    titleEl!: ElementRef;

  @ViewChild("descriptionEl", { static: false })
    descriptionEl!: ElementRef;

  public contentEl: any = {};

  public toggleEdit(): void {
    this.edit = true;
    this.callback.emit(this.content(this.contentEl));
  }

  public content(event: Event): any {
    this.contentEl = {
      name: this.titleEl.nativeElement.innerHTML,
      description: this.descriptionEl.nativeElement.innerHTML
    };
    return this.contentEl;
  }
}
