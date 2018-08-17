// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        ICustomerRepository _customers;
        IProductRepository _products;
        IOrdersRepository _orders;
        IDemandesRepository _Demandes;
        IPaysRepository _Pays;
        IVillesRepository _Villes;
        IDevisesRepository _Devises;

        ISecteursRepository _Secteurs;

        IFournisseursRepository _Fournisseurs;
        ISecteursFournisseurs _SecteursFournisseurs;
        
        IBankInfosRepository _BankInfosRepository;
        IDocumentsFournisseursRepository _DocumentsFournisseurs;

        IEntrepriseRepository _Entreprise;


        IServicesRepository _Services;
        IAgencesRepository _Agences;
        IDepartementsRepository _Departements;


        IAPGmembersRepository _APGmembers;

        IApprobationLevelRepository _ApprobationLevel;

        IProductCategoryRepository _ProductCategory;

       
        IEntrepriseUserInfosRepository _EntrepriseUserInfos;

        IApprobationWorkflowRepository _ApprobationWorkflow;

        IActionsRepository _Actions;
        IActionTargetRepository _ActionTarget;
        IDemandesActionRepository _DemandesAction;
        IDemandesStakeholdersRepository _DemandesStakeholders;
        IFichierDemandesRepository _FichierDemandes;
        IInfosDemandesRepository _InfosDemandes;
        IActiviteRepository _Activite;
        IActiviteTargetRepository _ActiviteTarget;
        IProcessAdminRepository _ProcessAdmin;
        IProcessRepository _Process;
        ITransitionActionsRepository _TransitionActions;
        ITransitionRepository _Transition;
        IEtatActiviteRepository _EtatActivite;
        IEtatRepository _Etat;
        IGroupMemberRepository _GroupMember;
        IGroupRepository _Group;


        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }



        public ICustomerRepository Customers
        {
            get
            {
                if (_customers == null)
                    _customers = new CustomerRepository(_context);

                return _customers;
            }
        }



        public IProductRepository Products
        {
            get
            {
                if (_products == null)
                    _products = new ProductRepository(_context);

                return _products;
            }
        }



        public IOrdersRepository Orders
        {
            get
            {
                if (_orders == null)
                    _orders = new OrdersRepository(_context);

                return _orders;
            }
        }


        public IDemandesRepository Demandes
        {
            get
            {
                if (_Demandes == null)
                    _Demandes = new DemandesRepository(_context);

                return _Demandes;
            }
        }


        public IPaysRepository Pays
        {
            get
            {
                if (_Pays == null)
                    _Pays = new PaysRepository(_context);

                return _Pays;
            }
        }



        public IVillesRepository Villes
        {
            get
            {
                if (_Villes == null)
                    _Villes = new VillesRepository(_context);

                return _Villes;
            }
        }

        public IDevisesRepository Devises
        {
            get
            {
                if (_Devises == null)
                    _Devises = new DevisesRepository(_context);

                return _Devises;
            }
        }


        public ISecteursRepository Secteurs
        {
            get
            {
                if (_Secteurs == null)
                    _Secteurs = new SecteursRepository(_context);

                return _Secteurs;
            }
        }


      public IBankInfosRepository BankInfos
        {
            get
            {
                if (_BankInfosRepository == null)
                    _BankInfosRepository = new BankInfosRepository(_context);

                return _BankInfosRepository;
            }
        }


        public IFournisseursRepository Fournisseurs
        {
            get
            {
                if (_Fournisseurs == null)
                    _Fournisseurs = new FournisseursRepository(_context);

                return _Fournisseurs;
            }
        }
        public ISecteursFournisseurs SecteursFournisseurs
        {
            get
            {
                if (_SecteursFournisseurs == null)
                    _SecteursFournisseurs = new SecteursFournisseursRepository(_context);

                return _SecteursFournisseurs;
            }
        }
        public IDocumentsFournisseursRepository DocumentsFournisseurs
        {
            get
            {
                if (_DocumentsFournisseurs == null)
                    _DocumentsFournisseurs = new DocumentsFournisseursRepository(_context);

                return _DocumentsFournisseurs;
            }
        }

        public IEntrepriseRepository Entreprise
        {
            get
            {
                if (_Entreprise == null)
                    _Entreprise = new EntrepriseRepository(_context);

                return _Entreprise;
            }
        }


        public IAgencesRepository Agences
        {
            get
            {
                if (_Agences == null)
                    _Agences = new AgencesRepository(_context);

                return _Agences;
            }
        }


    public IApprobationWorkflowRepository ApprobationWorkflow
            {
                get
                {
                    if (_ApprobationWorkflow == null)
                        _ApprobationWorkflow = new ApprobationWorkflowRepository(_context);

                    return _ApprobationWorkflow;
                }
            }


     


        public IDepartementsRepository Departements
        {
            get
            {
                if (_Departements == null)
                    _Departements = new DepartementsRepository(_context);

                return _Departements;
            }
        }



        public IServicesRepository Services
        {
            get
            {
                if (_Services == null)
                    _Services = new ServicesRepository(_context);

                return _Services;
            }
        }


        public IAPGmembersRepository APGmembers
        {
            get
            {
                if (_APGmembers == null)
                    _APGmembers = new APGmembersRepository(_context);

                return _APGmembers;
            }
        }

        public IApprobationLevelRepository ApprobationLevel
        {
            get
            {
                if (_ApprobationLevel == null)
                    _ApprobationLevel = new ApprobationLevelRepository(_context);

                return _ApprobationLevel;
            }
        }


        public IProductCategoryRepository ProductCategory
        {
            get
            {
                if (_ProductCategory == null)
                    _ProductCategory = new ProductCategoryRepository(_context);

                return _ProductCategory;
            }
        }



        public IEntrepriseUserInfosRepository EntrepriseUserInfos
        {
            get
            {
                if (_EntrepriseUserInfos == null)
                    _EntrepriseUserInfos = new EntrepriseUserInfosRepository(_context);

                return _EntrepriseUserInfos;
            }
        }


        public IActionsRepository Actions
        {
            get
            {
                if (_Actions == null)
                    _Actions = new ActionsRepository(_context);

                return _Actions;
            }
        }
        public IActionTargetRepository ActionTarget
        {
            get
            {
                if (_ActionTarget == null)
                    _ActionTarget = new ActionTargetRepository(_context);

                return _ActionTarget;
            }
        }
        public IDemandesActionRepository DemandesAction {
            get
            {
                if (_DemandesAction == null)
                    _DemandesAction = new DemandesActionRepository(_context);

                return _DemandesAction;
            }
        }
        public IDemandesStakeholdersRepository DemandesStakeholders {
            get
            {
                if (_DemandesStakeholders == null)
                    _DemandesStakeholders = new DemandesStakeholdersRepository(_context);

                return _DemandesStakeholders;
            }
        }
        public IFichierDemandesRepository FichierDemandes {
            get
            {
                if (_FichierDemandes == null)
                    _FichierDemandes = new FichierDemandesRepository(_context);

                return _FichierDemandes;
            }
        }
        public IInfosDemandesRepository InfosDemandes {
            get
            {
                if (_InfosDemandes == null)
                    _InfosDemandes = new InfosDemandesRepository(_context);

                return _InfosDemandes;
            }
        }
        public IActiviteRepository Activite {
            get
            {
                if (_Activite == null)
                    _Activite = new ActiviteRepository(_context);

                return _Activite;
            }
        }
        public IActiviteTargetRepository ActiviteTarget {
            get
            {
                if (_ActiviteTarget == null)
                    _ActiviteTarget = new ActiviteTargetRepository(_context);

                return _ActiviteTarget;
            }
        }
        public IProcessAdminRepository ProcessAdmin {
            get
            {
                if (_ProcessAdmin == null)
                    _ProcessAdmin = new ProcessAdminRepository(_context);

                return _ProcessAdmin;
            }
        }
        public IProcessRepository Process {
            get
            {
                if (_Process == null)
                    _Process = new ProcessRepository(_context);

                return _Process;
            }
        }
        public ITransitionActionsRepository TransitionActions {
            get
            {
                if (_TransitionActions == null)
                    _TransitionActions = new TransitionActionsRepository(_context);

                return _TransitionActions;
            }
        }
        public ITransitionRepository Transition {
            get
            {
                if (_Transition == null)
                    _Transition = new TransitionRepository(_context);

                return _Transition;
            }
        }
        public IEtatActiviteRepository EtatActivite {
            get
            {
                if (_EtatActivite == null)
                    _EtatActivite = new EtatActiviteRepository(_context);

                return _EtatActivite;
            }
        }
        public IEtatRepository Etat {
            get
            {
                if (_Etat == null)
                    _Etat = new EtatRepository(_context);

                return _Etat;
            }
        }
        public IGroupMemberRepository GroupMember {
            get
            {
                if (_GroupMember == null)
                    _GroupMember = new GroupMemberRepository(_context);

                return _GroupMember;
            }
        }
        public IGroupRepository Group {
            get
            {
                if (_Group == null)
                    _Group = new GroupRepository(_context);

                return _Group;
            }
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
