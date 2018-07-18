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

       

        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<ApplicationUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApplicationRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<ApplicationRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired().OnDelete(DeleteBehavior.Cascade);

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
            builder.Entity<Product>().HasOne(p => p.Parent).WithMany(p => p.Children).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Product>().ToTable($"App{nameof(this.Products)}");

            builder.Entity<Order>().Property(o => o.Comments).HasMaxLength(500);

            builder.Entity<Order>().ToTable($"App{nameof(this.Orders)}");

            builder.Entity<OrderDetail>().ToTable($"App{nameof(this.OrderDetails)}");

            //pays
            builder.Entity<Pays>().HasKey(p => p.Id);
            builder.Entity<Pays>().HasIndex(p=>p.Name);
            builder.Entity<Pays>().HasMany(p => p.Villes);

            builder.Entity<Pays>().ToTable($"App{nameof(this.Pays)}");

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

            builder.Entity<SecteursFournisseurs>().ToTable($"App{nameof(this.SecteursFournisseurs)}");

            builder.Entity<DocumentsFournisseurs>().ToTable($"App{nameof(this.DocumentsFournisseurs)}");
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
