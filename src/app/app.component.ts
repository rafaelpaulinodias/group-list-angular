import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'g-list';

  constructor(private router: Router) {}

  showBackLink() {
    return this.router.url !== '/home';
  }

  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
