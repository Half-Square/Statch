/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-09 16:12:52                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-11 11:52:00                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Services
  * Interfaces
  * Check if target is the connected user
*/

/* Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/***/

/* Services */
import { UserService } from "src/app/services/user/user.service";
import { ApiService } from 'src/app/services/api/api.service';
/***/

/* Interfaces */
import { UserInterface } from 'src/app/services/user/user.service';
/***/

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: UserInterface | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.api.request("GET", `users/${id}`).then((ret) => {
        if (!ret.id) throw "User not found";
        else this.user = ret;
      }).catch((err) => {
        console.error(err);
        this.router.navigate(["/"]);
      });
    });
  }

  /**
  * Check if target is the connected user
  */
  public isSelf(): boolean {
    return this.user ? UserService.getUser().id === this.user.id : false;
  }
  /***/

  /**
  * Save user
  */
  public async saveUser(): Promise<void> {
    if (this.user) {
      await this.api.request("PUT", `users/${this.user.id}`, this.user).then((ret) => {
        UserService.setUser(ret);
      }).catch((err) => {
        console.error(err);
      });
    }
  }
  /***/
}
