/******************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @CreatedDate           : 2023-03-17 16:07:54                               *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>              *
 * @LastEditDate          : 2023-03-17 16:22:55                               *
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserService } from './services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        animate('all 0.3s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('all 0.3s ease-in', style({ opacity: 0, marginLeft: '-248px' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'statch';

  constructor(private router: Router) {}

  public show: boolean = true
  public  is_connected: boolean =  true

  ngOnInit() {
    UserService.init()
    this.isConnected()
    if (!UserService.isConnected())
      this.router.navigate(["/login"])
  }


  public showMenu() {
    this.show = !this.show;
  }

  public isConnected(): boolean {
    return UserService.isConnected();
  }
}
