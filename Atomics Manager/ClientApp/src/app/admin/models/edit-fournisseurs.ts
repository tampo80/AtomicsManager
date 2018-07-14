import { Secteurs } from "./secteurs";
import { Devises } from "./devises";
import { Pays } from "./pays.model";
import { Villes } from "./villes";

export class EditFournisseurs {

    constructor( titre?:string,
         nomSociete?:string,
         formeJuridique?:string,
         secteurs?:Secteurs[],
         contract?:any,
         devises?:Devises,
         phoneNumber?:string,
         email?:string,
         emailcommande?:string,
         telCommande?:string,
         codePostale?:string,
         adresse?:string,
         villesName?:string,
         pays?:Pays,
         ville?:Villes,
         nomDg?:string,
         telDg?:string,
         bankName?:string,
         accountNumber?:string,
         accountName?:string,
         iban?:string,
         adressebk?:string,
         emailbk?:string,
         paysbk?:Pays,
         villebk?:Villes,
         tel?:string,
         typePayement?:string)
    {
        this.titre=titre;
        this.nomSociete=nomSociete;
        this.formeJuridique=formeJuridique;
        this.secteurs=secteurs;
        this.contract=contract;
        this.devises=devises;
        this.phoneNumber=phoneNumber;
        this.email=email;
        this.emailcommande=emailcommande;
        this.telCommande=telCommande;
        this.codePostale=codePostale;
        this.adresse=adresse;
        this.villesName=villesName;
        this.pays=pays;
        this.ville=ville;
        this.nomDg=nomDg;
        this.telDg=telDg;
        this.bankName=bankName;
        this.accountNumber=accountNumber;
        this.accountName=accountName;
        this.iban=iban;
        this.adressebk=adressebk;
        this.emailbk=emailbk;
        this.paysbk=paysbk;
        this.villebk=villebk;
        this.tel=tel;
        this.typePayement=typePayement;
    }
     public titre:string;
     public nomSociete:string;
     public formeJuridique:string;
     public secteurs:Secteurs[];
     public contract:any;
     public devises:Devises;
     public phoneNumber:string;
     public email:string;
     public emailcommande:string;
     public telCommande:string;
     public codePostale:string;
     public adresse:string;
     public villesName:string;
     public pays:Pays;
     public ville:Villes;
     public nomDg:string;
     public telDg:string;
     public bankName:string;
     public accountNumber:string;
     public accountName:string;
     public iban:string;
     public adressebk:string;
     public emailbk:string;
     public paysbk:Pays;
     public villebk:Villes;
     public tel:string;
     public typePayement:string;
}
