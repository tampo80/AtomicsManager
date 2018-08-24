using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class RequestAction
    {
        public int Id { get; set; }

        public Demandes Demandes { get; set; }

        public int DemandesId { get; set; }

        public Actions Actions { get; set; }

        public int ActionsId { get; set; }
    }
}
