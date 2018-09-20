// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using DAL.Models.Interfaces;

namespace DAL
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public string CurrentUserId { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Demandes> Demandes { get; set; }

        public DbSet<Pays> Pays { get; set; }
        public DbSet<Fournisseurs> Fournisseurs { get; set; }
        public DbSet<Devises> Devises { get; set; }
        public DbSet<BankInfos> BankInfos { get; set; }
        public DbSet<Secteurs> Secteurs { get; set; }

        public DbSet<Villes> Villes { get; set; }

        public DbSet<SecteursFournisseurs> SecteursFournisseurs { get; set; }
        public DbSet<DocumentsFournisseurs> DocumentsFournisseurs { get; set; }

        public DbSet<Entreprise> Entreprise { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<Departements> Departements { get; set; }
        public DbSet<Agences> Agences { get; set; }

        public DbSet<ApprobationLevel> ApprobationLevel { get; set; }
        public DbSet<APGmembers> APGmembers { get; set; }

        public DbSet<EntrepriseUserInfos> EntrepriseUserInfos { get; set; }


        public DbSet<ApprobationWorkflow> ApprobationWorkflow { get; set; }

        public DbSet<Process> Process { get; set; }
        public DbSet<ProcessAdmin> ProcessAdmins { get; set; }


        public DbSet<FichierDemandes> FichierDemandes { get; set; }

        public DbSet<InfosDemandes> InfosDemandes { get; set; }
        public DbSet<Stakeholders> Stakeholders { get; set; }

        public DbSet<Etat> Etats { get; set; }
        public DbSet<Activite> Activite { get; set; }
        public DbSet<Transition> Transition { get; set; }
        public DbSet<Actions> Actions { get; set; }

        public DbSet<TransitionActions> TransitionActions { get; set; }
        public DbSet<TransitionActivite> TransitionActivite { get; set; }

        public DbSet<EtatActivite> EtatActivite { get; set; }

        public DbSet<Group> Group { get; set; }
        public DbSet<GroupMember> GroupeMember { get; set; }

        public DbSet<ActionTarget> ActionTarget { get; set; }
        public DbSet<ActiviteTarget> ActiviteTargets { get; set; }
        public DbSet<DemandesAction> DemandesAction { get; set; }
        public DbSet<ActionsHistories> ActionsHistories { get; set; }
        public DbSet<TypeComptes> TypeComptes { get; set; }
        public DbSet<ComptesInternes> ComptesInternes { get; set; }

        public DbSet<Factures> Factures { get; set; }
        public DbSet<Reglements> Reglements { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);


            builder.Entity<ApplicationUser>().HasOne(e => e.EntrepriseUserInfos)
                                             .WithOne(a => a.ApplicationUser)
                                             .HasForeignKey<EntrepriseUserInfos>(a => a.ApplicationUserId);

            // builder.Entity<Departements>().HasOne(e => e.Head)
            //                                 .WithMany(a => a.Departements)
            //                                 .HasForeignKey<EntrepriseUserInfos>(a => a.DepartementsId);


            builder.Entity<Customer>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Customer>().HasIndex(c => c.Name);
            builder.Entity<Customer>().Property(c => c.Email).HasMaxLength(100);
            builder.Entity<Customer>().Property(c => c.PhoneNumber).IsUnicode(false).HasMaxLength(30);
            builder.Entity<Customer>().Property(c => c.City).HasMaxLength(50);
            builder.Entity<Customer>().ToTable($"App{nameof(this.Customers)}");

            builder.Entity<ProductCategory>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<ProductCategory>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<ProductCategory>().ToTable($"App{nameof(this.ProductCategories)}");

            builder.Entity<Product>().Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Product>().HasIndex(p => p.Name);
            builder.Entity<Product>().Property(p => p.Description).HasMaxLength(500);
            builder.Entity<Product>().Property(p => p.Icon).IsUnicode(false).HasMaxLength(256);
           
            builder.Entity<Product>().ToTable($"App{nameof(this.Products)}");

            builder.Entity<Order>().Property(o => o.Comments).HasMaxLength(500);

            builder.Entity<Order>().ToTable($"App{nameof(this.Orders)}");

            builder.Entity<OrderDetail>().ToTable($"App{nameof(this.OrderDetails)}");

            //pays
            builder.Entity<Pays>().HasKey(p => p.Id);
            builder.Entity<Pays>().HasIndex(p=>p.Name);
            builder.Entity<Pays>().HasMany(p => p.Villes);

            builder.Entity<Pays>().ToTable($"App{nameof(this.Pays)}");

            builder.Entity<ActionsHistories>().ToTable($"App{nameof(this.ActionsHistories)}");

            //villes
            builder.Entity<Villes>().HasKey(p => p.Id);
            builder.Entity<Villes>().HasOne(p => p.Pays);
            builder.Entity<Villes>().HasIndex(p => p.Name);
            builder.Entity<Villes>().ToTable($"App{nameof(this.Villes)}");

            //baninfos

            builder.Entity<BankInfos>().HasIndex(p => p.BankName);
            builder.Entity<BankInfos>().ToTable($"App{nameof(this.BankInfos)}");

          
            builder.Entity<Devises>().HasIndex(p => p.Label);

            builder.Entity<Devises>().ToTable($"App{nameof(this.Devises)}");

           

            builder.Entity<Factures>().ToTable($"App{nameof(this.Factures)}");
            builder.Entity<Reglements>().ToTable($"App{nameof(this.Reglements)}");


            builder.Entity<Secteurs>().HasIndex(p => p.Name);

            builder.Entity<Secteurs>().ToTable($"App{nameof(this.Secteurs)}");

            builder.Entity<Fournisseurs>().HasIndex(p => p.Titre);
            builder.Entity<Fournisseurs>().HasOne(e=>e.BankInfos)
                                          .WithOne(e=>e.Fournisseurs)
                                          .HasForeignKey<BankInfos>(bf=>bf.FournisseursId);

            builder.Entity<Fournisseurs>().ToTable($"App{nameof(this.Fournisseurs)}");

            builder.Entity<SecteursFournisseurs>().HasKey(sf => new {sf.FournisseursId,sf.SecteursId });
            builder.Entity<SecteursFournisseurs>().HasOne(sf => sf.Fournisseurs)
                                                  .WithMany(f => f.SecteursFournisseurs)
                                                  .HasForeignKey(sf => sf.FournisseursId);

            builder.Entity<SecteursFournisseurs>().HasOne(sf => sf.Secteurs)
                                                 .WithMany(f => f.SecteursFournisseurs)
                                                 .HasForeignKey(sf => sf.SecteursId);

            //process admin link

            builder.Entity<ProcessAdmin>().HasKey(sf => new { sf.ProcessId, sf.UserId });
            builder.Entity<ProcessAdmin>().HasOne(pa => pa.Process)
                                          .WithMany(p => p.ProcessAdmin)
                                          .HasForeignKey(pa => pa.ProcessId);
            builder.Entity<ProcessAdmin>().HasOne(u => u.User)
                                         .WithMany(p => p.ProcessAdmin)
                                         .HasForeignKey(u => u.UserId);


            builder.Entity<ProcessAdmin>().ToTable($"Work{nameof(this.ProcessAdmins)}");


            builder.Entity<Stakeholders>().HasKey(sf => new { sf.DemandesId, sf.UserId });
            builder.Entity<Stakeholders>().HasOne(d => d.Demandes)
                                        .WithMany(s => s.Stakeholders)
                                        .HasForeignKey(pa => pa.DemandesId);


            builder.Entity<Stakeholders>().HasOne(u => u.User)
                                         .WithMany(p => p.Stakeholders)
                                         .HasForeignKey(u => u.UserId);



            builder.Entity<Stakeholders>().ToTable($"Work{nameof(this.Stakeholders)}");



            builder.Entity<TransitionActions>().HasKey(sf => new { sf.ActionsId, sf.TransitionId });
            builder.Entity<TransitionActions>().HasOne(d => d.Actions)
                                      .WithMany(s => s.TransitionActions)
                                      .HasForeignKey(pa => pa.ActionsId);


            builder.Entity<TransitionActions>().HasOne(u => u.Transition)
                                         .WithMany(p => p.TransitionActions)
                                         .HasForeignKey(u => u.TransitionId);



            builder.Entity<TransitionActions>().ToTable($"Work{nameof(this.TransitionActions)}");



            builder.Entity<TransitionActivite>().HasKey(sf => new { sf.ActiviteId, sf.TransitionId });
            builder.Entity<TransitionActivite>().HasOne(d => d.Activite)
                                      .WithMany(s => s.TransitionActivite)
                                      .HasForeignKey(pa => pa.ActiviteId);


            builder.Entity<TransitionActivite>().HasOne(u => u.Transition)
                                         .WithMany(p => p.TransitionActivite)
                                         .HasForeignKey(u => u.TransitionId);



            builder.Entity<TransitionActivite>().ToTable($"Work{nameof(this.TransitionActivite)}");



            builder.Entity<EtatActivite>().HasKey(sf => new { sf.ActiviteId, sf.EtatId });
            builder.Entity<EtatActivite>().HasOne(d => d.Etat)
                                    .WithMany(s => s.EtatActivite)
                                    .HasForeignKey(pa => pa.EtatId);


            builder.Entity<EtatActivite>().HasOne(u => u.Activite)
                                         .WithMany(p => p.EtatActivite)
                                         .HasForeignKey(u => u.ActiviteId);



            builder.Entity<EtatActivite>().ToTable($"Work{nameof(this.EtatActivite)}");

            builder.Entity<Group>().ToTable($"Work{nameof(this.Group)}");

            builder.Entity<GroupMember>().ToTable($"Work{nameof(this.GroupeMember)}");

            builder.Entity<Process>().ToTable($"Work{nameof(this.Process)}");

            builder.Entity<FichierDemandes>().ToTable($"Work{nameof(this.FichierDemandes)}");

            builder.Entity<InfosDemandes>().ToTable($"Work{nameof(this.InfosDemandes)}");

            builder.Entity<Etat>().ToTable($"Work{nameof(this.Etats)}");

            builder.Entity<Transition>().ToTable($"Work{nameof(this.Transition)}");


            builder.Entity<Actions>().ToTable($"Work{nameof(this.Actions)}");

            builder.Entity<Activite>().ToTable($"Work{nameof(this.Activite)}");

            builder.Entity<ActionTarget>().HasOne(e=>e.Group)
                                           ;

            builder.Entity<ActionTarget>().ToTable($"Work{nameof(this.ActionTarget)}");

            builder.Entity<ActiviteTarget>().ToTable($"Work{nameof(this.ActiviteTargets)}");

            builder.Entity<DemandesAction>().ToTable($"Work{nameof(this.DemandesAction)}");




            builder.Entity<SecteursFournisseurs>().ToTable($"App{nameof(this.SecteursFournisseurs)}");

            builder.Entity<DocumentsFournisseurs>().ToTable($"App{nameof(this.DocumentsFournisseurs)}");

            builder.Entity<Entreprise>().ToTable($"App{nameof(this.Entreprise)}");



            builder.Entity<Agences>().ToTable($"App{nameof(this.Agences)}");



            builder.Entity<Services>().ToTable($"App{nameof(this.Services)}");


            builder.Entity<Departements>().ToTable($"App{nameof(this.Departements)}");


            builder.Entity<APGmembers>().ToTable($"App{nameof(this.APGmembers)}");


            builder.Entity<ApprobationLevel>().ToTable($"App{nameof(this.ApprobationLevel)}");

            builder.Entity<Demandes>().ToTable($"App{nameof(this.Demandes)}");

            builder.Entity<EntrepriseUserInfos>().ToTable($"App{nameof(this.EntrepriseUserInfos)}");

            builder.Entity<ApprobationWorkflow>().ToTable($"App{nameof(this.ApprobationWorkflow)}");

            builder.Entity<TypeComptes>().ToTable($"App{nameof(this.TypeComptes)}");

            builder.Entity<ComptesInternes>().ToTable($"App{nameof(this.ComptesInternes)}");

        }




        public override int SaveChanges()
        {
            UpdateAuditEntities();
            return base.SaveChanges();
        }


        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }


        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }


        private void UpdateAuditEntities()
        {
            var modifiedEntries = ChangeTracker.Entries()
                .Where(x => x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));


            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;
                DateTime now = DateTime.UtcNow;

                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = CurrentUserId;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = CurrentUserId;
            }
        }
    }
}
