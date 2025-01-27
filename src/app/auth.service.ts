import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
    login(data : {email:string, password:string}) {
      console.log("Données réçues du formulaire de login", data);
    }

   register(data : {nom:string, prenom:string, phone:string, email:string, password:string, confirmPassword:string, adresse:string, dateNaissance:string}) {
    console.log("Données réçues du formulaire d'inscription", data);
  }
}
