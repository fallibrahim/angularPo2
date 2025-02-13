import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Vérification de l'environnement

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      console.log('🚀 Vérification de l\'authentification...');
  
      if (this.authService.isAuthenticated()) {
        console.log('✅ Utilisateur déjà connecté, redirection vers /accueil-admin');
        this.router.navigate(['/accueil-admin']);
      } else {
        console.log('❌ Utilisateur non connecté, affichage de la page login');
      }
  
      // Empêche de revenir à la page précédente après la déconnexion (uniquement côté navigateur)
      history.pushState(null, '', location.href);
      window.onpopstate = () => {
        history.pushState(null, '', location.href);
      };
    }
  }
  

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log("Connexion réussie:", response);
          this.router.navigate(['/accueil-admin']); // Redirection après connexion
        },
        error: (err) => {
          console.error("Erreur d'authentification:", err);
          alert("Échec de la connexion. Vérifiez vos identifiants.");
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
