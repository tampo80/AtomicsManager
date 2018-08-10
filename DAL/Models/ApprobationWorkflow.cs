using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ApprobationWorkflow
    {
        public int Id { get; set; }
        public DateTime ApprobationDate { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ApprobationLevel Level { get; set; }

        public AprobationActionType LevelStatut { get; set; }

        public ApprobationSatut GlobalStatut { get; set; }

        public string Comment { get; set; }

        public int DemandesId { get; set; }    
        public Demandes Demandes { get; set; }
    }

}