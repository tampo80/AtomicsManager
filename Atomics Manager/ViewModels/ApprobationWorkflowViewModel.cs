﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class ApprobationWorkflowViewModel
    {
        public int Id { get; set; }
        public DateTime ApprobationDate { get; set; }
        public string UserId { get; set; }

        public string userUserName { get; set; }
        public string userFullName { get; set; }
        public int ApprobationLevelId  { get; set; }

        public AprobationActionType LevelStatut { get; set; }

        public ApprobationSatut GlobalStatut { get; set; }

        public int ValitationRequieredNumber { get; set; }

        public string Comment { get; set; }

        public int DemandesId { get; set; }
        
    }
}
