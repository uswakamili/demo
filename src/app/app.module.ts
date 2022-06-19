import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SearchInputComponent} from "./search-input/search-input.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CallbackComponent} from "./callback/callback.component";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material-module";
import {FlexLayoutModule} from "@angular/flex-layout";

import {ServiceModule} from "./services/service.module";
import {environment} from "../environments/environment";
import {Config} from "./services/config";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServiceWorkerModule} from "@angular/service-worker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {MatCarouselModule} from "./carousel/carousel.module";
import {OAuthModule} from "angular-oauth2-oidc";


@NgModule({
  declarations: [
    SearchInputComponent,
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CallbackComponent,
    HomeComponent,

  ],
  imports: [
    HttpClientModule,
    ServiceModule,
    CommonModule ,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCarouselModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:9094/rest/'],
        sendAccessToken: true
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {provide: Config, useValue: ServiceModule.forRoot(environment)}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
