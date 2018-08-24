using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class ActionTargetViewModel
    {
        public int Id { get; set; }
        public int ActionsId { get; set; }
        public string ActionsName { get; set; }

        public Target Target { get; set; }

        public int? GroupId { get; set; }
        public string GroupName { get; set; }
    }
}
