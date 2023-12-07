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
import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
/***/

/* Interfaces */
import { IComments, IProjects, ITasks, ITickets } from "src/app/interfaces";
import { RecoveryService } from "src/app/services/recovery.service";
/***/

/* Services */
import { RequestService } from "src/app/services/request.service";
import { ToastService } from "src/app/services/toast.service";
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
  public content: string;
  public hasPublish: boolean = false;

  constructor(private api: RequestService,
              private sanitizer: DomSanitizer,
              private recovery: RecoveryService,
              private toast: ToastService,
              private user: UserService) {
  }

  /**
   * Trusted Content Sanitizer
   * @param content - Html element stringify
   * @returns - SafeHtml element
   */
  public trustedContent(content: string): SafeHtml {
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
          this.hasPublish = true;
        })
        .catch(() => this.hasPublish = false);
    }
    this.hasPublish = false;
  }
  /***/

  public onDelete(id: string): void {
    this.api.delete(`api/${this.type}/${this.item.id}/comments/${id}`,
      this.user.getUser()?.token)
      .then(() => {
        this.recovery.updateData(this.item, this.type);
        this.toast.print("Comment has been removed", "success");
      });
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
    return this.content === null || this.content.replace(/^<p>/, "").replace(/<\/p>$/, "").trim() === "";
  }
  /***/
}
