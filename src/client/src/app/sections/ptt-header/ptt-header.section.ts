/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-27 14:08:53                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-29 17:04:07                              *
 ****************************************************************************/

import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: "section-ptt-header",
  templateUrl: "./ptt-header.section.html",
  styleUrls: ["./ptt-header.section.scss"]
})
export class PttHeaderSection {

  constructor(private renderer: Renderer2) {
    this.renderer.listen("window", "click", (e: Event) => {
      if(this.titleEl && this.descriptionEl &&
        this.titleEl.nativeElement && this.descriptionEl.nativeElement &&
        !this.titleEl.nativeElement.contains(e.target) &&
         !this.descriptionEl.nativeElement.contains(e.target)) {
        this.editTitle = false;
        this.editDescription = false;
        this.callback.emit(this.content(this.contentEl));
      }
    });
  }

  @Input()
    editTitle: boolean = false;

  @Input()
    editDescription: boolean = false;

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

  @HostListener("document:keydown", ["$event"])
  saveEnter(event: KeyboardEvent): void {
    if(event.key === "Enter") {
      if(this.descriptionEl && this.descriptionEl.nativeElement) {
        this.descriptionEl.nativeElement.addEventListener("keypress", (evt: any) => {
          if(evt.key === "Enter" && !evt.shiftKey) {
            evt.preventDefault();
            this.callback.emit(this.content(this.contentEl));
            this.editDescription = false;
          }
        });
      }
      if(this.titleEl && this.titleEl.nativeElement) {
        this.titleEl.nativeElement.addEventListener("keypress", (evt: any) => {
          if(evt.key === "Enter") {
            evt.preventDefault();
            this.callback.emit(this.content(this.contentEl));
            this.editTitle = false;
          }
        });
      }
    }
  }

  public contentEl: any = {};

  public toggleEdit(where: string): void {
    if(where === "title")
      this.editTitle = true;
    else
      this.editDescription = true;
  }

  public content(event: Event): any {
    this.contentEl = {
      name: this.titleEl.nativeElement.innerHTML,
      description: this.descriptionEl.nativeElement.innerHTML
    };
    return this.contentEl;
  }
}
