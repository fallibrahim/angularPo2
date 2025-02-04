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
    if (data.email === 'admin@example.com' && data.password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true'); // Stocker l'état de connexion
      this.router.navigate(['/accueil-admin']); // Rediriger vers accueil-admin
      return true;
    } else {
      alert("Email ou mot de passe incorrect !");
      return false;
    }
  }

  register(data : {nom:string, prenom:string, phone:string, email:string, password:string, confirmPassword:string, adresse:string, dateNaissance:string}) {
    console.log("Données réçues du formulaire d'inscription", data);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Supprimer l'état de connexion
    this.router.navigate(['/login']); // Redirection vers la page de connexion
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true'; // Vérifier si l'utilisateur est connecté
  }
}
