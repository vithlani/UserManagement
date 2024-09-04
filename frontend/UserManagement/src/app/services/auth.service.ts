import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false; // Example property to track login status

  // Simulate login
  login() {
    this.loggedIn = true;
  }

  // Simulate logout
  logout() {
    this.loggedIn = false;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.loggedIn; // Return the login status
  }

  setUserToken(token: string) {
    if (token != null) {
      localStorage.setItem('authToken', token);
      this.loggedIn = true;
    }
  }

  getUserToken(): string | null {
    return localStorage.getItem('authToken');
  }

  removeUserToken(key: string) {
    localStorage.removeItem(key);
    this.loggedIn = false;
  }
}
