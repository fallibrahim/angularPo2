import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CampagneService } from '../campagne.service';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Annee } from '../campagne.service';  // Import de l'interface
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-add-annee',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SideBarComponent],
  templateUrl: './add-annee.component.html',
  styleUrl: './add-annee.component.css'
})
export class AddAnneeComponent {
  anneeForm: FormGroup;
  message: string = '';      
  errorMessage: string = '';

  constructor(
    private router: Router,
    private campagneService: CampagneService,
    private authService: AuthService
  ) {
    this.anneeForm = new FormGroup({
      annee: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.anneeForm.valid) {
      const anneeData: Annee = {
        annee: this.anneeForm.value.annee  // On envoie l'objet de type Annee
      };

      console.log("🔹 Données du formulaire envoyées :", anneeData);

      this.campagneService.saveAnnee(anneeData).subscribe({
        next: (response) => {
          console.log("✅ Année ajoutée avec succès :", response);
          this.message = "Année ajoutée avec succès !";
          this.errorMessage = '';
          this.anneeForm.reset(); // Réinitialisation du formulaire
        },
        error: (err) => {
          console.error("❌ Erreur lors de l’ajout de l’année :", err);
          console.error("💥 Détails de l'erreur :", err.error);  // Ajoute ceci !
          this.errorMessage = `Échec de l'ajout de l'année : ${err.message}`;
          this.message = '';
        }
        
      });
    } else {
      this.errorMessage = "Veuillez renseigner une année.";
      this.message = '';
    }
  }
  logout(): void {   
    this.authService.logout();  
  }
}
