using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class BankInfos:AuditableEntity
    {
        public int Id { get; set; }
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string AccountName { get; set; }
        public string IBAN { get; set; }
        public string Adrresse { get; set; }

        public string Email { get; set; }

        public string TelephoneNumbers { get; set; }

        //navigation
       

        public int VillesId { get; set; }
        public Villes Villes { get; set; }
    }
}
