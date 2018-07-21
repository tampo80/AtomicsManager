using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
namespace DAL.Models
{
    public class Entreprise:AuditableEntity
    {
        public int Id { get; set; }
        public string titre { get; set; }
        public string Name { get; set; }
        public string email { get; set; }
        public string webSite { get; set; }

        public string Tel { get; set; }

        public string Adresse { get; set; }

        public byte[] Logo { get; set; }

        public string FormeJuridique { get; set; }
    }

    
}