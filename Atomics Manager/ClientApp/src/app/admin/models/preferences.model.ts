import { Theme } from "../domain";

export class Preferences {
  constructor(theme?:Theme){
    this.theme=theme;
  }
  theme:Theme;

}

