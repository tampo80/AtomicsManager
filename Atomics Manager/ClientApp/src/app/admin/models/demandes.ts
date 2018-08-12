 export class Demandes {
  id: number;
  userId: string ;

  dateDemande: Date ;
  motif: string ;
  montant: number ;
  typeLigne: number;
  nature: number ;
  dateLivraisonPrevu: Date ;
  dateLivraison: Date ;
  serviceName: string;
  agenceName: string;
  fournisseursId: number;
  productId: number;
  productName: string;
  statut = 'pending';
  userUserName: string;
  userFullName: string;
  quantite: number;
  expertsId: number;
}

