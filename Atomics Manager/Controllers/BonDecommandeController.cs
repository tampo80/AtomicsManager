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

        [HttpGet("BonDeCommandeRef/{DemandeId}")]
        public IActionResult BonDeCommandeRef(int DemandeId)
        {
            int refV = 0;
            var _bonDeCommande = _unitOfWork.BonDeCommande.GetAllIncluding(e => e.Demandes);

            if (_bonDeCommande.Count()>0)
            {
                refV = _bonDeCommande.LastOrDefault().Id+1;
            }
           
            return Ok(BuidRef(refV));
        }

       
        public string BuidRef(int Id)
        {
            Id++;
            string Core1 = "MRN";
            var _entreprise = _unitOfWork.Entreprise.GetAll().FirstOrDefault();
            if (_entreprise!=null)
            {
                Core1 = "-"+_entreprise.Name.Substring(0,3).ToUpper();
            }

            string prefix1 = "BN";
            string Prefix2 = DateTime.UtcNow.Day.ToString();
            string Prefix3 = DateTime.UtcNow.Month.ToString();
            string Prefix4 = DateTime.UtcNow.Year.ToString();
            string Core = "/";
            string bref = prefix1 + Core + Prefix2 + Prefix3 + Prefix4 +Core1 + Id.ToString("0000");

            return bref;
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
                    Demandes demande = _unitOfWork.Demandes.GetSingleOrDefault(e => e.Id == bonDeCommande.Id);
                    _bonDeCommande.Demandes = demande;
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
        // DELETE api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    BonDeCommande _bonDeCommande = _unitOfWork.BonDeCommande.GetSingleOrDefault(e => e.Id == id);
                    if (_bonDeCommande != null)
                    {
                       
                        return Ok(_bonDeCommande);
                    }
                    else
                    {
                        return Ok();
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