import { AuthService } from './../services/user/Auth.service';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate():
    | Observable<boolean>
    | UrlTree
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
    {
        if (!this.authService.isLoggedIn())
          {
            this.router.navigate(['home']);
            return this.authService.isLoggedIn();
          }
        return this.authService.isLoggedIn();
    }
}
