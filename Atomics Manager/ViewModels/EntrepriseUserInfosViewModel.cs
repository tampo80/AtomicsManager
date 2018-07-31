using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels{
    public class EntrepriseUserInfosViewModel
    {
        public int Id { get; set; }

        public int AgencesId { get; set; }
        public string AgencesName { get; set; }
        //for head departements
        public int DepartementsId { get; set; }
        public string DepartementName { get; set; }
        //Optionale
        public int ServicesId { get; set; }
        public string  ServicesName { get; set; }

        public string ApplicationUserId { get; set; }
       
    }
}
