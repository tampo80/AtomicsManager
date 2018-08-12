import { TypeApprovalGroup } from './type-approval-group.enum';

export class ApprobationLevel {

  id: number;
  name: string;
  expensLimite: string;
  level: number;
  typeApprovalGroup: TypeApprovalGroup;
  shared: boolean;
  numberApprovalRequiered: number;
  isActvie: boolean;
  IsEnded: boolean;

}

