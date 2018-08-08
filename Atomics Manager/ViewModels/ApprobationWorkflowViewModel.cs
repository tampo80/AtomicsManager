using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class ApprobationWorkflowViewModel
    {
        public int Id { get; set; }
        public DateTime ApprobationDate { get; set; }
        public string UserId { get; set; }
       

        public int ApprobationLevelId  { get; set; }

        public ApprobationSatut LevelStatut { get; set; }

        public ApprobationSatut GlobalStatut { get; set; }

        public string Comment { get; set; }

        public int DemandesId { get; set; }
        
    }
}
