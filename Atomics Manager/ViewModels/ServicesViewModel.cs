using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels{
    public class ServicesViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string HeadName { get; set; }

        public int departementsId { get; set; }

        public string departementsName { get; set; }
    }
}
