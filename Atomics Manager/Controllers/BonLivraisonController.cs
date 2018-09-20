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
    [Route("api/BonLivraison")]
    public class BonLivraisonController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public BonLivraisonController(IUnitOfWork unitOfWork, ILogger<PaysController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/BonLivraison
        [HttpGet]
        public IActionResult Get()
        {
            var allBonLivraison = _unitOfWork.BonLivraison.GetAllIncluding(e => e.Demandes);
            return Ok(Mapper.Map<IEnumerable<BonLivraisonViewModel>>(allBonLivraison));
        }


        [HttpGet("BonLivraisonBydemandId/{DemandeId}")]
        public IActionResult BonLivraisonBydemandId(int DemandeId)
        {
            var allBonLivraison = _unitOfWork.BonLivraison.GetAllIncluding(e => e.Demandes, y => y.Controleur);

            return Ok(Mapper.Map<BonLivraisonViewModel>(allBonLivraison.SingleOrDefault(e => e.DemandesId == DemandeId)));
        }

        // POST: api/BonLivraison
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BonLivraisonViewModel bonLivraison)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    BonLivraison _bonLivraison = Mapper.Map<BonLivraison>(bonLivraison);

                    //_bonLivraison.Name = _bonLivraison.Name.ToUpper ();
                    await _unitOfWork.BonLivraison.AddAsync(_bonLivraison);
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
        public async Task<IActionResult> Put(int id, [FromBody] BonLivraisonViewModel bonLivraison)
        {

            if (ModelState.IsValid)
            {
                try
                {

                    BonLivraison _bonLivraison = Mapper.Map<BonLivraison>(bonLivraison);
                    Demandes dmd = _unitOfWork.Demandes.GetSingleOrDefault(e => e.Id == bonLivraison.DemandesId);
                   // ComptesInternes ci = _unitOfWork.ComptesInternes.GetSingleOrDefault(e => e.Id == bonLivraison.ComptesInternesId);
                   // _bonLivraison.ComptesInternes = ci;
                    _bonLivraison.Demandes = dmd;

                    //_bonLivraison.Name = _bonLivraison.Name.ToUpper ();
                    _unitOfWork.BonLivraison.Update(_bonLivraison);

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
                    BonLivraison _bonLivraison = _unitOfWork.BonLivraison.GetSingleOrDefault(e => e.Id == id);
                    if (_bonLivraison != null)
                    {
                        _unitOfWork.BonLivraison.Remove(_bonLivraison);
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