import { BankInfos } from './bank-infos-model';
import { Villes } from './villes';
import { TypePayments } from './type-payments.enum';
import { Devises } from './devises';

export class Fournisseurs {
    public id: number;
    public titre: string;

    public formeJuridique: string;

    public nomSociete: string;



    public email: string;
    public phoneNumber: string;

    public emailcommande: string;

    public telCommande: string;

    public alternatePhoneNumber: string;
    public codePostale: string;
    public adresse: string;





    // navigation


    public villesName: string;


    public secteurs: string[];
}
