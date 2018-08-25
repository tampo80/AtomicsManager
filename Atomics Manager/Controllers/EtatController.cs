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
    [Route("api/Etat")]
    public class EtatController : Controller
    {
        // GET: api/Etat
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public EtatController(IUnitOfWork unitOfWork, ILogger<EtatController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allEtat = _unitOfWork.Etat.GetAllIncluding(e => e.Process).OrderBy(e => e.Name).OrderBy(e=>e.Id);
            return Ok(Mapper.Map<IEnumerable<EtatViewModel>>(allEtat));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Etat.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] EtatViewModel etat)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Etat _etat = Mapper.Map<Etat>(etat);
                    //_etat.Name = _etat.Name.ToUpper();
//
                    _etat.ProcessId = etat.ProcessId;
                    _etat.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == etat.ProcessId);

                    _unitOfWork.Etat.Add(_etat);
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
        public async Task<IActionResult> Put(int id, [FromBody] EtatViewModel etat)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Etat _etat = Mapper.Map<Etat>(etat);
                    _etat.ProcessId = etat.ProcessId;
                    _etat.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == etat.ProcessId);
                    _unitOfWork.Etat.Update(_etat);
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
                    Etat _etat = _unitOfWork.Etat.GetSingleOrDefault(e => e.Id == id);
                    if (_etat != null)
                    {
                        _unitOfWork.Etat.Remove(_etat);
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