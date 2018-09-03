using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class ComptesInternes
    {
        public int Id { get; set; }
        public string NumCompte { get; set; }
        public string Label { get; set; }
        public TypeComptes TypeComptes { get; set; }
        public string Description { get; set; }


    }
}
