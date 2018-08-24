using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class ActionsHistories:AuditableEntity
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public string UserId { get; set; }
        public Actions Actions { get; set; }
        public int ActionsId { get; set; }
        public Etat Etat { get; set; }
        public int EtatId { get; set; }
        public int DemandesId { get; set; }
        public Demandes Demandes { get; set; }
        public DateTime dateOperation { get; set; }
        public string Comment { get; set; }

    }
}
