using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class ActionsHistoriesViewModel
    {
        public int Id { get; set; }
        public string  UserUserName { get; set; }
        public string UserFullName { get; set; }
        public string UserId { get; set; }
        public string ActionsName { get; set; }
        public int ActionsId { get; set; }
        public string EtatName { get; set; }
        public int EtatId { get; set; }
        public int DemandesId { get; set; }
        public string Comment { get; set; }
        public DateTime dateOperation { get; set; }

    }
}
