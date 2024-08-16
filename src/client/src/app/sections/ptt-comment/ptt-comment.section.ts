/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-09-27 15:26:28                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-16 12:24:07                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Service
  * Trusted Content Sanitizer
  * Publish comment
  * Delete comments
  * Check if someone is mention
  * Get content of markdown
  * Check if string is empty or not
*/

/* Imports */
import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as _ from "lodash";
/***/

/* Interfaces */
import { IComments, IProjects, ITasks, ITickets } from "src/app/interfaces";
/***/

/* Services */
import { RecoveryService } from "src/app/services/recovery.service";
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
import { UserService } from "src/app/services/user.service";
/***/


@Component({
  selector: "section-ptt-comment",
  templateUrl: "./ptt-comment.section.html",
  styleUrls: ["./ptt-comment.section.scss"]
})
export class PttCommentSection implements OnInit {
  @Input() item: IProjects | ITasks | ITickets;
  @Input() type: string;
  @Input() comments: IComments[] = [];
  public content: string;
  public hasPublish: boolean = false;
  public commentEdit: IComments | null;

  constructor(private api: RequestService,
              private sanitizer: DomSanitizer,
              private recovery: RecoveryService,
              private toast: ToastService,
              public user: UserService) {
  }

  ngOnInit(): void {
    this.comments.forEach((comment) => {
      return {
        ...comment,
        content: this.trustedContent(comment.content)
      };
    });
  }

  /**
  * Trusted Content Sanitizer
  * @param content - Html element stringify
  * @returns - SafeHtml element
  */
  public trustedContent(content: string): SafeHtml {
    console.log("Hello");
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  /***/

  /**
  * Publish comment
  */
  public publish(): void {
    if(!this.isEmpty()) {
      this.api.post(`api/${this.type}/${this.item.id}/comments`, {
        content: this.content
      }, this.user.getUser()?.token)
        .then(() => {
          this.checkIfMention(this.content);
          this.hasPublish = true;
        })
        .catch(() => this.hasPublish = false);
    }
    this.hasPublish = false;
  }
  /***/

  /**
  * Delete comments
  * @param id - Id of comments
  */
  public onDelete(id: string): void {
    this.api.delete(`api/${this.type}/${this.item.id}/comments/${id}`,
      this.user.getUser()?.token)
      .then(() => {
        this.recovery.updateData(this.item, this.type);
        this.toast.print("Comment has been removed", "success");
      });
  }
  /***/

  /**
  * Check if someone is mention
  * @param content - Html content of comments
  */
  private checkIfMention(content: string): void {
    let div = document.createElement("div");
    div.innerHTML = content;
    let mentions = Array.from(div.querySelectorAll("span.mention"));

    let mentionsContent = mentions.map(span => span.attributes);
    mentionsContent.forEach((mention: any) => {
      if(mention["data-target"].value === "@")
        this.pingUser(mention["data-id"].value, mention["data-value"].value);
    });
  }
  /***/

  private pingUser(id: string, name: string): void {
    console.log(id, name);
  }

  /**
  * Get content of markdown
  * @param event - Content of markdown
  */
  public getContent(event: string): void {
    this.content = event;
  }
  /***/

  /**
  * Check if string is empty or not
  * @returns - Boolean
  */
  public isEmpty(): boolean {
    return this.content === null || this.content.replace(/<p>|<\/p>|<br>/g, "").trim() === "";
  }
  /***/

  /**
  * On edit comment event
  * @param id - Comment's id to edit
  */
  public onEdit(id: string): void {
    let com = _.find(this.comments, {id: id});

    if (com) {
      this.commentEdit = com;
      this.content = com.content;
    }
  }
  /***/

  /**
  * Save comment .
  */
  public saveEdit(): void {
    console.log(this.commentEdit);

    if (this.commentEdit) {
      this.api.put(
        `api/comments/${this.commentEdit.id}`,
        {...this.commentEdit, content: this.content},
        this.user.getUser()?.token)
        .then((ret) => {
          let index = _.findIndex(this.comments, {id: (ret as IComments).id});
          if (index != -1) this.comments[index] = (ret as IComments);

          this.recovery.updateData(ret, `${this.type}/${this.item.id}/comments`);
          this.cancelEdit();
        }).catch((err) => {
          console.error(err);
          this.toast.print("An error occured !", "error");
        });
    }
  }
  /***/

  /**
  * Cancel edit
  */
  public cancelEdit(): void {
    this.content = "";
    this.commentEdit = null;
  }
  /***/
}
