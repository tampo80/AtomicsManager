using System.Collections.Generic;

namespace Atomics_Manager.ViewModels{
    public class APGM
    {
        public ApprobationLevelViewModel Level { get; set; }
        public List<APGmembersViewModel> members { get; set; }
    }
}