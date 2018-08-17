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
        IBankInfosRepository BankInfos { get; }

        IEntrepriseRepository Entreprise { get; }


        IServicesRepository Services { get; }
        IDepartementsRepository Departements { get; }

        IAgencesRepository Agences { get; }


        IAPGmembersRepository APGmembers { get; }

        IApprobationLevelRepository ApprobationLevel { get; }

        IProductCategoryRepository ProductCategory { get; }

       

         IEntrepriseUserInfosRepository EntrepriseUserInfos  { get;}

         IApprobationWorkflowRepository ApprobationWorkflow  { get;}

         IActionsRepository Actions { get;  }
         IActionTargetRepository ActionTarget { get; }
         IDemandesActionRepository DemandesAction { get; }
         IDemandesStakeholdersRepository DemandesStakeholders { get; }
         IFichierDemandesRepository FichierDemandes { get; }
         IInfosDemandesRepository InfosDemandes { get; }
         IActiviteRepository Activite { get; }  
         IActiviteTargetRepository ActiviteTarget { get; }
         IProcessAdminRepository ProcessAdmin { get; }
         IProcessRepository Process { get; }
         ITransitionActionsRepository TransitionActions { get; }
         ITransitionRepository Transition { get; }
         IEtatActiviteRepository EtatActivite { get; }
         IEtatRepository Etat { get; }
         IGroupMemberRepository GroupMember { get; }
         IGroupRepository Group { get; }    


         
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
