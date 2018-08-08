using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class DemandesViewModel
    {
        public int Id { get; set; }
        public string userId { get; set; }
        public string userUserName { get; set; }     
        public string userFullName { get; set; }
        public DateTime DateDemande { get; set; }
        public string Motif { get; set; }
        public decimal Montant { get; set; }
        public TypeLignesBudgetaires TypeLigne { get; set; }
        public Naturedemande Nature { get; set; }
        public DateTime DateLivraisonPrevu { get; set; }
        public DateTime DateLivraison { get; set; }
        public ApprobationSatut Statut { get; set; }
        public int FournisseursId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantite { get; set; }

        public string ServiceName { get; set; }
        public string DepartementName { get; set; }

        public string AgenceName { get; set; }    



    }
}
