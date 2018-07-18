using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class DocumentsFournisseurs:AuditableEntity
    {
        public int Id { get; set; }
        public string DocumentName { get; set; }
        public byte[] Documents { get; set; }
        public TypeDocFournisseurs typeDocFournisseurs { get; set; }

      
        public Fournisseurs Fournisseurs { get; set; }
    }

}
