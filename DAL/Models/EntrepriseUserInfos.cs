
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace DAL.Models
{
    public class EntrepriseUserInfos
    {
        public int Id { get; set; }

        public Agences Agences { get; set; }
        public int AgencesId { get; set; }
        //for head departements
        public Departements Departements { get; set; }
        public int DepartementsId { get; set; }

        //Optionale
        public int ServicesId { get; set; }
        public Services Services { get; set; }

        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}