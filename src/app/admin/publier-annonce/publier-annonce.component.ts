import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnnonceService } from '../annonce.service';
import { Annonce } from '../annonce.model';

@Component({
  selector: 'app-publier-annonce',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './publier-annonce.component.html',
  styleUrl: './publier-annonce.component.css'
})
export class PublierAnnonceComponent {
  annonceForm : FormGroup;
  constructor(private fb: FormBuilder, private annonceService: AnnonceService) {
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
      this.annonceService.ajouterAnnonce(nouvelleAnnonce).subscribe(() => {
        alert('Annonce publiée avec succès !');
        this.annonceForm.reset();
      });
    }
  }
}
