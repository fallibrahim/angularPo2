import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Annonce } from './annonce.model';


@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
 
  private annonces : Annonce[] = [
    { niveau: 'Licence 1', titre: 'Tuteur P.O', description: 'Description 1', annee: '2024-2025', dateLimite: '11-Nov-2025' },
    { niveau: 'Licence 1', titre: 'Tuteur P.O', description: 'Description 2', annee: '2024-2025', dateLimite: '11-Nov-2025' },
    { niveau: 'Licence 2', titre: 'Tuteur P.O', description: 'Description 3', annee: '2024-2025', dateLimite: '11-Nov-2025' }
  ]
  constructor() { }
  getAnnonces() : Observable<Annonce[]> {
     return of(this.annonces)
  }
  ajouterAnnonce(annonce: Annonce): Observable<Annonce> {
    annonce.id = this.annonces.length + 1;
    this.annonces.push(annonce);
    return of(annonce);
  }
}
