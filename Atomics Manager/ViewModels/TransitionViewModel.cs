using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class TransitionViewModel
    {
        public int Id { get; set; }
        public int ProcessId { get; set; }
        public string ProcessName { get; set; }

        public int EtatActuelId { get; set; }
        public string EtatActuelName { get; set; }
        public int EtatSuivantId { get; set; }
        public string   EtatSuivantName { get; set; }
    }
}
