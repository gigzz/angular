/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { of as observableOf } from 'rxjs/observable/of';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbPasswordAuthStrategy, NbAuthModule, NbTokenLocalStorage, NbTokenStorage } from '@nebular/auth';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { RoleProvider } from './role.provider';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
@NgModule({
  declarations: [AppComponent, LoginComponent,RegisterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    // 安全验证
    // NbSecurityModule.forRoot(
    //   {
    //      accessControl: {
    //    guest: {
    //      view: ['news', 'comments'],
    //    },
    //    user: {
    //      parent: 'guest',
    //      create: 'comments',
    //    },
    //    moderator: {
    //      parent: 'user',
    //      create: 'news',
    //      remove: '*',
    //    },
    //  },
    //   }
    // ),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    // NbAuthModule.forRoot(
    //   {
    //   // 配置login请求
    //      strategies: [
    //        NbPasswordAuthStrategy.setup({
    //          name: 'email',
    //          baseEndpoint: '',
    //           login: {
    //             requireValidToken:true,
    //             endpoint: '/echart/test',
    //           },
    //           register: {
    //             requireValidToken:true,
    //             endpoint: '/echart/test',
    //           },
    //            logout: {
    //             endpoint: '/echart/test',
    //           },
    //        }),
    //      ],
    //      forms: {
    //         register: {
    //   redirectDelay: 1500,
    //   strategy: 'email',
    //   showMessages: {
    //     success: true,                                                                                                                                                                                                                                                      
    //     error: true,
    //   },
    // },      
    //      },
    //    }
    //    )
  ],
  bootstrap: [AppComponent],
  providers: [
    // {
    //   provide: NbRoleProvider,
    //   useValue: {
    //     getRole: () => {
    //       // 给用户客人的权限
    //       return observableOf('guest');
    //     },
    //   },
    // },
    // { provide: NbRoleProvider, useClass: RoleProvider },
      //  验证模块
    AuthGuard,
    // { provide: NbTokenStorage, useClass: NbTokenLocalStorage},
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
