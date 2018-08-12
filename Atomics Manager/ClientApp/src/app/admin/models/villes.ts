import { Pays } from './pays.model';

export class Villes {


    constructor(name?: string, paysName?: string, paysId?: string, pays?: Pays) {
        this.name = name;
        this.paysName = paysName;
        this.pays = pays;
        this.paysId = paysId;
    }

    public id: number;
    public name: string;
    public paysName: string;
    public paysId: string;
    public pays: Pays;

}
