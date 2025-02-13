import { Annonce } from "./annonce.model";

export interface AnneeAnnonce {
    id: string;
    annee: string;
    annonces: Annonce[];
  }