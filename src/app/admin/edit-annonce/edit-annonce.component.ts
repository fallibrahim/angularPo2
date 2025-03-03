import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Annee, Annonce, CampagneService } from '../campagne.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-edit-annonce',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SideBarComponent],
  templateUrl: './edit-annonce.component.html',
  styleUrl: './edit-annonce.component.css'
})
export class EditAnnonceComponent implements OnInit {
  annonceForm: FormGroup;
  annonceId: string | null = null;
  anneesAcademiques: Annee[] = [];

  constructor(
    private fb: FormBuilder,
    private campagneService: CampagneService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      status: ['ouvert', Validators.required], // Correction : pas de valeur par défaut
      dateLimite: ['', Validators.required],
      academiqueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Récupération de l'ID de l'annonce
    this.annonceId = this.route.snapshot.paramMap.get('id');
    console.log("📌 ID de l'annonce récupérée :", this.annonceId);

    // Charger la liste des années académiques
    this.campagneService.getAllAnnee().subscribe({
      next: (data) => {
        this.anneesAcademiques = data;
      },
      error: (err) => console.error("❌ Erreur lors du chargement des années académiques :", err)
    });

    // Vérifier si un ID est présent dans l'URL
    if (this.annonceId) {
      this.campagneService.getAnnonceById(this.annonceId).subscribe({
        next: (annonce: Annonce) => {
          console.log("📋 Annonce récupérée :", annonce);

          // Vérifier si l'annonce existe avant d'appliquer `patchValue`
          if (annonce) {
            this.annonceForm.patchValue({
              titre: annonce.titre,
              description: annonce.description,
              status: annonce.status,
              dateLimite: annonce.dateLimite,
              academiqueId: annonce.academiqueId
            });
            console.log("📄 Formulaire après patchValue :", this.annonceForm.value);
          } else {
            console.warn("⚠️ Aucune annonce trouvée avec cet ID !");
          }
        },
        error: (err) => console.error("❌ Erreur lors de la récupération de l'annonce :", err)
      });
    } else {
      console.warn("⚠️ Aucun ID trouvé dans l'URL !");
    }
  }
  
  updateAnnonce(): void {
    console.log("🔍 Fonction updateAnnonce() appelée !");
  
    if (this.annonceId) {
      const annonceModifiee: Annonce = {
        id: this.annonceId,
        ...this.annonceForm.value
      };
  
      // Vérification du statut avant l'envoi
      if (!annonceModifiee.status) {
        console.warn("⚠️ Le champ 'status' est vide ! Assignation automatique...");
        annonceModifiee.status = 'ouvert'; // Assigner une valeur par défaut
      }
  
      console.log("📝 Données envoyées à l'API :", annonceModifiee);
  
      this.campagneService.updateAnnonce(annonceModifiee).subscribe({
        next: () => {
          console.log('✅ Annonce mise à jour avec succès !');
          this.router.navigate(['/annonces']);
          this.annonceForm.reset();
        },
        error: (err) => console.error('❌ Erreur lors de la mise à jour:', err)
      });
    } else {
      console.error("❌ Impossible de mettre à jour : Aucun ID trouvé !");
    }
  }
  

  logout(): void {
    this.authService.logout();
  }
}
