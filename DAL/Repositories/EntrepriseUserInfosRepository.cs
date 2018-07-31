using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class EntrepriseUserInfosRepository : Repository<EntrepriseUserInfos>, IEntrepriseUserInfosRepository
    {
        public EntrepriseUserInfosRepository(DbContext context) : base(context)
        {
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
   }
 }