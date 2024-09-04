import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './services/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  // The guard function
  static canActivate: CanActivateFn = (route, state) => {
    const authService = inject(AuthService); // Inject AuthService
    const router = inject(Router); // Inject Router

    const isAuthenticated = authService.isAuthenticated(); // Check authentication status

    if (!isAuthenticated) {
      router.navigate(['/login']); // Redirect to login if not authenticated
      return false; // Deny access
    }
    return true; // Allow access
  };
}
