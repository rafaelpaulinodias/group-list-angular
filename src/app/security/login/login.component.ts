import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private route: Router,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {}

  onEnterUp(event) {
    const inputs = document.getElementsByTagName('input');
    const tabIndex = event.target.tabIndex;
    inputs[tabIndex + 1].focus();
  }

  onPasswordEnterUp() {
    this.login();
  }

  login() {
    this.auth.login(this.username, this.password).subscribe(
      () => this.route.navigate(['/home']),
      error => this.erroHandler.handler(error)
    );
  }

}
