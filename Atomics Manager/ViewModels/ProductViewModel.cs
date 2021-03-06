// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace Atomics_Manager.ViewModels {
    public class ProductViewModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile IIcon { get; set; }
        public decimal BuyingPrice { get; set; }
        public byte[] Icon { get; set; }
        public int UnitsInStock { get; set; }
        public bool IsActive { get; set; }
        public bool IsDiscontinued { get; set; }
        public string ProductCategoryName { get; set; }
        public int ProductCategoryId { get; set; }

        public int FournisseursId { get; set; }
        public string FournisseursTitre { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string  Sicone { get; set; }     
    }
}