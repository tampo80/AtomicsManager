﻿using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
    public class SecteursRepository : Repository<Secteurs>, ISecteursRepository
    {
        public SecteursRepository(DbContext context) : base(context)
        {
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
