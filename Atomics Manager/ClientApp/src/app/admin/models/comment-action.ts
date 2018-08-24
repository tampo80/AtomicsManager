import { ActionsType } from '../workflow/config/actions-type.enum';
export class CommentAction {
  commentDate: Date;
  comment: string;
  actionsType: ActionsType;
  demandesId: number;

}
