// staff.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getUserRole() === 'staff' || this.authService.getUserRole() === 'admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}