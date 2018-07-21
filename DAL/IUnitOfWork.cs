// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        IProductRepository Products { get; }
        IOrdersRepository Orders { get; }
        IDemandesRepository Demandes { get; }
        IPaysRepository Pays { get; }
        IVillesRepository Villes { get; }
        IDevisesRepository Devises { get; }

        ISecteursRepository Secteurs { get; }

        IFournisseursRepository Fournisseurs { get; }
        ISecteursFournisseurs SecteursFournisseurs { get; }

        IDocumentsFournisseursRepository DocumentsFournisseurs { get; }
        IBankInfosRepository BankInfos {get;}

        IEntrepriseRepository Entreprise { get; }

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
