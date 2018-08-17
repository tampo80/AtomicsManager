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
    [Route("api/Activite")]
    public class ActiviteController : Controller
    {
        // GET: api/Activite
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public ActiviteController(IUnitOfWork unitOfWork, ILogger<ActiviteController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allActivite = _unitOfWork.Activite.GetAllIncluding(e => e.Process).OrderBy(e => e.Name).OrderBy(e => e.Id);
            return Ok(Mapper.Map<IEnumerable<ActiviteViewModel>>(allActivite));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Activite.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] ActiviteViewModel activite)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Activite _activite = Mapper.Map<Activite>(activite);
                    _activite.Name = _activite.Name.ToUpper();

                    _activite.ProcessId = activite.ProcessId;
                    _activite.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == activite.ProcessId);

                    _unitOfWork.Activite.Add(_activite);
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
        public async Task<IActionResult> Put(int id, [FromBody] ActiviteViewModel activite)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    Activite _activite = Mapper.Map<Activite>(activite);
                    _activite.ProcessId = activite.ProcessId;
                    _activite.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == activite.ProcessId);
                    _unitOfWork.Activite.Update(_activite);
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
                    Activite _activite = _unitOfWork.Activite.GetSingleOrDefault(e => e.Id == id);
                    if (_activite != null)
                    {
                        _unitOfWork.Activite.Remove(_activite);
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