import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  login(data: { email: string, password: string }): boolean {
    console.log("Données reçues du formulaire de login", data);

    // Simuler une vérification d'identifiants
    if (data.email === 'admin@gmail.com' && data.password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true'); // Stocker l'état de connexion
      this.router.navigate(['/accueil-admin']); // Rediriger vers accueil-admin
      return true;
    } else {
      alert("Email ou mot de passe incorrect !");
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Supprimer l'état de connexion
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  register(data : {nom:string, prenom:string, phone:string, email:string, password:string, confirmPassword:string, adresse:string, dateNaissance:string}) {
    console.log("Données réçues du formulaire d'inscription", data);
  }
}
