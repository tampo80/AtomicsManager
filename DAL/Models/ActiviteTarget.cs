using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
     public class  ActiviteTarget
    {
        public int Id { get; set; }
        public int ActiviteId { get; set; }
        public Activite Activite { get; set; }

        public Target Target { get; set; }

        public int? GroupId { get; set; }
        public Group Group { get; set; }
    }
}
