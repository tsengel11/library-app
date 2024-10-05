// auth.guard.ts (enhanced)
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRoles = route.data.expectedRoles;
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        }

        // Decode token to get user role
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decoded: any = jwt_decode(token);
            const userRole = decoded.role;

            if (expectedRoles && expectedRoles.indexOf(userRole) === -1) {
              this.snackBar.open('You do not have permission to access this page', 'Close', { duration: 3000 });
              this.router.navigate(['/']);
              return false;
            }

            return true;
          } catch (error) {
            this.snackBar.open('Invalid token', 'Close', { duration: 3000 });
            this.router.navigate(['/']);
            return false;
          }
        }

        this.router.navigate(['/']);
        return false;
      })
    );
  }
}