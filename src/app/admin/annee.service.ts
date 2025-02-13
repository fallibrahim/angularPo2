import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnneeAnnonce } from './annee.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {
  private apiUrl = 'http://localhost:4001/CAMPAGNESERVICE/';
  constructor(private http: HttpClient) { }
  getAnnees() : Observable<AnneeAnnonce[]> {
      return this.http.get<AnneeAnnonce[]>(this.apiUrl + '/annonce').pipe(
       tap(annonces => console.log('Annonces réçues:', annonces)),
       catchError(this.handleError)
      )
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
