import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../model/user-info';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo: UserInfo;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  showBackLink() {
    return this.router.url !== '/home';
  }

  onExitClick() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe((userInfo) => this.userInfo = userInfo);
  }

  

}
