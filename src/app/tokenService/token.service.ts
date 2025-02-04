import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isLoggedIn = false;
  constructor(private router : Router) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate(['/accueil-admin']);
  }
  isLogged(): boolean {
    const  token = localStorage.getItem('token');
    return !! token;
  }
  getToken(): string | null {  
    return localStorage.getItem('token');
  }
  clearTokenExpired() : void {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  clearToken() : void {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
