using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels{
    public class ApprobationLevelViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public decimal ExpensLimite { get; set; }
        public TypeApprovalGroup TypeApprovalGroup { get; set; }
        public bool Shared { get; set; }
    }
}
