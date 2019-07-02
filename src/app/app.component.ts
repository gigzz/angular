/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbAuthService, NbAuthJWTToken, NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth';
import { of as observableOf,  Observable } from 'rxjs';
import { userInfo } from 'os';

@Component({
  selector: 'ngx-app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit{

  constructor(private analytics: AnalyticsService, private local:NbTokenStorage) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
  ngOnDestroy(): void {
    this.local.clear()
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
     }
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
}
