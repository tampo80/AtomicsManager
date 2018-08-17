using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class GroupMemberViewModel
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string UserFullName { get; set; }
        public string UserUserName { get; set; }
        public string UserId { get; set; }
       
    }

}
