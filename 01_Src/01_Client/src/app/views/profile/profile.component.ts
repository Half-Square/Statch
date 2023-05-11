/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-09 16:12:52                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-11 14:55:53                               *
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
import { environment } from 'src/environments/environment';
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
  public picturePath: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.api.request("GET", `users/${id}`).then((ret) => {
        if (!ret.id) throw "User not found";
        else {
          this.user = ret;
          this.picturePath = this.user ? this.user.picture : "";
        }
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

  /**
  * Upload user avatar
  * @param e - File input event
  */
  public uploadAvatar(e: Event): void {
    try {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files && files[0]) {
        let form = new FormData();
        form.append("file", files[0]);

        let requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('x-token', UserService.getUser().token || '');

        fetch(`${environment.API_URL}/files`, {
          method: "POST",
          headers: requestHeaders,
          body: form
        }).then(async (ret) => {
          let json = await ret.json();
          this.user = await this.api.request("PUT", `users/${this.user ? this.user.id : '0'}/avatar`, {
            id: this.user?.id,
            picture: json.path
          });

          this.picturePath = this.user ? this.user.picture : "";
        });
      } else {
        throw "File not found";
      }
    } catch (err) {
      console.error(err);
    }
  }
  /***/
}
