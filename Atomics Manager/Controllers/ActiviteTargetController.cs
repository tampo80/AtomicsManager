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
    [Route("api/ActiviteTarget")]
    public class ActiviteTargetController : Controller
    {
        // GET: api/ActiviteTarget
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public ActiviteTargetController(IUnitOfWork unitOfWork, ILogger<ActiviteTargetController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;


        }

        [HttpGet]
        public IActionResult Get()
        {
            var allActiviteTarget = _unitOfWork.ActiviteTarget.GetAll();
            return Ok(Mapper.Map<IEnumerable<ActiviteTargetViewModel>>(allActiviteTarget));
        }

        [HttpGet("{activiteId}")]
        public IActionResult Get(int activiteId)
        {
            var allActiviteTarget = _unitOfWork.ActiviteTarget.GetAllIncluding(e => e.Activite, j => j.Group).SingleOrDefault(e => e.ActiviteId == activiteId);
            return Ok(Mapper.Map<ActiviteTargetViewModel>(allActiviteTarget));
        }


        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ActiviteTargetViewModel activiteTarget)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ActiviteTarget _activiteTarget = new ActiviteTarget();
                    _activiteTarget.Activite = _unitOfWork.Activite.GetSingleOrDefault(e => e.Id == activiteTarget.ActiviteId);
                    _unitOfWork.ActiviteTarget.Add(_activiteTarget);
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
        public async Task<IActionResult> Put(int id, [FromBody] ActiviteTargetViewModel activiteTarget)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ActiviteTarget _activiteTarget = _unitOfWork.ActiviteTarget.GetSingleOrDefault(e => e.Id == activiteTarget.Id);
                    _activiteTarget.Activite = _unitOfWork.Activite.GetSingleOrDefault(e => e.Id == activiteTarget.ActiviteId);
                    _activiteTarget.Group = activiteTarget.GroupId == null ? _activiteTarget.Group : _unitOfWork.Group.GetSingleOrDefault(e => e.Id == activiteTarget.GroupId);
                    _activiteTarget.Target = activiteTarget.Target;
                    _unitOfWork.ActiviteTarget.Update(_activiteTarget);
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
                    ActiviteTarget _activiteTarget = _unitOfWork.ActiviteTarget.GetSingleOrDefault(e => e.Id == id);
                    if (_activiteTarget != null)
                    {
                        _unitOfWork.ActiviteTarget.Remove(_activiteTarget);
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