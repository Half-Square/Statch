/******************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                        *
 * @CreatedDate           : 2023-03-20 15:53:52                               *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                        *
 * @LastEditDate          : 2023-03-20 16:51:46                               *
 *                                                                            *
 *****************************************************************************/

import { Directive, AfterContentChecked , ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusOnShow]'
})
export class FocusOnShowDirective implements AfterContentChecked  {
  constructor(private host: ElementRef) {
  }

  ngAfterContentChecked () {
    const input: HTMLInputElement = this.host.nativeElement as HTMLInputElement;
    input.focus();
  }
}
