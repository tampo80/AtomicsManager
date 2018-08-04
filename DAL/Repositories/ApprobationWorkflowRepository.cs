using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ApprobationWorkflowRepository : Repository<ApprobationWorkflow>, IApprobationWorkflowRepository
    {
        public ApprobationWorkflowRepository(DbContext context) : base(context)
        {
        }
          


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}