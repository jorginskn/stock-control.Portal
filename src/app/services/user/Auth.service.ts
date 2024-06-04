import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/Auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/Auth/AuthResponse';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { enviroment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = enviroment.API_URL_AUTH;

  constructor(private httpClient: HttpClient, private cookie: CookieService) {}

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.httpClient.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }

  authUser(dataUserAuth: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.API_URL}/auth`,
      dataUserAuth
    );
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
