 export class Demandes {
  id : number;
  userId :string ;

  dateDemande :Date ;
  motif :string ;
  montant :number ;
  typeLigne : number;
  nature : number ;
  dateLivraisonPrevu :Date ;
  dateLivraison :Date ;

  fournisseursId: number;
  productId: number;
  productName:string;
  statut:string="pending";
  userUserName:string;
  userFullName:string;
  quantite:number;
}

