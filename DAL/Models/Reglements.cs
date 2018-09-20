using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class Reglements:AuditableEntity
    {
        public int Id { get; set; }
        public Factures Factures { get; set; }
        public int FacturesId { get; set; }
        public DateTime DateOperation { get; set; }
        public double MontantRestant { get; set; }
        public double MontantPaye { get; set; }
        public MethodePayement MyPropMethodePayementerty { get; set; }
    }
}
