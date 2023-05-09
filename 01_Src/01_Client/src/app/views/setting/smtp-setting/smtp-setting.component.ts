/******************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @CreatedDate           : 2023-05-04 16:01:18                               *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>         *
 * @LastEditDate          : 2023-05-04 18:02:58                               *
 *****************************************************************************/

/* SUMMARY
  * Imports
  * Save configuration
  * Test configuration
*/

/* Imports */
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
/***/

interface IConfig {
  host: string,
  port: number,
  user: string,
  password: string
};

@Component({
  selector: 'app-smtp-setting',
  templateUrl: './smtp-setting.component.html',
  styleUrls: ['./smtp-setting.component.scss']
})
export class SmtpSettingComponent implements OnInit {
  public config: IConfig | null = null;
  public disableTest: boolean = false;

  constructor(private api: ApiService) {
  }

  public ngOnInit(): void {
    this.api.request("GET", "smtp/config").then((ret) => {
      this.config = ret;
    }).catch((err) => {
      console.error(err);
    });
  }

  /**
  * Save configuration
  */
  public saveConfig(): void {
    let data = {
      ...this.config,
      port: Number(this.config?.port)
    };

    console.log(data);

    this.api.request("PUT", "smtp/config", data).then((ret) => {
      this.config = ret;
    }).catch((err) => {
      console.error(err);
    });
  }
  /***/

  /**
  * Test configuration
  */
  public testConfig(): void {
    if (!this.disableTest) {
      this.disableTest = true;

      this.api.request("GET", "smtp/test").then((ret) => {
        console.log(ret);
      }).catch((err) => {
        console.error(err);
      }).then(() => {
        this.disableTest = false;
      });
    }
  }
  /***/
}
