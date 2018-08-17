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
    [Route("api/transition")]
    public class TransitionController : Controller
    {
        // GET: api/transition
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public TransitionController(IUnitOfWork unitOfWork, ILogger<TransitionController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allTransition = _unitOfWork.Transition.GetAllIncluding(e=>e.Process,j=>j.EtatActuel,k=>k.EtatSuivant).OrderBy(e => e.Id);
            return Ok(Mapper.Map<IEnumerable<TransitionViewModel>>(allTransition));
        }
        
       

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TransitionViewModel transition)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Transition _transition = new Transition();

                    _transition.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == transition.ProcessId);
                    _transition.EtatActuel = _unitOfWork.Etat.GetSingleOrDefault(e => e.Id == transition.EtatActuelId);
                    _transition.EtatSuivant = _unitOfWork.Etat.GetSingleOrDefault(e => e.Id == transition.EtatSuivantId);

                    _unitOfWork.Transition.Add(_transition);
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
        public async Task<IActionResult> Put(int id, [FromBody] TransitionViewModel transition)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Transition _transition = _unitOfWork.Transition.GetSingleOrDefault(e => e.Id == transition.Id);
                    _transition.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == transition.ProcessId);
                    _transition.EtatActuel = _unitOfWork.Etat.GetSingleOrDefault(e => e.Id == transition.EtatActuelId);
                    _transition.EtatSuivant = _unitOfWork.Etat.GetSingleOrDefault(e => e.Id == transition.EtatSuivantId);
                    _unitOfWork.Transition.Update(_transition);
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
                    Transition _transition = _unitOfWork.Transition.GetSingleOrDefault(e => e.Id == id);
                    if (_transition != null)
                    {
                        _unitOfWork.Transition.Remove(_transition);
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