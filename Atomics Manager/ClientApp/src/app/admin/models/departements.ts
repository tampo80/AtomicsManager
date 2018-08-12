export class Departements {

  constructor(id?: number, name?: string, description?: string, headName?: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.headName = headName;
  }
  id: number;
  name: string;
  description: string;
  headName: string;

}
