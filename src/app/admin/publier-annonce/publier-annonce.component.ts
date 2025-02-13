  import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnonceService } from '../annonce.service';
import { Annonce } from '../annonce.model';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-publier-annonce',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './publier-annonce.component.html',
  styleUrl: './publier-annonce.component.css'
})
export class PublierAnnonceComponent {
  annonceForm : FormGroup;
  constructor(private fb: FormBuilder, 
    private annonceService: AnnonceService,
  private authService: AuthService) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      annee: ['', Validators.required],
      niveau: ['', Validators.required],
      dateLimite: ['', Validators.required],
    });
   }

   publierAnnonce() {
    if (this.annonceForm.valid) {
      const nouvelleAnnonce: Annonce = this.annonceForm.value;
      this.annonceService.ajouterAnnonce(nouvelleAnnonce).subscribe({
        next: () => {
          console.log('Annonce publiée avec succès !');
        },
        error: err => console.error('Erreur lors de l’ajout:', err)
      });
    }
  }
  logout() : void {
   this.authService.logout();
  }
}
