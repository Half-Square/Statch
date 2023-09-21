/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-09-14 15:40:35                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-09-14 17:14:13                               *
 *****************************************************************************/

import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Paginator component.
 */
@Component({
  selector: "component-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"]
})
export class PaginatorComponent {
  /**
   * Number of current page.
   */
  @Input()
    currentPage: number = 0;

  /**
   * Total page for the paginator.
   */
  @Input()
    totalPages: number = 0;

  /**
   * Event emitter triggered when the page is changed.
   * It emits the updated current page value.
   */
  @Output()
    pageChange = new EventEmitter<number>();

  /**
   * Create an array of number for each pages.
   * @returns Number - Total pages
   */
  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  /**
   * This function calculates an array of visible page numbers around the current page.
   * @returns An array containing page numbers or ellipsis (represented as strings).
   */
  public visiblePages(): (number | string)[] {
    const visibleCount = 2; // Number of pages visible around the current page
    const ellipsis = "...";
    let start: number;
    let end: number;

    // Special case for the first three pages
    if (this.currentPage <= visibleCount + 2) {
      start = 1;
      end = Math.min(visibleCount * 2 + 1, this.totalPages);
    } else if (this.currentPage >= this.totalPages - visibleCount - 1) {
      // Special case for the last three pages
      start = Math.max(this.totalPages - visibleCount * 2, 1);
      end = this.totalPages;
    } else {
      // General case with reduction in the middle
      start = this.currentPage - visibleCount;
      end = this.currentPage + visibleCount;
    }

    const pages: (number | string)[] = [];

    // Add ellipsis and first page if applicable
    if (start > 1) {
      pages.push(1, ellipsis);
    }

    // Add page numbers to the array
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if applicable
    if (end < this.totalPages) {
      pages.push(ellipsis, this.totalPages);
    }

    // Return the array of visible pages
    return pages;
  }

  /**
   * Function that manages the page change and the next and previous.
   * @param page
   */
  public changePage(page: number | string): void {
    if (page === "prev") {
      // Manage previous.
      if (this.currentPage > 1) {
        this.currentPage--;
        this.pageChange.emit(this.currentPage);
      }
    } else if (page === "next") {
      // Manage next.
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.pageChange.emit(this.currentPage);
      }
    } else if (typeof page === "number") {
      // Manage page change.
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }
}
