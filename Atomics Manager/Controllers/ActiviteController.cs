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

        [HttpGet("tac/{TransitionId}")]
        public IActionResult GetTA(int TransitionId)
        {
            var allActivite = _unitOfWork.TransitionActivite.Find(e => e.TransitionId == TransitionId);
            List<int> ActiviteIds = new List<int>();

            foreach (var item in allActivite)
            {
                ActiviteIds.Add(item.ActiviteId);
            }

            return Ok(ActiviteIds);
        }

        [HttpGet("ate/{EtatId}")]
        public IActionResult GetATE(int EtatId)
        {
            var allActivite = _unitOfWork.EtatActivite.Find(e => e.EtatId == EtatId);
            List<int> ActiviteIds = new List<int>();

            foreach (var item in allActivite)
            {
                ActiviteIds.Add(item.ActiviteId);
            }

            return Ok(ActiviteIds);
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
                    //_activite.Name = _activite.Name.ToUpper();

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

        [HttpPost("transitionactivite")]
        public async Task<IActionResult> PosttransitionActivite([FromBody] ACTI act)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    List<TransitionActivite> NewTA = new List<TransitionActivite>();
                    List<TransitionActivite> TAToDelete = new List<TransitionActivite>();
                    List<TransitionActivite> currentTA = new List<TransitionActivite>();
                    List<TransitionActivite> TAToAdd = new List<TransitionActivite>();

                    foreach (int id in act.ActivitesIds)
                    {
                        NewTA.Add(new TransitionActivite
                        {
                            Transition = _unitOfWork.Transition.GetSingleOrDefault(e => e.Id == act.TransitionId),
                            Activite = _unitOfWork.Activite.GetSingleOrDefault(e => e.Id == id)
                        });
                    }

                    currentTA = _unitOfWork.TransitionActivite.Find(e => e.TransitionId == act.TransitionId).ToList();

                    TAToAdd = NewTA.Except(currentTA).ToList();
                    TAToDelete = currentTA.Except(NewTA).ToList();

                    foreach (var item in TAToDelete)
                    {
                        _unitOfWork.TransitionActivite.Remove(item);
                    }
                    await _unitOfWork.SaveChangesAsync();
                    foreach (var item in TAToAdd)
                    {
                        _unitOfWork.TransitionActivite.Add(item);
                    }
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


        [HttpPost("etatactivite")]
        public async Task<IActionResult> etatactivite([FromBody] ATE act)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    List<EtatActivite> NewTA = new List<EtatActivite>();
                    List<EtatActivite> TAToDelete = new List<EtatActivite>();
                    List<EtatActivite> currentTA = new List<EtatActivite>();
                    List<EtatActivite> TAToAdd = new List<EtatActivite>();

                    foreach (int id in act.ActivitesIds)
                    {
                        NewTA.Add(new EtatActivite
                        {
                            Etat = _unitOfWork.Etat.GetSingleOrDefault(e => e.Id == act.EtatId),
                            Activite = _unitOfWork.Activite.GetSingleOrDefault(e => e.Id == id)
                        });
                    }

                    currentTA = _unitOfWork.EtatActivite.Find(e => e.EtatId == act.EtatId).ToList();

                    TAToAdd = NewTA.Except(currentTA).ToList();
                    TAToDelete = currentTA.Except(NewTA).ToList();

                    foreach (var item in TAToDelete)
                    {
                        _unitOfWork.EtatActivite.Remove(item);
                    }
                    await _unitOfWork.SaveChangesAsync();
                    foreach (var item in TAToAdd)
                    {
                        _unitOfWork.EtatActivite.Add(item);
                    }
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