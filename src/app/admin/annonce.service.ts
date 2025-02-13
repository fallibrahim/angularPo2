import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Annonce } from './annonce.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
 
  // private annonces : Annonce[] = [
  //   { niveau: 'Licence 1', titre: 'Tuteur P.O', description: 'Description 1',annee:"2024-2025", dateLimite: '11-Nov-2025' },
  //   { niveau: 'Licence 1', titre: 'Tuteur P.O', description: 'Description 2',annee:"2024-2025", dateLimite: '11-Nov-2025' },
  //   { niveau: 'Licence 2', titre: 'Tuteur P.O', description: 'Description 3',annee:"2024-2025", dateLimite: '11-Nov-2025' }
  // ]
  private apiUrl = 'http://localhost:4001/CAMPAGNESERVICE/';
  constructor(private http : HttpClient) { }
  getAnnonces() : Observable<Annonce[]> {
     return this.http.get<Annonce[]>(this.apiUrl + '/annonce').pipe(
      tap(annonces => console.log('Annonces réçues:', annonces)),
      catchError(this.handleError)
     )
  }
  getAnnonceById(id: string): Observable<Annonce> {
    return this.http.get<Annonce>(this.apiUrl + '/annonce/' + id).pipe(
      tap(annonce => console.log('Annonce réçue:', annonce)),
      catchError(this.handleError)
    )
  }
  ajouterAnnonce(annonce: Annonce): Observable<Annonce> {
    // annonce.id = this.annonces.length + 1;
    // this.annonces.push(annonce);
    // return of(annonce);
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
  }
  return this.http.post<Annonce>(this.apiUrl+'/annonce', annonce, httpOptions).pipe(
      tap(annonce => console.log(annonce)),
      catchError(this.handleError)
  )
  }
  updateAnnonce(annonce: Annonce): Observable<Annonce> {
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<Annonce>(this.apiUrl + '/annonce/' + annonce.id, annonce, httpOptions).pipe(
      tap(annonce => console.log(annonce)),
      catchError(this.handleError)
    )
  }
  deleteAnnonce(id: string): Observable<Annonce> {
    return this.http.delete<Annonce>(this.apiUrl + '/annonce/' + id).pipe(
      tap(annonce => console.log(annonce)),
      catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse) {
    // let errorMessage!: string;
    if (error.status === 0) {
      console.error('An error occurred:', error.error.message);
      // errorMessage = `An error occurred:, ${error.error.message}`;
       
    } else {
      console.error(
        `Backend returned code ${ error.status } `+
        `body was: ${ error.status }`);
        // errorMessage = `Backend returned code ${ error.status }, ` +
        // `body was: ${ error.status }`;
        
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
