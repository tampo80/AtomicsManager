
export class Pays {
    constructor(name?:string,codePays?:string,villes?:string[]) {
        this.name=name;
        this.codePays=codePays;
        this.villes=villes;
    }

    public id : number;
    public name:string;
    public codePays:string;
    
    public villes:string[];

}