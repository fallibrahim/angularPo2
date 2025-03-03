 import { Motif } from "./motif.model";
import { status } from "./status.model";
export interface Annonce {
    id?: string;
    titre: string;
    description: string;
    annonceStatus: string;
    dateLimite: string;
    academiqueId: string;
    motif?: {
      id: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
  }