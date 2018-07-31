import { FormeJuridique } from "../models/forme-juridique";
import { TypeApprovalGroup } from "../models/type-approval-group";

export const FORME_JURIDIQUE:FormeJuridique[]=[
  {
    value:0,label:"EURL"
  },
  {
    value:1,label:"SARL"
  },
  {
    value:2,label:"SELAR"
  },
  {
    value:3,label:"SA"
  }
  ,
  {
    value:4,label:"SAS"
  }
  ,
  {
    value:3,label:"SASU"
  },
  {
    value:4,label:"SNC"
  }
  ,
  {
    value:5,label:"SCP"
  }



];


export const  TYPE_APPROVAL_GROUP:TypeApprovalGroup[]=[

  {
    value:0,label:"Chef de départememnts"
  },
  {
    value:2,label:"Chef de service"
  },
  {
    value:3,label:"Générique"
  },
  {
    value:4,label:"Services Généreaux"
  },
  {
    value:5,label:"Contrôl financier"
  },
  {
    value:6,label:"Expèrts"
  },


];
