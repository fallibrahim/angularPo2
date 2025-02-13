import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4001/USERSERVICE/signIn';
     constructor(private http : HttpClient,
     private router: Router,
     @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    login(data: { email: string; password: string }): Observable<any> {
      return this.http.post<any>(this.apiUrl, data).pipe(
        tap(response => {
          if (response.token && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            console.log('🔐 Token enregistré:', localStorage.getItem('token')); // Vérification
          }
        })
      );
    }
    

    logout(): void {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('token'); 
        console.log("🔴 Déconnexion : Token supprimé ->", localStorage.getItem('token'));
      }
      this.router.navigate(['/login']).then(() => {
        console.log("✅ Redirection vers /login réussie");
      }).catch(err => {
        console.error("❌ Erreur de redirection :", err);
      });
    }
    

    isAuthenticated(): boolean {
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');
        console.log('🔎 Vérification du token:', token);
        return token !== null;
      }
      return false;
    }
    
  register(data : {nom:string, prenom:string, phone:string, email:string, password:string, confirmPassword:string, adresse:string, dateNaissance:string}) {
    console.log("Données réçues du formulaire d'inscription", data);
  }
}
