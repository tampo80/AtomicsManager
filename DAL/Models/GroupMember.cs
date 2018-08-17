using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class GroupMember
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
