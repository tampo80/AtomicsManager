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

namespace Atomics_Manager.Controllers
{
    [Produces("application/json")]
    [Route("api/ApgMembers")]
    public class ApgMembersController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        private readonly IAccountManager _accountManager;
        public ApgMembersController(IAccountManager accountManager,IUnitOfWork unitOfWork, ILogger<ApgMembersController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _accountManager=accountManager;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allAPGmembers = _unitOfWork.APGmembers.GetAll();
            return Ok(Mapper.Map<IEnumerable<APGmembersViewModel>>(allAPGmembers));
        }


        [HttpGet("{apgLevetId}")]
        public IActionResult GetMemberByAPG(int apgLevetId)
        {
            var allAPGmembers = _unitOfWork.APGmembers.GetAllIncluding(e=>e.ApprobationLevel,u=>u.Member).Where(e=>e.ApprobationLevelId==apgLevetId);
            return Ok(Mapper.Map<IEnumerable<APGmembersViewModel>>(allAPGmembers));
        }



        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] APGM APGmembers)
        {
            if (ModelState.IsValid)
            {
                try
                {
                   List<APGmembers>ExistedAPGM=new List<APGmembers>();
                   List<APGmembers>NewdAPGM=new List<APGmembers>();
                   List<APGmembers>ToAdddAPGM=new List<APGmembers>();
                   List<APGmembers>ToDeleteAPGM=new List<APGmembers>();
                   foreach (APGmembersViewModel apgm in APGmembers.members)
                   {
                       NewdAPGM.Add(new APGmembers{
                           ApprobationLevel=_unitOfWork.ApprobationLevel.GetSingleOrDefault(e=>e.Id==APGmembers.Level.Id),
                           Member=await _accountManager.GetUserByIdAsync(apgm.MemberId)
                       });
                   }
                   ExistedAPGM=_unitOfWork.APGmembers.Find(e=>e.ApprobationLevelId==APGmembers.Level.Id).ToList();

                   ToDeleteAPGM=ExistedAPGM.Except(NewdAPGM).ToList();
                   ToAdddAPGM=NewdAPGM.Except(ExistedAPGM).ToList();

                   foreach (APGmembers APGM in ToAdddAPGM)
                   {
                       _unitOfWork.APGmembers.Add(APGM);
                   }
                    await _unitOfWork.SaveChangesAsync();
                   _unitOfWork.APGmembers.RemoveRange(ToDeleteAPGM);
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
        public async Task<IActionResult> Put(int id, [FromBody] APGmembersViewModel APGmembers)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    APGmembers _APGmembers = Mapper.Map<APGmembers>(APGmembers);
                    _unitOfWork.APGmembers.Update(_APGmembers);
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
                    APGmembers _APGmembers = _unitOfWork.APGmembers.GetSingleOrDefault(e => e.Id == id);
                    if (_APGmembers != null)
                    {
                        _unitOfWork.APGmembers.Remove(_APGmembers);
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