/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-03-17 12:11:36                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-05-11 14:54:43                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
*/

/* Imports */
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
/***/

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() userId: string = "";

  @Input() imgPath: string = "";
  @Input() alt: string = "";
  @Input() userName: string = "";

  @Input() classes: string = "";

  public env = environment;

  ngOnInit() {
    this.userName = this.userName.charAt(0);
  }
}
