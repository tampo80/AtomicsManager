import { NavigationGroup } from '../domain/navigation-group';


// TODO: Split by modules

export const NAVIGATION_MENU_DATA: NavigationGroup[] = [{
    icon: 'pie_chart',
    name: 'Dashboards',
    items: [{
        routerLink: 'dashboard',
        name: 'Overview'
    }, {
        routerLink: 'under-construction',
        name: 'Summary'
    }],
    permissions: [
        {
            name: 'dashboard.view',
            value: true
        }
    ]





}, {
    icon: 'shopping_cart',
    name: 'Mes demandes',
    items: [
        {
        routerLink: 'manage-demande-catalogues',
        name: 'Initier une demande'
        },
        {
            routerLink: 'manage-mesdemandes',
            name: 'Demandes initiées'
        },
        {
            routerLink: 'manage-demandesin',
            name: 'Demandes reçus'
        }



],
permissions: [
    {
        name: 'demandes.view',
        value: true
    }
]
}, {
    icon: 'accessibility_new',
    name: 'Admin',
    items: [

        {
            routerLink: 'manage-users',
            name: 'Utilisateurs'
        },
        {
            routerLink: 'manage-roles',
            name: 'Les roles'
        },
        {
            routerLink: 'manage-approuval-level',
            name: 'Les niveaux d\'approbation'
        },


        {
          routerLink: 'manage-approuval-group',
          name: 'Workflow des demandes'
      },
      {
          routerLink: 'manage-entreprise',
          name: 'Société'
      },

],
permissions: [
    {
        name: 'admin.view',
        value: false
    }
]
}
 ,
 {
  icon: 'share',
  name: 'Workflox admin',
  items: [


    {
      routerLink: 'workflow-transition',
      name: 'Les transition'
  },

  {
    routerLink: 'workflow-graph',
    name: 'Le workflow'
},

],
permissions: [
  {
      name: 'admin.view',
      value: false
  }
]
},
{
  icon: 'view_headline',
  name: 'Workflox config',
  items: [

      {
          routerLink: 'workflow-process',
          name: 'Processus'
      },
      {
          routerLink: 'workflow-group',
          name: 'Les groupes'
      },
      {
          routerLink: 'workflow-etat',
          name: 'Les etats'
      },


      {
        routerLink: 'workflow-actions',
        name: 'Les actions'
    },
    {
        routerLink: 'workflow-activites',
        name: 'Les activités'
    },


],
permissions: [
  {
      name: 'admin.view',
      value: false
  }
]
}
,
{
    icon: 'local_shipping',
    name: 'Fournisseurs',
    items: [
      {
        routerLink: 'manage-fournisseurs',
        name: 'Les fournisseurs'
      },
     {
        routerLink: 'manage-secteurs',
        name: 'Secteurs d\'activités'
     },
     {
      routerLink: 'manage-categories',
      name: 'Les catégories'
    },
   {
      routerLink: 'manage-catalogues',
      name: 'Le catalogue'
   }
  ],
    permissions: [
        {
            name: 'audit.view',
            value: false
        }
    ]
},

{
    icon: 'show_chart',
    name: 'Repportings',
    items: [{
        routerLink: 'under-construction',
        name: 'Statistique des demandes'
    }, {
        routerLink: 'under-construction',
        name: 'les graphiques'
    }],
    permissions: [
        {
            name: 'repportings.view',
            value: true
        }
    ]

}, {
    icon: 'build',
    name: 'Paramètres',
    items: [
            {
                routerLink: 'manage-pays',
                name: 'Pays'
            },
            {
                routerLink: 'manage-villes',
                name: 'villes'
            },
            {
              routerLink: 'manage-departements',
              name: 'Départmements'
           },
            {
                routerLink: 'manage-agences',
                name: 'Agences/points'
            },
            {
                routerLink: 'manage-services',
                name: 'Services'
            }



],
    permissions: [
        {
            name: 'paramètres.view',
            value: false
        }
    ]
}, {
    icon: 'perm_data_setting',
    name: 'Maintenenace',
    items: [{
        routerLink: 'under-construction',
        name: 'Archivage'
    }, {
        routerLink: 'under-construction',
        name: 'Restauration'
    }, {
        routerLink: 'manage-devises',
        name: 'Devises'
    }],
    permissions: [
        {
            name: 'maintenenace.view',
            value: false
        }
    ]
}, {
  icon: 'monetization_on',
  name: 'Comptailité',
  items: [{
      routerLink: 'under-construction',
      name: 'Journal'
  },
  {
    routerLink: 'compta-comptes-facturation',
    name: 'Factures'
},
{
  routerLink: 'compta-comptes-internes',
  name: 'Comptes internes'
},

  {
      routerLink: 'compta-type-comptes',
      name: 'Types de comptes'
  }, {
      routerLink: 'manage-devises',
      name: 'Paramètres'
  }],
  permissions: [
      {
          name: 'maintenenace.view',
          value: false
      }
  ]
}, {
    icon: 'storage',
    name: 'Audit',
    items: [{
        routerLink: 'under-construction',
        name: 'Logs'
    }, {
        routerLink: 'under-construction',
        name: 'Requèttes'
    }],
    permissions: [
        {
            name: 'audit.view',
            value: false
        }
    ]
},




];


