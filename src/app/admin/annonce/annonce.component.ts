import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Annee, Annonce, CampagneService } from "../campagne.service";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SideBarComponent } from "../side-bar/side-bar.component";

@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [CommonModule, RouterLink, SideBarComponent],
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'] // Correction ici
})
export class AnnonceComponent implements OnInit {
  annee:Annee[] = [];
  annonces: Annonce[] = []; // Remplacez 'annonce' par une liste
  errorMessage!: string;
  message!: string;
  authService: any;

  constructor(private campagneService: CampagneService, 
    private router: Router,
    private route : ActivatedRoute) {}
;
  ngOnInit(): void {
    const anneeId = this.route.snapshot.paramMap.get('id');// 'd24c9993-a06c-4d1a-8e7d-8755e7193365'; // Remplacez par l'ID réel de l'année
    if(anneeId) {
      this.campagneService.getAnnoncesByAnnee(anneeId).subscribe({
        next: (annonces) => {
          console.log(annonces);
          this.annonces = annonces;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des annonces', err);
          this.errorMessage = 'Impossible de récupérer les annonces.';
        }
      });
    }else{ 
      this.errorMessage = 'Impossible de récupérer les annonces.';
    }
    
  }

  gotToPublierAnnonces() {
    this.router.navigate(['/publier-annonce']);
  }
  goToEditAnnonce(annonce : Annonce) {
    this.router.navigate(['/edit-annonce', annonce.id]);
  }
  logout(): void {
    this.authService.logout();
  }
}
