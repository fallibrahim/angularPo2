import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Annee, Annonce, CampagneService } from '../campagne.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-publier-annonce',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SideBarComponent],
  templateUrl: './publier-annonce.component.html',
  styleUrl: './publier-annonce.component.css'
})
export class PublierAnnonceComponent implements OnInit {
  annonceForm: FormGroup;
  anneesAcademiques: Annee[] = []; // Liste des années

  constructor(
    private fb: FormBuilder, 
    private campagneService: CampagneService,
    private authService: AuthService
  ) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      status: ['ouvert', Validators.required], // Valeur par défaut
      dateLimite: ['', Validators.required],
      academiqueId: ['', Validators.required] // Ajout du champ pour l'année académique
    });
  }

  ngOnInit() {
    // Charger les années académiques depuis le backend
    this.campagneService.getAllAnnee().subscribe({
      next: (data) => {
        this.anneesAcademiques = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des années académiques :", err);
      }
    });
  }

  ajouterAnnonce(): void {
    if (this.annonceForm.valid) {
      const nouvelleAnnonce: Annonce = this.annonceForm.value;

      console.log("🔹 Données envoyées :", nouvelleAnnonce);

      this.campagneService.saveAnnonce(nouvelleAnnonce).subscribe({
        next: () => console.log('✅ Annonce publiée avec succès !'),
        error: err => console.error('❌ Erreur lors de l’ajout:', err)
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
