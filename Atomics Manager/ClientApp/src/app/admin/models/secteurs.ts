export class Secteurs {
    constructor(name?: string, description?: string, fournisseurs?: string[]) {
        this.name = name;
        this.description = description;
        this.fournisseurs = fournisseurs;
    }

    public id: number;
    public name: string;
    public description: string;

    public fournisseurs: string[];


}
