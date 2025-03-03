import { Injectable } from '@angular/core';
import { ApiConfig } from './ApiConfigs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  url: string = ApiConfig.domaine + ApiConfig.CAMPAGNESERVICE;
  constructor(private http: HttpClient) {}

  // *******************************MOTIF**********************************
  saveMotif(motif: Motif): Observable<string> {
    return this.http.post<string>(`${this.url}/motif`, motif);
  }
  //
  updateMotif(motif: Motif): Observable<Boolean> {
    return this.http.put<Boolean>(`${this.url}/motif`, motif);
  }
  //
  getMotifById(motifId: string): Observable<Motif> {
    return this.http.get<Motif>(`${this.url}/motif/${motifId}`);
  }
  //
  deleteMotifById(motifId: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/motif/${motifId}`);
  }

  // *******************************DOSSIER**********************************
  saveDossier(dossier: Dossier): Observable<string> {
    return this.http.post<string>(`${this.url}/dossier`, dossier);
  }
  //
  updateDossier(dossier: Dossier): Observable<Boolean> {
    return this.http.put<Boolean>(`${this.url}/dossier`, dossier);
  }
  //
  deleteDossierById(dossierId: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/dossier/${dossierId}`);
  }

  // *******************************DOCUMENT**********************************
  saveFile(file: File): Observable<string> {
    return this.http.post<string>(`${this.url}/document`, file.file);
  }
  //
  uploadFile(fileId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/document/${fileId}`);
  }
  //
  deleteFileById(fileId: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/document/${fileId}`);
  }

  // *******************************ANNEE**********************************
  saveAnnee(annee: Annee): Observable<Annee> {
    console.log("📡 Envoi au serveur :", annee);
    return this.http.post<Annee>(`${this.url}/annee`, annee);
  }
  //
  getAllAnnee(): Observable<Annee[]> {
    return this.http.get<Annee[]>(`${this.url}/annee`);
  }
  //
  updateAnnee(annee: Annee): Observable<Boolean> {
    return this.http.put<Boolean>(`${this.url}/annee`, annee);
  }
  //
  getAnneeById(anneeId: string): Observable<Annee> {
    return this.http.get<Annee>(`${this.url}/annee/${anneeId}`);
  }
  //
  deleteAnneeById(anneeId: string): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/annee/${anneeId}`);
  }

  // *******************************ANNONCE**********************************
  saveAnnonce(annonce: Annonce): Observable<string> {
    return this.http.post<string>(`${this.url}/annonce`, annonce);
  }
  //
  getAnnonceById(annonceId: string): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.url}/annonce/${annonceId}`);
  }

  //
  getAnnoncesByAnnee(anneeId: string): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.url}/annonce/annee/${anneeId}`);
  }
  //
  updateAnnonce(annonce: Annonce): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/annonce`, annonce);
  }
  //
  deleteAnnonceById(annonceId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/annonce/${annonceId}`);
  }
}
export interface Annonce {
  id?: string;
  titre: string;
  description: string;
  status: string;
  dateLimite: string;
  academiqueId: string;
  motif?: {
    id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}
export interface Annee {
  id?: string;
  annee: string;
  annonces?: Annonce[];
}
export interface Dossier {
  id?: string;
  documentId: string;
  status: StatusDossier;
  message: string;
  motif?: Motif;
}
export interface Motif {
  id?: string;
  description: string;
  annonceId: string;
  annonce?: Annonce;
}
export interface File {
  id?: string;
  file: string;
}
export enum StatusDossier {
  WAITING = 'WAITING',
  VALID = 'VALID',
  REJECTED = 'REJECTED',
}
