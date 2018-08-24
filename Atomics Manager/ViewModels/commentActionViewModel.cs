using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class commentActionViewModel
    {
        public DateTime CommentDate { get; set; }
        public string Comment { get; set; }
        public TypeAction ActionsType { get; set; }
        public int DemandesId { get; set; }

    }
}
