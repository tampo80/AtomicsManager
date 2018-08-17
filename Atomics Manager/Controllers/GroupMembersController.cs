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
    [Route("api/GroupMembers")]
    public class GroupMembersController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        private readonly IAccountManager _accountManager;
        public GroupMembersController(IAccountManager accountManager, IUnitOfWork unitOfWork, ILogger<GroupMembersController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _accountManager = accountManager;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allAPGmembers = _unitOfWork.GroupMember.GetAll();
            return Ok(Mapper.Map<IEnumerable<GroupMemberViewModel>>(allAPGmembers));
        }


        [HttpGet("{apgLevetId}")]
        public IActionResult GetMemberByAPG(int apgLevetId)
        {
            var allAPGmembers = _unitOfWork.GroupMember.GetAllIncluding(e => e.Group, u => u.User).Where(e => e.GroupId == apgLevetId);
            return Ok(Mapper.Map<IEnumerable<GroupMemberViewModel>>(allAPGmembers));
        }



        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] GPM GPMmembers)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    List<GroupMember> ExistedAPGM = new List<GroupMember>();
                    List<GroupMember> NewdAPGM = new List<GroupMember>();
                    List<GroupMember> ToAdddAPGM = new List<GroupMember>();
                    List<GroupMember> ToDeleteAPGM = new List<GroupMember>();

                    foreach (GroupMemberViewModel apgm in GPMmembers.Members)
                    {
                        NewdAPGM.Add(new GroupMember
                        {
                            Group = _unitOfWork.Group.GetSingleOrDefault(e => e.Id == GPMmembers.Group.Id),
                            User = await _accountManager.GetUserByIdAsync(apgm.UserId)
                        });
                    }
                    ExistedAPGM = _unitOfWork.GroupMember.Find(e => e.GroupId == GPMmembers.Group.Id).ToList();

                    ToDeleteAPGM = ExistedAPGM.Except(NewdAPGM).ToList();
                    ToAdddAPGM = NewdAPGM.Except(ExistedAPGM).ToList();

                    foreach (GroupMember APGM in ToAdddAPGM)
                    {
                        _unitOfWork.GroupMember.Add(APGM);
                    }
                    await _unitOfWork.SaveChangesAsync();
                    _unitOfWork.GroupMember.RemoveRange(ToDeleteAPGM);
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
        public async Task<IActionResult> Put(int id, [FromBody] GroupMemberViewModel APGmembers)
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