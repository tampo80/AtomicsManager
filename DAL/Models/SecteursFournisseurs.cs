﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class SecteursFournisseurs:AuditableEntity
    {
        public int FournisseursId { get; set; }
        public Fournisseurs Fournisseurs { get; set; }

        public int SecteursId { get; set; }
        public Secteurs Secteurs { get; set; }

        //navigation
    }
}
