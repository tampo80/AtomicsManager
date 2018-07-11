export class Devises {

    constructor(symbole?:string,label?:string,codeIso?:string)
    {
        this.symbole=symbole;
        this.label=label;
        this.codeIso=codeIso;
    }
    public id:number;
    public symbole:string;
    public label:string;
    public codeIso:string;
}
