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
    [Route("api/Agences")]
    public class AgencesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public AgencesController(IUnitOfWork unitOfWork, ILogger<AgencesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/Agences
        [HttpGet]
        public IActionResult Get()
        {
            var allAgences = _unitOfWork.Agences.GetAllIncluding(e => e.Villes);
            return Ok(Mapper.Map<IEnumerable<AgencesViewModel>>(allAgences).Select(e=>{
                e.paysId=getPaysIdByVille(e.VillesId);
                return e;}
                ));
        }

        private int getPaysIdByVille(int villesId)
        {
              return _unitOfWork.Pays.GetSingleOrDefault(e=>e.Villes.FirstOrDefault(j=>j.Id==villesId).Id==villesId).Id;
        }

        // POST: api/Agences
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AgencesViewModel agences)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Agences _agences = Mapper.Map<Agences>(agences);
                    Villes villes = _unitOfWork.Villes.GetSingleOrDefault(e => e.Id == agences.VillesId);
                    _agences.Villes = villes;
                    _agences.Name = _agences.Name.ToUpper();
                    await _unitOfWork.Agences.AddAsync(_agences);
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
        public async Task<IActionResult> Put(int id, [FromBody] AgencesViewModel agences)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Agences _agences = Mapper.Map<Agences>(agences);
                    Villes villes = _unitOfWork.Villes.GetSingleOrDefault(e => e.Id == agences.VillesId);
                    _agences.Villes = villes;
                    _agences.Name = _agences.Name.ToUpper();
                    _unitOfWork.Agences.Update(_agences);

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
                    Agences _agences = _unitOfWork.Agences.GetSingleOrDefault(e => e.Id == id);
                    if (_agences != null)
                    {
                        _unitOfWork.Agences.Remove(_agences);
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