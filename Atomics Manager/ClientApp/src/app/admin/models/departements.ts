export class Departements {

  constructor(id?: number, name?: string, description?: string, headName?: string, budjetOpex?: string, budjetCapex?: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.headName = headName;
      this.budjetCapex = budjetCapex;
      this.budjetOpex = budjetOpex;
  }
  id: number;
  name: string;
  description: string;
  headName: string;
  budjetOpex: string;
  budjetCapex: string;

}
