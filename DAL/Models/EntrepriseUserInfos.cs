
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace DAL.Models
{
    public class EntrepriseUserInfos
    {
        public string Id { get; set; }

        public Agences Agences { get; set; }

        //for head departements
        public Departements Departements { get; set; }

        //Optionale
        public int ServicesId { get; set; }
        public Services Services { get; set; }
    }
}