import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserService } from '../../../@core/mock/users.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu = [{ title: 'Profile', }, { title: 'Log out', link: './auth/logout',}];
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService) {
  }
  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => {this.user =users
      });
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
  goToHome() {
    this.menuService.navigateHome();
  }
  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
