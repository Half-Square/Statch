/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-09 16:12:52                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-11 10:55:50                               *
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
  private id: string | null = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.request("GET", `users/${this.id}`).then((ret) => {
      if (!ret.id) throw "User not found";
      else this.user = ret;
    }).catch((err) => {
      console.error(err);
      this.router.navigate(["/"]);
    });
  }

  /**
  * Check if target is the connected user
  */
  public isSelf(): boolean {
    return this.user ? this.user.id === this.id : false;
  }
  /***/

  /**
  * Save user
  */
  public async saveUser(): Promise<void> {
    if (this.user) {
      await this.api.request("PUT", `users/${this.user.id}`, this.user).catch((err) => {
        console.error(err);
      });
    }
  }
  /***/
}
