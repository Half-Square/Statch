/******************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>              *
 * @CreatedDate           : 2024-09-05 11:43:22                               *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>              *
 * @LastEditDate          : 2024-09-05 12:00:09                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { AfterViewInit, Directive, ElementRef } from "@angular/core";
/***/

@Directive({
  selector: "[directiveElOnTop]"
})
export class ElOnTopDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    // Get informations and remove original
    let pos = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.remove();

    // Inject element in body
    let body = document.querySelector("body");
    body?.append(this.el.nativeElement);

    // Apply position and width
    this.el.nativeElement.style.width = pos.width+"px";
    this.el.nativeElement.style.left = pos.left+"px";
    this.el.nativeElement.style.top = pos.top+30+"px";
  }
}
