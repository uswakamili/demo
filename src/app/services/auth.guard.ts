import {EventEmitter, Injectable, Output} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AuthService} from "./auth.service";
import {filter, switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Output() activateUserEvent = new EventEmitter<any>();

  private activateUser = new Subject();

  listenForActivateUser() {
    return this.activateUser.asObservable();
  }

  constructor( private router: Router,private authService:AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    if (!this.authService.hasValidToken()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }

    this.activateUser.next(this.authService.identityClaims);
    return true;
  }

}
