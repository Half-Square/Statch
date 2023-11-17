/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-27 15:26:28                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-11-17 14:21:46                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Service
*/

/* Imports */
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { environment as env } from "src/environments/environment";
/***/

/* Interfaces */
import { IComments, IProjects, ITasks, ITickets } from "src/app/interfaces";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
/***/

@Component({
  selector: "section-ptt-comment",
  templateUrl: "./ptt-comment.section.html",
  styleUrls: ["./ptt-comment.section.scss"]
})
export class PttCommentSection {
  @Input() item: IProjects | ITasks | ITickets;
  @Input() type: string;
  @Input() comments: IComments[] = [];

  @ViewChild("commentEditor") commentEditor!: ElementRef;

  constructor(private api: RequestService,
              private user: UserService) {
  }

  public allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer) {
      const files = dataTransfer.files;
      if (files.length > 0) {
        this.handleFiles(files);
      }
    }
  }

  public handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        this.fileUpload(file).then((path: string) => {
          const img = `<img src="${env.serverUrl}/api/files/raw/${path}" alt="Image" />`;
          this.insertImage(img);
        }).catch(err => {
          console.error(err);
        });
      }
    }
  }

  public insertImage(img: string): void {
    const range = window.getSelection()?.getRangeAt(0);
    if (range) {
      const fragment = range.createContextualFragment(img);
      range.insertNode(fragment);
    }
  }

  public fileUpload(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let form = new FormData();
      form.append("file", file);

      let headers: HeadersInit = new Headers();
      headers.set("x-token", this.user.getUser()?.token || "");

      fetch(`${env.serverUrl}/api/files`, {
        method: "POST",
        headers: headers,
        body: form
      }).then(async(res) => {
        let json = await res.json();
        return resolve(json.path);
      }).catch(err => {
        return reject(err);
      });
    });
  }

  /**
  * Publish comment
  */
  public publish(): void {
    if(!this.isEmpty()) {
      this.api.post(`api/${this.type}/${this.item.id}/comments`, {
        content: this.content()
      }, this.user.getUser()?.token)
        .then(() => {
          this.commentEditor.nativeElement.innerHTML = "";
        });
    }
    this.commentEditor.nativeElement.innerHTML = "";
  }
  /***/

  /**
  * Get content in dom
  * @return - Content string
  */
  public content(): string {
    return this.commentEditor.nativeElement.innerHTML;
  }
  /***/

  /**
  * Check if string is empty or not
  * @returns - Boolean
  */
  public isEmpty(): boolean {
    return this.commentEditor.nativeElement.innerHTML.trim() === "";
  }
  /***/
}
