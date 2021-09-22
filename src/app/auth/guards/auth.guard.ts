import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/ban-upload']);
    }
    console.log('error')
    return !this.authService.isLoggedIn();
      //  console.log('error')
      //   return false; 
  }
}
