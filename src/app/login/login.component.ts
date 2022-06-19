import { Component } from '@angular/core';
import {IconService} from "../services/icon.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  public error:string|null = null;
  private readonly returnUrl: string;
  public hide:boolean = true;

  constructor( private route: ActivatedRoute, private authService: AuthService,private iconService:IconService) {
    this.returnUrl = '/dashboard';
    this.error = this.route.snapshot.queryParams.error;
  }

  login() {
    this.authService.login(this.returnUrl);
  }

}
