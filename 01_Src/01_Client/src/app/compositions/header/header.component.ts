/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-20 18:16:48                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-20 18:26:54                              *
 ****************************************************************************/

import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}
  public showModal: boolean = false;

  public disconnect(): void  {
    UserService.disconnect(this.router)
  }
}
