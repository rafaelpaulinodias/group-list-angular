import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../model/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = `${environment.apiUrl}/auth`

  userInfo: UserInfo = new UserInfo();

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {

    const token = this.basicAuthToken(username, password);

    return this.http.get<UserInfo>(this.loginUrl, {headers:{Authorization: token}}).pipe(
      map((userInfo)=>{
        this.userInfo.parse(userInfo);
        this.storeToken(token);
      })
    );

  }

  getUserInfo() {  
    return this.http.get<UserInfo>(this.loginUrl, {headers:{Authorization: this.getToken()}}).pipe(take(1));
  }

  logout() {
    this.userInfo = new UserInfo();
    this.clearToken();
  }

  isUserLogged(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  basicAuthToken(username: String, password: String): string {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }
}
