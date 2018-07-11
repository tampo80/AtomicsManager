import { BankInfos } from "./bank-infos-model";
import { Villes } from "./villes";

export class Fournisseurs {
    public id:number;
    public titre:string;
    public Email :string;
        public  PhoneNumber :string;
        public  AlternatePhoneNumber :string;
        public CodePostale :string;
        public Adresse :string;

        public Devises DevisesPayement :string;

        public TypePayments TypePayments :string;

        public NumeroDeCompte :string;

        public IntituleDuCompte :string;

        public  BankInfos :BankInfos;


        //navigation

        public  VilleId :number;
        public  Villes :Villes;
}
