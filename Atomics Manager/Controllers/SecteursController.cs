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
    [Route("api/Secteurs")]
    public class SecteursController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public SecteursController (IUnitOfWork unitOfWork, ILogger<SecteursController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allSecteurs = _unitOfWork.Secteurs.GetAll();
            return Ok(Mapper.Map<IEnumerable<SecteursViewModel>>(allSecteurs));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute]string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Secteurs.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] SecteursViewModel secteurs)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Secteurs _secteurs = Mapper.Map<Secteurs>(secteurs);
                    _secteurs.Name = _secteurs.Name.ToUpper();
                    _unitOfWork.Secteurs.Add(_secteurs);
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
        public async Task<IActionResult> Put(int id, [FromBody]SecteursViewModel secteurs)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Secteurs _secteurs = Mapper.Map<Secteurs>(secteurs);
                    _unitOfWork.Secteurs.Update(_secteurs);
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
                    Secteurs _secteurs = _unitOfWork.Secteurs.GetSingleOrDefault(e => e.Id == id);
                    if (_secteurs != null)
                    {
                        _unitOfWork.Secteurs.Remove(_secteurs);
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