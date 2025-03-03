import { Injectable, Inject, PLATFORM_ID, signal, inject } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiConfig } from './admin/ApiConfigs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url: string = ApiConfig.domaine + ApiConfig.USERSERVICE;
  private http = inject(HttpClient);
  user = signal<Token | null | undefined>(undefined);
  constructor(private router: Router, 

    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  login(data: { email: string; password: string }): Observable<Token> {
    return this.http.post<Token>(`${this.url}/signIn`, data).pipe(
      tap((token) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('access_token', token.access_token);
          console.log("🔑 Connexion réussie, token:", token);
        }
      })
    );
  }
  //
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      console.log("🔍 Vérification du token:", token);
      return !!token;
    }
    return false; // Si exécuté côté serveur, retourne false
  }
  //
  signUp(user: User): Observable<string> {
    return this.http.post<string>(`${this.url}/signUp`, user);
  }

  //
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/${id}`);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      console.log("🚪 Déconnexion : token supprimé");
    }
    this.router.navigate(['/login']);
  }

  register(data: {
    nom: string;
    prenom: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    adresse: string;
    dateNaissance: string;
  }) {
    console.log("Données réçues du formulaire d'inscription", data);
  }
}
export interface User {
  id?: string;
  name: string;
  lastName: string;
  age?: number;
  // profileImage: 'string';
  mail: string;
  password: string;
  gender: sexe;
  role: role;
}
export interface Token {
  access_token: string;
  refresh_token: string;
}
export enum sexe {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum role {
  ADMIN = 'ADMIN',
  CANDIDAT = 'CANDIDAT',
}
