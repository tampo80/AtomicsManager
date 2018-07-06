using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class Devises:AuditableEntity
    {
        public int Id { get; set; }
        public string Symbole { get; set; }
        public string Label { get; set; }
        public string CodeIso { get; set; }
    }
}
