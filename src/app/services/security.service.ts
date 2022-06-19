import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Config} from "./config";
import {UserProfileService} from "./user-profile.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private authorizeEndpoint = '/oauth2/authorization/github'
  private tokenEndpoint = '/login/oauth2/code/github';
  private tokenKey = 'token';

  constructor(private http: HttpClient, public config:Config, public userProfileService:UserProfileService, private router: Router) {
  }
  //window.open(this.config.api + this.authorizeEndpoint, '_self');
  login() {
    this.updateToken("test");
    this.router.navigate(['/dashboard']);
  }

  setRedirectUrl(redirectUrl:string){
    localStorage.setItem("redirectUrl", redirectUrl);
  }

  getRedirectUrl(){
    return localStorage.getItem("redirectUrl") ?  localStorage.getItem("redirectUrl") : '/apps' ;
  }

  updateToken(token:string) {
    localStorage.setItem(this.tokenKey, token);
  }

  fetchUser(): Observable<any> {
    return this.userProfileService.getUserInfo();
  }

  fetchToken(code:string, state:string): Observable<any> {
    return this.http.get(this.config.api + this.tokenEndpoint + '?code=' + code + '&state=' + state);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  logout(): Observable<any> {
    return this.config.api ? this.http.post(this.config.api + '/logout', this.getToken()) : new BehaviorSubject({}).asObservable();
  }
}
