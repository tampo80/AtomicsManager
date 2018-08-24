using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Atomics_Manager.ViewModels;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Atomics_Manager.Controllers
{
    [Produces("application/json")]
    [Route("api/ActionTarget")]
    public class ActionTargetController : Controller
    {
        // GET: api/ActionTarget
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public ActionTargetController(IUnitOfWork unitOfWork, ILogger<ActionTargetController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allActionTarget = _unitOfWork.ActionTarget.GetAll();
            return Ok(Mapper.Map<IEnumerable<ActionTargetViewModel>>(allActionTarget));
        }

        [HttpGet("{actionId}")]
        public IActionResult Get(int actionId)
        {
            var allActionTarget = _unitOfWork.ActionTarget.GetAllIncluding(e => e.Actions,j=>j.Group).SingleOrDefault(e=>e.ActionsId==actionId);
            return Ok(Mapper.Map<ActionTargetViewModel>(allActionTarget));
        }


        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ActionTargetViewModel actionTarget)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ActionTarget _actionTarget = new ActionTarget();
                    _actionTarget.Actions = _unitOfWork.Actions.GetSingleOrDefault(e => e.Id == actionTarget.ActionsId);
                    _unitOfWork.ActionTarget.Add(_actionTarget);
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
        public async Task<IActionResult> Put(int id, [FromBody] ActionTargetViewModel actionTarget)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ActionTarget _actionTarget = _unitOfWork.ActionTarget.GetSingleOrDefault(e=>e.Id== actionTarget.Id);
                    _actionTarget.Actions = _unitOfWork.Actions.GetSingleOrDefault(e => e.Id == actionTarget.ActionsId);
                    _actionTarget.Group = actionTarget.GroupId == null ? _actionTarget.Group : _unitOfWork.Group.GetSingleOrDefault(e => e.Id == actionTarget.GroupId);
                    _actionTarget.Target = actionTarget.Target;
                    _unitOfWork.ActionTarget.Update(_actionTarget);
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
                    ActionTarget _actionTarget = _unitOfWork.ActionTarget.GetSingleOrDefault(e => e.Id == id);
                    if (_actionTarget != null)
                    {
                        _unitOfWork.ActionTarget.Remove(_actionTarget);
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
