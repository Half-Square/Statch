/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-09-27 14:08:53                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-10-02 19:27:21                              *
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
  HostListener,
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
  @Output() itemChange = new EventEmitter<IProjects | ITasks | ITickets>();

  @ViewChild("nameEl", { static: false })
    nameEl!: ElementRef;

  @ViewChild("descriptionEl", { static: false })
    descriptionEl!: ElementRef;

  public editName: boolean = false;
  public editDescription: boolean = false;
  public contentEl: {name: string, description: string};

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
          this.nameEl.nativeElement && this.descriptionEl.nativeElement &&
          !this.nameEl.nativeElement.contains(e.target) &&
          !this.descriptionEl.nativeElement.contains(e.target)) {
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
      this.descriptionEl.nativeElement.focus();
    }
  }
  /***/

  /**
  * Get content in HTML
  * @return - Item name and description
  */
  public content(): {name: string, description: string} {
    this.contentEl = {
      name: this.nameEl.nativeElement.innerHTML,
      description: this.descriptionEl.nativeElement.innerHTML
    };

    return this.contentEl;
  }
  /***/
}
