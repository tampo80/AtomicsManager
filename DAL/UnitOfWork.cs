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
