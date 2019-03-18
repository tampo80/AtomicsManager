using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels {
    public class DepartementsViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int HeadDeptementId { get; set; }
        public ApplicationUser HeadDeptement { get; set; }

        public double BudjetCapex { get; set; }
        public double BudjetOpex { get; set; }
    }
}
