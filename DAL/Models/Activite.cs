using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class Activite
    {
        public int Id { get; set; }
        public int ProcessId { get; set; }
        public Process Process { get; set; }
        public TypeActivite TypeActivite { get; set; }
        public string Name { get; set; }
        public string Descriptions { get; set; }

        public ICollection<EtatActivite> EtatActivite { get; set; }
        public ICollection<ActiviteTarget> ActiviteTarget { get; set; }
    }
}
