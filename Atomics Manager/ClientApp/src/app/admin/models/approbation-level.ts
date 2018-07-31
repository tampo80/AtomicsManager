import { TypeApprovalGroup } from "./type-approval-group.enum";

export class ApprobationLevel {

  id:number;
  name:string;
  expensLimite:string;
  level:number;
  typeApprovalGroup:TypeApprovalGroup;

}

