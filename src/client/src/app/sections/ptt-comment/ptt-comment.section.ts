/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-27 15:26:28                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-02 15:23:33                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Service
*/

/* Imports */
import { Component, ElementRef, Input, ViewChild } from "@angular/core";
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

  @ViewChild("contentEl", {static: false})
    contentEl!: ElementRef;

  constructor(private api: RequestService,
              private user: UserService) {
  }

  /**
  * Publish comment
  */
  public publish(): void {
    this.api.post(`api/${this.type}/${this.item.id}/comments`, {
      content: this.content()
    }, this.user.getUser()?.token)
      .then(() => {
        this.contentEl.nativeElement.value = "";
      });
  }
  /***/

  /**
  * Get content in dom
  * @return - Content string
  */
  public content(): string {
    return this.contentEl.nativeElement.value.replace(/\n/g, "<br/>");
  }
  /***/
}
