using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class Process:AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string  Description { get; set; }

        // naviation
        public ICollection<Demandes> Demandes { get; set; }
        public ICollection<ProcessAdmin> ProcessAdmin { get; set; }
        public ICollection<Etat> Etat { get; set; }
        public ICollection<Transition> Transition { get; set; }
        public ICollection<Activite> Activite { get; set; }
        public ICollection<Group> Group { get; set; }
    }
}
