  // ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Core;
using DAL.Models;
using Microsoft.AspNetCore.Identity;

namespace Atomics_Manager.ViewModels {
    public class AutoMapperProfile : Profile {
        public AutoMapperProfile () {
            CreateMap<ApplicationUser, UserViewModel> ()
                .ForMember (d => d.Roles, map => map.Ignore ());
            CreateMap<UserViewModel, ApplicationUser> ()
                .ForMember (d => d.Roles, map => map.Ignore ());

            CreateMap<ApplicationUser, UserEditViewModel> ()
                .ForMember (d => d.Roles, map => map.Ignore ());
            CreateMap<UserEditViewModel, ApplicationUser> ()
                .ForMember (d => d.Roles, map => map.Ignore ());

            CreateMap<ApplicationUser, UserPatchViewModel> ()
                .ReverseMap ();

            CreateMap<ApplicationRole, RoleViewModel> ()
                .ForMember (d => d.Permissions, map => map.MapFrom (s => s.Claims))
                .ForMember (d => d.UsersCount, map => map.ResolveUsing (s => s.Users?.Count ?? 0))
                .ReverseMap ();
            CreateMap<RoleViewModel, ApplicationRole> ();

            CreateMap<IdentityRoleClaim<string>, ClaimViewModel> ()
                .ForMember (d => d.Type, map => map.MapFrom (s => s.ClaimType))
                .ForMember (d => d.Value, map => map.MapFrom (s => s.ClaimValue))
                .ReverseMap ();

            CreateMap<ApplicationPermission, PermissionViewModel> ()
                .ReverseMap ();

            CreateMap<IdentityRoleClaim<string>, PermissionViewModel> ()
                .ConvertUsing (s => Mapper.Map<PermissionViewModel> (ApplicationPermissions.GetPermissionByValue (s.ClaimValue)));

            CreateMap<Customer, CustomerViewModel> ()
                .ReverseMap ();

            CreateMap<Product, ProductViewModel> ()
                .ReverseMap ();

            CreateMap<Order, OrderViewModel> ()
                .ReverseMap ();

            CreateMap<Pays, PaysViewModel> ()
                .ForMember (d => d.Villes, map => map.Ignore ())
                .ReverseMap ();

            CreateMap<Villes, VillesViewModel> ()

                .ReverseMap ();

            CreateMap<Devises, DevisesViewModel> ()

                .ReverseMap ();

            CreateMap<Secteurs, SecteursViewModel> ()

                .ReverseMap ();

            CreateMap<Fournisseurs, EditFournisseurViewModel> ()

                .ReverseMap ();

            CreateMap<Fournisseurs, EditFournisseursViewModel> ()
                .ForMember (f => f.Contract, map => map.Ignore ());

            CreateMap<Fournisseurs, FournisseursViewModel> ()
                .ForMember (f => f.Secteurs, map => map.Ignore ())

                .ReverseMap ();
            CreateMap<Entreprise, EntrepriseViewModel> ()
            
                .ReverseMap ();
            CreateMap<Entreprise, EditEntrepriseViewModel>()
               
                .ReverseMap();

            CreateMap<Departements, DepartementsViewModel>()

              .ReverseMap();

             
            CreateMap<Agences, AgencesViewModel>()

              .ReverseMap();

            CreateMap<Services, ServicesViewModel>()

              .ReverseMap();

             CreateMap<ProductCategory, CategoriesViewModel>()

              .ReverseMap();


            CreateMap<Product, ProductViewModel>()

              .ReverseMap();

             CreateMap<EntrepriseUserInfos, EntrepriseUserInfosViewModel>()

              .ReverseMap();

            CreateMap<ApprobationLevel, ApprobationLevelViewModel>()

              .ReverseMap();

            CreateMap<Demandes, DemandesViewModel>()

            .ReverseMap();


            CreateMap<ApprobationWorkflow, ApprobationWorkflowViewModel>()

            .ReverseMap();

            CreateMap<Process, ProcessViewModel>()

           .ReverseMap();

            CreateMap<Group, GroupViewModel>()

           .ReverseMap();

            CreateMap<Etat, EtatViewModel>()

           .ReverseMap();

            CreateMap<Actions, ActionsViewModel>()

           .ReverseMap();

            CreateMap<Activite, ActiviteViewModel>()

            .ReverseMap();

            CreateMap<Transition, TransitionActions>()

            .ReverseMap();

            CreateMap<ActiviteTarget, ActiviteTargetViewModel>()

            .ReverseMap();

            CreateMap<ActionTarget, ActionTargetViewModel>()

           .ReverseMap();


            CreateMap<ActionsHistories, ActionsHistoriesViewModel>()

           .ReverseMap();

            CreateMap<TransitionActions, TransitionActionsViewModel>()

          .ReverseMap();
            CreateMap<TypeComptes, TypeComptesViewModel>()

         .ReverseMap();
            CreateMap<ComptesInternes, ComptesInternesViewModel>()

         .ReverseMap();

            CreateMap<Factures, FacturesViewModel>()

        .ReverseMap();

        CreateMap<Reglements, ReglementsViewModel>()

        .ReverseMap();

        CreateMap<BonDeCommande, BonDeCommandeViewModel>()

        .ReverseMap();

        }
    }
}