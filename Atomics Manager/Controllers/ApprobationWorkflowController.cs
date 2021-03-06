﻿using System;
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

namespace Atomics_Manager.Controllers
{
    [Produces("application/json")]
    [Route("api/ApprobationWorkflow")]
    public class ApprobationWorkflowController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        private readonly IAccountManager _accountManager;
        public ApprobationWorkflowController(IAccountManager accountManager, IUnitOfWork unitOfWork, ILogger<ApprobationWorkflowController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _accountManager = accountManager;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var allApprobationWorkflow = _unitOfWork.ApprobationWorkflow.GetAll();
            return Ok(Mapper.Map<IEnumerable<ApprobationWorkflowViewModel>>(allApprobationWorkflow));
        }

        [HttpGet("{DemandeId}")]
        public IActionResult GetByDemandesId(int DemandeId)
        {
            var allApprobationWorkflow = _unitOfWork.ApprobationWorkflow.GetAllIncluding(u=>u.User).Where(e=>e.DemandesId==DemandeId);
            return Ok(Mapper.Map<IEnumerable<ApprobationWorkflowViewModel>>(allApprobationWorkflow));
        }

        //[HttpGet("Isavailable/{name}")]
        //public IActionResult Isavailable([FromRoute] string name)
        //{
        //    if (name != null)
        //    {
        //        var Res = _unitOfWork.ApprobationWorkflow.Find(e => e.Name.ToUpper() == name.ToUpper());
        //        if (Res.ToList().Count() > 0)
        //        {
        //            return Ok(true);
        //        }

        //    }
        //    else
        //    {
        //        return Ok(false);
        //    }
        //    return Ok(false);
        //}

        // POST api/values

        private ApprobationLevel APL(ApprobationSatut statut,int demandId)
        {
            var workflowState = _unitOfWork.ApprobationWorkflow.GetAllIncluding(e=>e.Level).Where(d=>d.DemandesId==demandId).OrderBy(l=>l.Level.Level);
            ApprobationLevel apl = new ApprobationLevel();
            if (workflowState==null || workflowState.Count()<=0)
            {

                switch (statut)
                {
                    case ApprobationSatut.EXPERTISE:
                        apl = _unitOfWork.ApprobationLevel.GetSingleOrDefault(e => e.TypeApprovalGroup == TypeApprovalGroup.HEADSERVICE);
                        break;
                    case ApprobationSatut.PENDING:
                        apl = _unitOfWork.ApprobationLevel.GetSingleOrDefault(e => e.TypeApprovalGroup == TypeApprovalGroup.HEADSERVICE);

                        break;
                    case ApprobationSatut.REJET:
                        apl = _unitOfWork.ApprobationLevel.GetSingleOrDefault(e => e.TypeApprovalGroup == TypeApprovalGroup.ALLUERS);
                        break;
                    case ApprobationSatut.APPROUVE:
                        apl = _unitOfWork.ApprobationLevel.GetSingleOrDefault(e => e.TypeApprovalGroup == TypeApprovalGroup.SERVICEGENERAUX);
                        break;
                    case ApprobationSatut.OWNREJECT:
                        apl = _unitOfWork.ApprobationLevel.GetSingleOrDefault(e => e.TypeApprovalGroup == TypeApprovalGroup.ALLUERS);
                        break;
                    case ApprobationSatut.DELIVRED:
                        apl = _unitOfWork.ApprobationLevel.GetSingleOrDefault(e => e.TypeApprovalGroup == TypeApprovalGroup.ALLUERS);
                        break;
                    default:
                        break;
                }
               
            }

            return apl;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ApprobationWorkflowViewModel approbationWorkflow)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ApprobationWorkflow _approbationWorkflow = Mapper.Map<ApprobationWorkflow>(approbationWorkflow);
                    _approbationWorkflow.UserId =await getCurrentUserId();
                    //to correct
                  
                    Demandes _demande = _unitOfWork.Demandes.GetSingleOrDefault(e => e.Id == approbationWorkflow.DemandesId);
                   
                    
                    _unitOfWork.ApprobationWorkflow.Add(_approbationWorkflow);
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
            ApplicationUser user = await _accountManager.GetUserByUserNameAsync(User.Identity.Name);
            return user.Id;
        }
        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ApprobationWorkflowViewModel approbationWorkflow)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ApprobationWorkflow _approbationWorkflow = Mapper.Map<ApprobationWorkflow>(approbationWorkflow);
                    _unitOfWork.ApprobationWorkflow.Update(_approbationWorkflow);
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

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ApprobationWorkflow _approbationWorkflow = _unitOfWork.ApprobationWorkflow.GetSingleOrDefault(e => e.Id == id);
                    if (_approbationWorkflow != null)
                    {
                        _unitOfWork.ApprobationWorkflow.Remove(_approbationWorkflow);
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