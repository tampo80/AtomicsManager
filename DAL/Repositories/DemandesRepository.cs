using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DAL.Repositories
{
    public class DemandesRepository : Repository<Demandes>, IDemandesRepository
    {
        public DemandesRepository(ApplicationDbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

        public IEnumerable<Demandes> GetAllDemandesData()
        {
            return _appContext.Demandes.ToList();
        }
    }
}
