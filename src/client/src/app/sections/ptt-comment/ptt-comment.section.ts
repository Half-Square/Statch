/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-27 15:26:28                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-12-02 14:02:38                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Service
*/

/* Imports */
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { environment as env } from "src/environments/environment";
/***/

/* Interfaces */
import { IComments, IProjects, ITasks, ITickets } from "src/app/interfaces";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { UserService } from "src/app/services/user.service";
import { FormControl, FormGroup } from "@angular/forms";
/***/

import { QuillEditorComponent } from "ngx-quill";

import "quill-mention";
import Quill from "quill";

@Component({
  selector: "section-ptt-comment",
  templateUrl: "./ptt-comment.section.html",
  styleUrls: ["./ptt-comment.section.scss"]
})
export class PttCommentSection implements OnInit {
  @Input() item: IProjects | ITasks | ITickets;
  @Input() type: string;
  @Input() comments: IComments[] = [];
  public html: any;
  public form: FormGroup;
  @ViewChild(QuillEditorComponent, { static: true }) editor: QuillEditorComponent;


  modules = {
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      linkTarget: "_self",
      mentionDenotationChars: ["@", "#"],
      blotName: "styled-mention",
      // Dans la liste
      renderItem: (item: any, searchTerm: any): string => {
        console.log(item);
        return `<span>test</span>`;
      },
      source: function(searchTerm: any, renderList: any, mentionChar: any): any {
        const atValues = [
          { id: 1, value: "Fredrik Sundqvist", link: "https://www.google.com", target: mentionChar },
          { id: 2, value: "Patrik Sjölin", link: "https://www.google.com", target: mentionChar }
        ];
        const hashValues = [
          { id: 3, value: "Fredrik Sundqvist 2" },
          { id: 4, value: "Patrik Sjölin 2" }
        ];
        let values;

        if (mentionChar === "@") {
          values = atValues;
        } else {
          values = hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
      showDenotationChar: false
    }
  };


  @ViewChild("commentEditor") commentEditor!: ElementRef;

  constructor(private api: RequestService,
              private sanitizer: DomSanitizer,
              private user: UserService) {
  }

  ngOnInit(): void {
    console.log(this.editor);
    const MentionBlot = Quill.import("blots/mention");

    class StyledMentionBlot extends MentionBlot {
      static render(data: any): any {
        const element = document.createElement("a");
        console.log(data);
        let prefix = data.target === "@" ? "@" : "#";
        element.innerText = prefix + data.value;
        element.style.color = data.color;
        element.href = data.link;
        return element;
      }
    }
    StyledMentionBlot["blotName"] = "styled-mention";

    Quill.register(StyledMentionBlot);

    this.form = new FormGroup({
      text: new FormControl()
    });
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
        }).catch((err: any) => {
          console.error(err);
        });
      }
    }
  }

  public insertImage(img: string): void {
    let i = img.indexOf("style");
    img = img.slice(0, i)+" style='max-width: 100%' "+img.slice(i);
    this.commentEditor.nativeElement.insertAdjacentHTML("beforeend", img);
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

  public trustedContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
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
          this.form.reset();
        });
    }
    this.form.reset();
  }
  /***/

  /**
  * Get content in dom
  * @return - Content string
  */
  public content(): string {
    return this.form.get("text")!.value;
  }
  /***/

  /**
  * Check if string is empty or not
  * @returns - Boolean
  */
  public isEmpty(): boolean {
    return this.form.get("text")!.value === null || this.form.get("text")!.value.replace(/^<p>/, "").replace(/<\/p>$/, "").trim() === "";
  }
  /***/
}
