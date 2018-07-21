using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class EntrepriseRepository: Repository<Entreprise>, IEntrepriseRepository
    {
        public EntrepriseRepository(DbContext context) : base(context)
        {
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
   }
 }