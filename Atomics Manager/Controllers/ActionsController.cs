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
    [Route("api/Actions")]
    public class ActionsController : Controller
    {
        // GET: api/Actions
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public ActionsController(IUnitOfWork unitOfWork, ILogger<ActionsController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allActions = _unitOfWork.Actions.GetAllIncluding(e => e.Process).OrderBy(e => e.Name).OrderBy(e => e.Id);
            return Ok(Mapper.Map<IEnumerable<ActionsViewModel>>(allActions));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Actions.Find(e => e.Name.ToUpper() == name.ToUpper());
                if (Res.ToList().Count() > 0)
                {
                    return Ok(true);
                }

            }
            else
            {
                return Ok(false);
            }
            return Ok(false);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ActionsViewModel actions)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Actions _actions = Mapper.Map<Actions>(actions);
                    _actions.Name = _actions.Name.ToUpper();

                    _actions.ProcessId = actions.ProcessId;
                    _actions.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == actions.ProcessId);

                    _unitOfWork.Actions.Add(_actions);
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
        public async Task<IActionResult> Put(int id, [FromBody] ActionsViewModel actions)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Actions _actions = Mapper.Map<Actions>(actions);
                    _actions.ProcessId = actions.ProcessId;
                    _actions.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == actions.ProcessId);
                    _unitOfWork.Actions.Update(_actions);
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
                    Actions _actions = _unitOfWork.Actions.GetSingleOrDefault(e => e.Id == id);
                    if (_actions != null)
                    {
                        _unitOfWork.Actions.Remove(_actions);
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