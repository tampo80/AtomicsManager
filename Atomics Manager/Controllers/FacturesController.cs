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
    [Route("api/Factures")]
    public class FacturesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public FacturesController(IUnitOfWork unitOfWork, ILogger<PaysController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/Factures
        [HttpGet]
        public IActionResult Get()
        {
            var allFactures = _unitOfWork.Factures.GetAllIncluding(e => e.Demandes);
            return Ok(Mapper.Map<IEnumerable<FacturesViewModel>>(allFactures));
        }


        [HttpGet("FacturesBydemandId/{DemandeId}")]
        public IActionResult FacturesBydemandId(int DemandeId)
        {
            var allFactures = _unitOfWork.Factures.GetAllIncluding(e => e.Demandes,y=>y.ComptesInternes);

            return Ok(Mapper.Map<FacturesViewModel>(allFactures.SingleOrDefault(e=>e.DemandesId==DemandeId)));
        }

        // POST: api/Factures
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FacturesViewModel factures)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Factures _factures = Mapper.Map<Factures>(factures);
                  
                    //_factures.Name = _factures.Name.ToUpper ();
                    await _unitOfWork.Factures.AddAsync(_factures);
                    return Ok(await _unitOfWork.SaveChangesAsync());

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Data);
                }
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] FacturesViewModel factures)
        {

            if (ModelState.IsValid)
            {
                try
                {

                    Factures _factures = Mapper.Map<Factures>(factures);
                    Demandes dmd = _unitOfWork.Demandes.GetSingleOrDefault(e=>e.Id==factures.DemandesId);
                    ComptesInternes ci = _unitOfWork.ComptesInternes.GetSingleOrDefault(e => e.Id == factures.ComptesInternesId);
                    _factures.ComptesInternes = ci;
                    _factures.Demandes = dmd;
                  
                    //_factures.Name = _factures.Name.ToUpper ();
                    _unitOfWork.Factures.Update(_factures);

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
                    Factures _factures = _unitOfWork.Factures.GetSingleOrDefault(e => e.Id == id);
                    if (_factures != null)
                    {
                        _unitOfWork.Factures.Remove(_factures);
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