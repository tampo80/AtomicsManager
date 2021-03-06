﻿using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ProcessRepository : Repository<Process>, IProcessRepository
    {
        public ProcessRepository(DbContext context) : base(context)
        {
        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
