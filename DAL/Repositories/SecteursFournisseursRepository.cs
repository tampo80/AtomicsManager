﻿using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories
{
    public class SecteursFournisseursRepository:Repository<SecteursFournisseurs>, ISecteursFournisseurs
    {
        public SecteursFournisseursRepository(DbContext context) : base(context)
        {
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
