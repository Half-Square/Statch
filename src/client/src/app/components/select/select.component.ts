/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-09-15 13:05:58                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-09-29 18:01:09                              *
 ****************************************************************************/

import { Component, Input, TemplateRef, ContentChild, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from "@angular/core";

/**
 * Custom select component
 */
@Component({
  selector: "component-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"]
})
export class SelectComponent {

  /**
   * Constructor for the SelectComponent
   * @param renderer - Angular Renderer2 for DOM manipulation
   */
  constructor(private renderer: Renderer2) {
    // Listen for click events on the window to close the menu when clicking outside
    this.renderer.listen("window", "click", (e: Event) => {
      if(this.selector && this.selector.nativeElement &&
        !this.selector.nativeElement.contains(e.target))
        this.showMenu = false;
    });
  }

  /**
   * Input property to hold the search text
   */
  @Input()
    searchText: string = "";

  /**
   * Input property to hold data
   */
  @Input()
    data :any;

  /**
   * Input property to hold the selected options
   */
  @Input()
    selection: any[] = [];

  /**
   * Input property to set the placeholder text
   */
  @Input()
    placeholder: string = "Select...";

  /**
   * Input property to determine if it's a multi-select
   */
  @Input()
    multi: boolean = false;

  /**
   * Input property to determine if search functionality is enabled
   */
  @Input()
    hasSearch: boolean = true;

  @Input()
    noResult: boolean = false;

  @Input()
    noOption: string = "No option";

  /**
   * Output property to emit callback events
   */
  @Output()
    callback: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Property to track whether the menu is shown or hidden
   */
  public showMenu: boolean = false;

  /**
   * ViewChild decorator to get a reference to the 'selected' template
   */
  @ContentChild("selected", {static: false})
    selectedTemplateRef!: TemplateRef<any>;

  /**
   * ViewChild decorator to get a reference to the 'items' template
   */
  @ContentChild("items", {static: false})
    itemsTemplateRef!: TemplateRef<any>;

  /**
   * ViewChild decorator to get a reference to the 'selector' element
   */
  @ViewChild("selector")
    selector!: ElementRef;

  /**
   * ViewChild decorator to get a reference to the 'search' element
   */
  @ViewChild("search")
    search!: ElementRef;

  /**
   * Event handler for changes in the search text
   * @param text - Event value
   */
  public onSearchChange(text: any): void {
    this.searchText = text.value;
  }

  /**
   * Function to handle the selection of an option and reset the search input
   * @param option - Option value
   */
  public selectedOption(option: any): void {
    if(!option.fromSearch) {
      if(this.multi)
        this.callback.emit(this.onMultiSelect(option));
      else
        this.callback.emit(this.onSelect(option));
    } else {
      this.callback.emit(option);
    }
  }

  /**
   * Function to handle single option selection
   * @param option - Option value
   * @returns - Updated selection
   */
  private onSelect(option: any): any {
    let ret = this.selection ? this.selection : [];
    const index = ret.findIndex((item: any) => item.id === option.id);
    if (index !== -1) {
      ret.splice(index, 1);
    } else {
      ret = [option];
    }
    this.showMenu = false;
    return ret;
  }

  /**
   * Function to handle multi-option selection
   * @param option - Option value
   * @returns - Updated selection
   */
  private onMultiSelect(option: any): any {
    let ret = this.selection ? this.selection : [];
    if(!ret.some((item: any) => item.id === option.id)) {
      ret.push(option);
    } else {
      const index = ret.findIndex((item: any) => item.id === option.id);
      if (index !== -1) {
        ret.splice(index, 1);
      }
    }
    return ret;
  }

  /**
   * Function to check if a checkmark should be applied to an option
   * @param option - Option value
   * @returns - Boolean indicating whether a checkmark should be applied
   */
  public shouldApplyCheck(option: any): boolean {
    return this.selection && this.selection.some((obj: any) => obj.id === option.id);
  }

  /**
   * Function to toggle the visibility of the menu
   * @param e - Click event
   */
  public toggleMenu(e: Event): void {
    if(this.search && this.search.nativeElement === e.target) {
      this.showMenu = true;
    } else {
      this.showMenu = !this.showMenu;
    }

    if(this.search && this.search.nativeElement)
      this.showMenu ?
        this.search.nativeElement.focus() : this.search.nativeElement.blur();
  }
}
