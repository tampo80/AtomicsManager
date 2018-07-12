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
    [Route("api/Fournisseurs")]
    public class FournisseursController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public FournisseursController(IUnitOfWork unitOfWork, ILogger<FournisseursController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allFournisseurs = _unitOfWork.Fournisseurs.GetAll();
            return Ok(Mapper.Map<IEnumerable<FournisseursViewModel>>(allFournisseurs));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute]string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Fournisseurs.Find(e => e.NomSociete.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] FournisseursViewModel fournisseurs)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Fournisseurs _fournisseurs = Mapper.Map<Fournisseurs>(fournisseurs);
                    _fournisseurs.NomSociete = _fournisseurs.NomSociete.ToUpper();
                    _unitOfWork.Fournisseurs.Add(_fournisseurs);
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
        public async Task<IActionResult> Put(int id, [FromBody]FournisseursViewModel fournisseurs)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Fournisseurs _fournisseurs = Mapper.Map<Fournisseurs>(fournisseurs);
                    _unitOfWork.Fournisseurs.Update(_fournisseurs);
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
                    Fournisseurs _fournisseurs = _unitOfWork.Fournisseurs.GetSingleOrDefault(e => e.Id == id);
                    if (_fournisseurs != null)
                    {
                        _unitOfWork.Fournisseurs.Remove(_fournisseurs);
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