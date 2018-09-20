using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Atomic_Manager.ViewModels;
using AutoMapper;
using DAL;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Atomics_Manager.Controllers
{
    [Produces("application/json")]
    [Route("api/BonDeCommande")]
    public class BonDeCommandeController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public BonDeCommandeController(IUnitOfWork unitOfWork, ILogger<PaysController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/BonDeCommande
        [HttpGet]
        public IActionResult Get()
        {
            var allBonDeCommande = _unitOfWork.BonDeCommande.GetAllIncluding(e => e.Demandes);
            return Ok(Mapper.Map<IEnumerable<BonDeCommandeViewModel>>(allBonDeCommande));
        }


        [HttpGet("BonDeCommandeBydemandId/{DemandeId}")]
        public IActionResult BonDeCommandeBydemandId(int DemandeId)
        {
            var allBonDeCommande = _unitOfWork.BonDeCommande.GetAllIncluding(e => e.Demandes);

            return Ok(Mapper.Map<BonDeCommandeViewModel>(allBonDeCommande.SingleOrDefault(e => e.DemandesId == DemandeId)));
        }

        // POST: api/BonDeCommande
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BonDeCommandeViewModel bonDeCommande)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    BonDeCommande _bonDeCommande = Mapper.Map<BonDeCommande>(bonDeCommande);

                    //_bonDeCommande.Name = _bonDeCommande.Name.ToUpper ();
                    await _unitOfWork.BonDeCommande.AddAsync(_bonDeCommande);
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
        public async Task<IActionResult> Put(int id, [FromBody] BonDeCommandeViewModel bonDeCommande)
        {

            if (ModelState.IsValid)
            {
                try
                {

                    BonDeCommande _bonDeCommande = Mapper.Map<BonDeCommande>(bonDeCommande);
                    Demandes dmd = _unitOfWork.Demandes.GetSingleOrDefault(e => e.Id == bonDeCommande.DemandesId);
                  
                    _bonDeCommande.Demandes = dmd;

                    //_bonDeCommande.Name = _bonDeCommande.Name.ToUpper ();
                    _unitOfWork.BonDeCommande.Update(_bonDeCommande);

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
                    BonDeCommande _bonDeCommande = _unitOfWork.BonDeCommande.GetSingleOrDefault(e => e.Id == id);
                    if (_bonDeCommande != null)
                    {
                        _unitOfWork.BonDeCommande.Remove(_bonDeCommande);
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