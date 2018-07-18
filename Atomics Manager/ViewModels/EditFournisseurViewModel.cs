using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Atomics_Manager.ViewModels;
using Microsoft.AspNetCore.Http;

namespace Atomics_Manager.ViewModels {
    public class EditFournisseurViewModel {

        public int id { get; set; }
        public string Titre { get; set; }
        public string NomSociete { get; set; }
        public string FormeJuridique { get; set; }
        public List<int> Secteurs { get; set; }
        public byte[] Contract { get; set; }
        public DevisesViewModel Devises { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Emailcommande { get; set; }
        public string TelCommande { get; set; }
        public string CodePostale { get; set; }
        public string Adresse { get; set; }
        public string VillesName { get; set; }
        public PaysViewModel Pays { get; set; }
        public EditVillesViewModel Villes { get; set; }
        public string NomDg { get; set; }
        public string TelDg { get; set; }
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string AccountName { get; set; }
        public string Iban { get; set; }
        public string Adressebk { get; set; }
        public string Emailbk { get; set; }
        public PaysViewModel Paysbk { get; set; }
        public EditVillesViewModel Villebk { get; set; }
        public string Tel { get; set; }
        public int TypePayement { get; set; }
    }

}