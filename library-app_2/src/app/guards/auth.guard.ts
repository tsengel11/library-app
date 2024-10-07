// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
//import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    //private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRoles: string[] = route.data['expectedRoles'];
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
            const decoded: any = jwtDecode(token);
            const userRole = decoded.role;

            if (expectedRoles && !expectedRoles.includes(userRole)) {
              // this.snackBar.open(
              //   'You do not have permission to access this page',
              //   'Close',
              //   { duration: 3000 }
              // );
              this.router.navigate(['/']);
              return false;
            }

            return true;
          } catch (error) {
            //this.snackBar.open('Invalid token', 'Close', { duration: 3000 });
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