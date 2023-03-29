/*****************************************************************************
 * @Author                : 0K00<qdouvillez@gmail.com>                       *
 * @CreatedDate           : 2023-03-20 18:16:48                              *
 * @LastEditors           : 0K00<qdouvillez@gmail.com>                       *
 * @LastEditDate          : 2023-03-29 15:38:08                              *
 ****************************************************************************/

import { Component, HostListener, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('nested', [
      transition(':enter', [
        animate('100ms 100ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms 100ms ease-in-out', style({ opacity: 0, transform: "translateY(-16px)" }))
      ])
    ])
  ]
})
export class HeaderComponent {

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.ref.nativeElement.contains(event.target)) this.showOption = false;
  }

  constructor(private router: Router, private ref: ElementRef) {}
  public showModal: boolean = false;
  public showOption: boolean = false;

  /**
  * @name disconnect
  * @descr call UserService disconnect
  *
  */
  public disconnect(): void  {
    UserService.disconnect(this.router)
  }
  /***/
}
