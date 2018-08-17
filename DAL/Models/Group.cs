using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
  public class Group
    {
        public int Id { get; set; }
        public int ProcessId { get; set; }
        public Process Process { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<GroupMember> GroupeMember { get; set; }
        public ICollection<ActionTarget> ActionTarget { get; set; }
        public ICollection<ActiviteTarget> ActiviteTarget { get; set; }
    }
}
