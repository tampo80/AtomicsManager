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
    [Route("api/Demandes")]
    public class DemandesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public DemandesController(IUnitOfWork unitOfWork, ILogger<DemandesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allDemandes = _unitOfWork.Demandes.GetAllIncluding(e=>e.Product);
            return Ok(Mapper.Map<IEnumerable<DemandesViewModel>>(allDemandes));
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