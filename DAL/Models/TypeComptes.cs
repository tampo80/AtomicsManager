using DAL.Models.enums;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace DAL.Models
{
   public class TypeComptes
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public NatureCompte NatureCompte { get; set; }
        //avigation
        public ICollection<ComptesInternes> ComptesInternes { get; set; }
    }
}