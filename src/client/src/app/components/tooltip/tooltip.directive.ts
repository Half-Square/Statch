/*****************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                   *
 * @CreatedDate           : 2023-11-15 14:37:55                              *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                   *
 * @LastEditDate          : 2023-11-16 16:51:34                              *
 ****************************************************************************/

import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Injector, Input, OnDestroy } from "@angular/core";

import { TooltipComponent } from "./tooltip.component";

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
      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      this.elementRef.nativeElement.appendChild(domElem);
      this.componentRef.instance.tooltip = this.tooltip;

      const {left, right, top} =
      this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = top - 26 - 5 - 4;
    }
  }

  private setTooltipComponentProperties(): void {
    if (this.componentRef !== null) {

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
