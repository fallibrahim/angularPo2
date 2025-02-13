 import { Motif } from "./motif.model";
import { status } from "./status.model";
export interface Annonce {
    id: string;
    titre: string;
    description: string;
    annonceStatus: 'OUVERT' | 'FERME' | 'ARCHIVE'; // Ajoute d'autres statuts si besoin
    dateLimite: string;
    motif?: Motif;
}