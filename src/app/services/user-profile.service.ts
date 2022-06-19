import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "./config";
import {BehaviorSubject, Observable} from "rxjs";


export interface UserProfile {
  login: string;
  email:string | null;
  avatar_url:string | null;
}

@Injectable()
export class UserProfileService {
  constructor(public http: HttpClient, public config: Config) {

  }
  //this.http.get<UserProfile>(this.config.api + "/rest/user")
  getUserInfo():Observable<UserProfile>{
    return this.testUser();
  }

  testUser():Observable<UserProfile>{
    let user:UserProfile = {
      login:"alex",
      email:"alex@somwhere.com",
      avatar_url:"/assets/svg/icons/profile.svg"
    }
    return new BehaviorSubject(user).asObservable();
  }

}
