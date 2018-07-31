﻿// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Product : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Icon { get; set; }
        public decimal BuyingPrice { get; set; }
       
        public bool IsActive { get; set; }
        public bool IsDiscontinued { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }


        

        public int ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }

       
        public int FournisseursId { get; set; }
        public Fournisseurs Fournisseurs { get; set; }

        public ICollection<Demandes> Demandes { get; set; }
    }
}
