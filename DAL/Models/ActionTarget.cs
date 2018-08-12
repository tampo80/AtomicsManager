using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class ActionTarget
    {
        public int Id { get; set; }

        public int ActionsId { get; set; }
        public Actions Actions { get; set; }

        public Target Target { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}
