import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../annonce.service';
import { Router } from '@angular/router';
import { Annonce } from '../annonce.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css'
})
export class AnnonceComponent implements OnInit {
annonces : Annonce[] = [];
errorMessage!:string;
message!:string;
  authService: any;
constructor(private annonceService : AnnonceService,
  private router: Router,
) { }
  ngOnInit(): void {
    this.annonceService.getAnnonces().subscribe({
      next : annonces => {
         console.log(annonces)
         this.annonces = annonces;
      },
      error : err => this.errorMessage = err.error.message
    })
  }
  gotToPublierAnnonces() {
    this.router.navigate(['/publier-annonce']);
  }
  logout(): void {
    this.authService.logout();
  }
}
