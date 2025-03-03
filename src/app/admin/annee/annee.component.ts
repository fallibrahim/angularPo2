import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Annee, CampagneService } from '../campagne.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-annee',
  standalone: true,
  imports: [CommonModule,RouterLink,SideBarComponent],
  templateUrl: './annee.component.html',
  styleUrls: ['./annee.component.css'] // Correction ici : "styleUrls" au lieu de "styleUrl"
})
export class AnneeComponent implements OnInit {
  annees: Annee[] = [];

  constructor(private campagneService: CampagneService, private authService : AuthService, private router: Router) {}

  ngOnInit(): void {
    this.campagneService.getAllAnnee().subscribe({
      next: (annees) => {
        console.log('Données reçues :', annees);
        this.annees = annees;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des années académiques', err);
      }
    });
  }

  goToAnnonceList(annee: Annee) {
    this.router.navigate(['/annonce', annee.id]);
  }
  logout(): void {  
    this.authService.logout();  
  }
}
