import { EtatFacture } from '../config/etat-facture.enum';
import { YesNo } from '../config/yes-no.enum';
export class Factures {
  id: number;
  comptesInternesId: number;

  comptesInternesName: string;
  demandesName: string ;
  demandesId: number ;
  dateOperation: Date ;
  ref: string ;
  libele: string;
  tvaDeductible: YesNo ;
  fraitsTransports: string ;
  ristoune: string ;
  tauxTva: string ;
  tva: string;
  etatFacture: EtatFacture;
  montant: string;
}
