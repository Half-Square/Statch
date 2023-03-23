/*****************************************************************************
 * @Author                : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-22 16:59:34                              *
 * @LastEditors           : AdrienLanco0<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-22 16:59:34                              *
 ****************************************************************************/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public static IS_PROD: boolean = false;

  private static readonly development: any = {
      API_URL: 'http://localhost:5000',
      VERSION: 'dev',
      DEV_EMAIL: 'contact@halfsquare.fr'
  };

  private static readonly production: any = {
      API_URL: 'inconstance',
      VERSION: '1.0',
      DEV_EMAIL: 'contact@halfsquare.fr'
  };

  /*
  * Name: get
  * Description: Get environment variable value
  *
  * Args:
  * - key (String): Environment variable to get
  *
  * Return (Any): Environment variable value
  */
  /**
  * @name get
  * @descr Get environment variable value
  *
  * @param key (string): Environment variable to get
  *
  * @return (any): Environment variable value
  */
  public static get(key: string): any {
      let ret =  this.IS_PROD ? this.production[key] : this.development[key];
      return ret;
  }
  /***/
}

