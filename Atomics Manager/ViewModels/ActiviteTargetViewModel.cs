using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class ActiviteTargetViewModel
    {
        public int Id { get; set; }
        public int ActiviteId { get; set; }
        public string ActivitName { get; set; }

        public Target Target { get; set; }

        public int? GroupId { get; set; }
        public string GroupName { get; set; }
    }
}
