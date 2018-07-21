import { NavigationGroup } from "../domain/navigation-group";


// TODO: Split by modules

export const NAVIGATION_MENU_DATA: NavigationGroup[] = [{
    icon: "pie_chart",
    name: "Dashboards",
    items: [{
        routerLink: "dashboard",
        name: "Overview"
    }, {
        routerLink: "under-construction",
        name: "Summary"
    }],
    permissions:[
        {
            name:"dashboard.view",
            value:true
        }
    ]





}, {
    icon: "shopping_cart",
    name: "Mes demandes",
    items: [
        {
        routerLink: "under-construction",
        name: "Initier une démande"
        },
        {
            routerLink: "under-construction",
            name: "Démandes initiées"
        },
        {
            routerLink: "under-construction",
            name: "Demande reçus"
        }



],
permissions:[
    {
        name:"demandes.view",
        value:true
    }
]
}, {
    icon: "accessibility_new",
    name: "Admin",
    items: [

        {
            routerLink: "manage-users",
            name: "Utilisateurs"
        },
        {
            routerLink: "manage-roles",
            name: "Les roles"
        },
        {
            routerLink: "under-construction",
            name: "Les Profils"
        },
        {
            routerLink: "manage-entreprise",
            name: "Société"
        },
        {
          routerLink: "manage-roles",
          name: "Les roles"
      },
      {
          routerLink: "under-construction",
          name: "Les Profils"
      },
      {
          routerLink: "manage-entreprise",
          name: "Société"
      }
],
permissions:[
    {
        name:"admin.view",
        value:false
    }
]
}, ,
{
    icon: "local_shipping",
    name: "Fournisseurs",
    items: [{
        routerLink: "manage-fournisseurs",
        name: "Les fournisseurs"
    }, {
        routerLink: "manage-secteurs",
        name: "Secteurs d'activités"
    }],
    permissions:[
        {
            name:"audit.view",
            value:false
        }
    ]
},

{
    icon: "show_chart",
    name: "Repportings",
    items: [{
        routerLink: "under-construction",
        name: "Statistique des démandes"
    }, {
        routerLink: "under-construction",
        name: "les graphiques"
    }],
    permissions:[
        {
            name:"repportings.view",
            value:true
        }
    ]

}, {
    icon: "build",
    name: "Paramètres",
    items: [
            {
                routerLink: "manage-pays",
                name: "Pays"
            },
            {
                routerLink: "manage-villes",
                name: "villes"
            },
            {
                routerLink: "under-construction",
                name: "Agences/points"
            },
            {
                routerLink: "under-construction",
                name: "Services"
            }



],
    permissions:[
        {
            name:"paramètres.view",
            value:false
        }
    ]
}, {
    icon: "perm_data_setting",
    name: "Maintenenace",
    items: [{
        routerLink: "under-construction",
        name: "Archivage"
    }, {
        routerLink: "under-construction",
        name: "Restauration"
    }, {
        routerLink: "manage-devises",
        name: "Devises"
    }],
    permissions:[
        {
            name:"maintenenace.view",
            value:false
        }
    ]
}, {
    icon: "storage",
    name: "Audit",
    items: [{
        routerLink: "under-construction",
        name: "Logs"
    }, {
        routerLink: "under-construction",
        name: "Requèttes"
    }],
    permissions:[
        {
            name:"audit.view",
            value:false
        }
    ]
},




];


