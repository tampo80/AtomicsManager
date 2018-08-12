using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class ProcessAdmin
    {
        public int ProcessId { get; set; }
        public Process Process { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
