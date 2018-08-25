using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Atomics_Manager.Hubs;
using Atomics_Manager.ViewModels;
using AutoMapper;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Atomics_Manager.Controllers
{
    [Produces("application/json")]
    [Route("api/Demandesutilities")]
    public class DemandesutilitiesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public DemandesutilitiesController(IUnitOfWork unitOfWork, ILogger<DemandesutilitiesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allEntrepriseUserInfos = _unitOfWork.EntrepriseUserInfos.GetAll();
            DataHub dh = new DataHub();
            dh.GetData();
            return Ok(Mapper.Map<IEnumerable<CategoriesViewModel>>(allEntrepriseUserInfos));
        }

    }
}
