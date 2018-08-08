using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Atomics_Manager.ViewModels;
using AutoMapper;
using DAL;
using DAL.Core.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
namespace Atomics_Manager.Controllers
{
    [Produces("application/json")]
    [Route("api/Demandes")]
    public class DemandesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
         private readonly IAccountManager _accountManager;
        public DemandesController(IAccountManager accountManager,IUnitOfWork unitOfWork, ILogger<DemandesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _accountManager=accountManager;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (User.Identity.Name==null)
            {
               return Unauthorized();
            }
            string usersId =await getCurrentUserId();
            var allDemandes = _unitOfWork.Demandes.GetAllIncluding(e=>e.Product,f=>f.user).Where(e=>e.userId==usersId);
            return Ok(Mapper.Map<IEnumerable<DemandesViewModel>>(allDemandes));
        }


       [HttpGet("in")]
       public async Task<IActionResult> GetIn()
        {
            if (User.Identity.Name == null)
            {
                return Unauthorized();
            }
            string usersId = await getCurrentUserId();
            var WORKFLOW=await _unitOfWork.ApprobationLevel.GetAllAsyn();
            WORKFLOW=WORKFLOW.OrderBy(e=>e.Level).ToList();

            List<Demandes> DemandesIn=new List<Demandes>();
            foreach (var level in WORKFLOW)
            {
                switch (level.TypeApprovalGroup)
                {
                    case TypeApprovalGroup.HEADSERVICE:
                        if (IsHeadService(usersId))
                        {

                            DemandesIn = DemandesIn.Union(_unitOfWork.Demandes.GetAllIncluding(e => e.Product, f => f.user)).Where(e => e.Statut == ApprobationSatut.PENDING).ToList();

                        }
                        break;
                    case TypeApprovalGroup.HEADDEPARTEMENT:
                        break;
                    case TypeApprovalGroup.GENERIQUE:
                        break;
                    case TypeApprovalGroup.SERVICEGENERAUX:
                        break;
                    case TypeApprovalGroup.CONTROLFINANCIER:
                        break;
                    case TypeApprovalGroup.EXPERTS:
                        break;
                    default:
                        break;
                }
                
            
            }
            

            
            return Ok(Mapper.Map<IEnumerable<DemandesViewModel>>(DemandesIn).Select(a=>{
                
                a.ServiceName=getUserService(a.userId);
                a.AgenceName=getUserAgence(a.userId);
                return a;
            }));
        }
       
       [HttpGet("level")]
       public async Task<IActionResult> BuildWorkFlow()
       {
              var WORKFLOW=await _unitOfWork.ApprobationLevel.GetAllAsyn();
              return Ok(WORKFLOW.ToList().OrderBy(e=>e.Level));
       }


        public string getUserService(string userid)
        {
          var entrepriseUserInfos=_unitOfWork.EntrepriseUserInfos.GetSingleOrDefault(e=>e.ApplicationUserId==userid);
          string ServiceName=string.Empty;
          if (entrepriseUserInfos!=null)
          {
              ServiceName=entrepriseUserInfos.Services.Name;
          }

          return ServiceName;
        }

         public string getUserAgence(string userid)
         {
          var entrepriseUserInfos=_unitOfWork.EntrepriseUserInfos.GetSingleOrDefault(e=>e.ApplicationUserId==userid);
          string AgenceName=string.Empty;
          if (entrepriseUserInfos!=null)
          {
                AgenceName = _unitOfWork.Agences.GetSingleOrDefault(e=>e.Id==entrepriseUserInfos.AgencesId).Name;
          }

          return AgenceName;
        }
        public EntrepriseUserInfos getUserInfos(string usersId)
        {

            return _unitOfWork.EntrepriseUserInfos.GetSingleOrDefault(e => e.ApplicationUserId == usersId);
        }

        public bool IsHeadService(string UserId)
        {
            int serviceId = _unitOfWork.EntrepriseUserInfos.GetSingleOrDefault(e=>e.ApplicationUserId==UserId).ServicesId;

            var service = _unitOfWork.Services.GetSingleOrDefault(e => e.Id == serviceId);

            if (service!=null)

            {
                if (service.Head!=null)
                {
                    string headId = service.Head.Id;
                    if (headId != string.Empty)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
                
            }
            else
            {
                return false;
            }

           

        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DemandesViewModel demandes)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Demandes _demandes = Mapper.Map<Demandes>(demandes);
                    Product _product=_unitOfWork.Products.GetSingleOrDefault(e=>e.Id==demandes.ProductId);
                    ApplicationUser user=await _accountManager.GetUserByIdAsync(_demandes.userId);
                    _demandes.Product=_product;
                    _demandes.Statut=ApprobationSatut.PENDING;
                    
                    _unitOfWork.Demandes.Add(_demandes);
                    await _unitOfWork.SaveChangesAsync();
                    return Ok("OK");

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Data);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] DemandesViewModel demandes)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Demandes _demandes = Mapper.Map<Demandes>(demandes);
                    _unitOfWork.Demandes.Update(_demandes);
                    await _unitOfWork.SaveChangesAsync();
                    return Ok("OK");

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Data);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        private async Task<string> getCurrentUserId()
        {
            ApplicationUser user=await _accountManager.GetUserByUserNameAsync(User.Identity.Name);
            return user.Id;
        }
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Demandes _demandes = _unitOfWork.Demandes.GetSingleOrDefault(e => e.Id == id);
                    if (_demandes != null)
                    {
                        _unitOfWork.Demandes.Remove(_demandes);
                        await _unitOfWork.SaveChangesAsync();
                        return Ok("OK");
                    }
                    else
                    {
                        return BadRequest();
                    }

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Data);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}