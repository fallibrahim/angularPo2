import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Annonce } from '../annonce.model';
// import { AnnonceService } from '../annonce.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-accueil-admin',
  standalone: true,
  imports: [
    CommonModule,RouterLink,SideBarComponent
  ],
  templateUrl: './accueil-admin.component.html',
  styleUrl: './accueil-admin.component.css'
})
export class AccueilAdminComponent {
  // annonces: Annonce[] = [];
  constructor(private router: Router, private authService : AuthService) { }
  

  ngOnInit() {
      // this.annonceService.getAnnonces().subscribe(annonces => 
      // this.annonces = annonces)
      console.log("✅ Accueil Admin chargé !");
  }
 gotToPublierAnnonces() {
  this.router.navigate(['/publier-annonce']);
}
logout(): void {
  this.authService.logout();
}

}
