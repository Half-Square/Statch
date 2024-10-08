/*****************************************************************************
 * @Author                : Jbristhuille<jbristhuille@gmail.com>             *
 * @CreatedDate           : 2023-11-15 14:37:55                              *
 * @LastEditors           : Jbristhuille<jbristhuille@gmail.com>             *
 * @LastEditDate          : 2024-08-26 16:33:31                              *
 ****************************************************************************/

import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy
} from "@angular/core";

import { TooltipComponent } from "./tooltip.component";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Directive({
  selector: "[tooltip]"
})
export class TooltipDirective implements OnDestroy {

  @Input() tooltip: string | null = "";
  private interval!: ReturnType<typeof setTimeout>;

  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }


  @HostListener("mouseenter")
  onMouseEnter(): void {
    if (this.componentRef === null) {
      const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem =
            (this.componentRef.hostView as EmbeddedViewRef<any>)
              .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties(): void {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      const {left, right, top} =
            this.elementRef.nativeElement.getBoundingClientRect();

      const tooltipRect = this.elementRef.nativeElement.getBoundingClientRect();
      const tooltipWidth = this.componentRef.instance.width;
      const windowWidth = window.innerWidth;

      if(tooltipRect.x + tooltipWidth - 32 > windowWidth) {
        this.componentRef.instance.right = -(windowWidth - tooltipRect.x - 16);
        this.componentRef.instance.left = "auto";
        this.componentRef.instance.triangle = (right - left) * 2 + (tooltipRect.width / 2) + "px";
      } else {
        this.componentRef.instance.left = (right - left) / 2 + left;
      }


      this.componentRef.instance.top =
        top - this.elementRef.nativeElement.offsetHeight - 16;
    }
  }

  @HostListener("mouseleave")
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
