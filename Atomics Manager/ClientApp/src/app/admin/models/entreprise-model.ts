export class Entreprise {
  constructor(
    id?:number,
    titre? :string,
    name? :string,
    email? :string,
    webSite? :string,

    tel? :string,

    adresse? :string,



    formeJuridique?:string
  )
  {
    this.id=id;
    this.titre=titre;
    this.name=name;
    this.email=email;
    this.webSite=webSite;
    this.tel=tel;
    this.adresse=adresse;

    this.formeJuridique=formeJuridique;

  }
   public id :number;
   public titre :string;
   public  name :string;
   public email :string;
   public webSite :string;

   public tel :string;

   public adresse :string;



   public formeJuridique:string;

}
