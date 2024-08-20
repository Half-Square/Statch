/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-09-27 14:08:53                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-13 09:39:44                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Interfaces
  * Trigger item change on focus end
  * Save item on press enter
  * Toggle edit mode
  * Get content in HTML
*/

/* Imports */
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild
} from "@angular/core";
/***/

/* Interfaces */
import { IProjects, ITasks, ITickets } from "src/app/interfaces";
/***/

@Component({
  selector: "section-ptt-header",
  templateUrl: "./ptt-header.section.html",
  styleUrls: ["./ptt-header.section.scss"]
})
export class PttHeaderSection {
  @Input() item: IProjects | ITasks | ITickets;
  @Input() type: string;
  @Output() itemChange = new EventEmitter<IProjects | ITasks | ITickets>();
  public hasPublish: boolean = false;

  @ViewChild("nameEl", { static: false })
    nameEl!: ElementRef;

  @ViewChild("descriptionEl", { static: false })
    descriptionEl!: any;

  public editName: boolean = false;
  public editDescription: boolean = false;
  public contentEl: {name: string, description: string};
  public contentDesc: string;

  constructor(private renderer: Renderer2) {
    this.onFocusEnd();
  }

  /**
  * Trigger item change on focus end
  */
  private onFocusEnd(): void {
    this.renderer.listen("window", "click", (e: Event) => {
      if( (this.editName || this.editDescription) &&
          this.nameEl && this.descriptionEl &&
          this.nameEl.nativeElement && this.descriptionEl.editor.bounds &&
          !this.nameEl.nativeElement.contains(e.target) &&
          !this.descriptionEl.editor.bounds.contains(e.target)) {
        this.editName = false;
        this.editDescription = false;
        this.item.name = this.content().name;
        this.item.description = this.content().description;
        this.itemChange.emit(this.item);
      }
    });
  }
  /***/

  /**
  * Save item on press enter
  */
  public saveEnter(event: KeyboardEvent, origin: string): void {
    if (event.key === "Enter" &&
      (origin === "name" ||
        (origin === "description" && !event.shiftKey))) {
      this.editDescription = false;
      this.editName = false;
      this.item.description = this.content().description;
      this.item.name = this.content().name;
      this.itemChange.emit(this.item);

    }
  }
  /***/

  /**
  * Toggle edit mode
  * @param where - Field to toggle edit mode
  */
  public toggleEdit(where: string): void {
    if(where === "name") {
      this.editName = true;
      this.nameEl.nativeElement.focus();
    } else {
      this.editDescription = true;
    }
  }
  /***/

  /**
  * Get content in HTML
  * @return - Item name and description
  */
  public content(): {name: string, description: string} {
    let title = this.nameEl.nativeElement.innerHTML;
    let description = this.contentDesc || this.item.description;

    let regTitle = (/<br>$/g).exec(title);
    if (regTitle) title = title.substring(0, regTitle?.index);

    let regDes = (/<br>$/g).exec(description);
    if (regDes) title = title.substring(0, regDes?.index);

    this.contentEl = {
      name: title,
      description: description
    };

    return this.contentEl;
  }
  /***/


  /**
 * Get content of markdown
 * @param event - Content of markdown
 */
  public getContent(event: string): void {
    this.contentDesc = event;
  }
  /***/
}
