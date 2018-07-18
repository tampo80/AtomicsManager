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

namespace Atomics_Manager.Controllers {
    [Produces ("application/json")]
    [Route ("api/Devises")]
    public class DevisesController : Controller {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public DevisesController (IUnitOfWork unitOfWork, ILogger<DevisesController> logger) {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get () {
            var allDevises = _unitOfWork.Devises.GetAll ();
            return Ok (Mapper.Map<IEnumerable<DevisesViewModel>> (allDevises));
        }

        [HttpGet ("Isavailable/{name}")]
        public IActionResult Isavailable ([FromRoute] string name) {
            if (name != null) {
                var Res = _unitOfWork.Devises.Find (e => e.Label.ToUpper () == name.ToUpper ());
                if (Res.ToList ().Count () > 0) {
                    return Ok (true);
                }

            } else {
                return Ok (false);
            }
            return Ok (false);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] DevisesViewModel devises) {
            if (ModelState.IsValid) {
                try {
                    Devises _devises = Mapper.Map<Devises> (devises);
                    _devises.Label = _devises.Label.ToUpper ();
                    _unitOfWork.Devises.Add (_devises);
                    await _unitOfWork.SaveChangesAsync ();
                    return Ok ("OK");

                } catch (Exception ex) {

                    return BadRequest (ex.Data);
                }
            } else {
                return BadRequest (ModelState);
            }
        }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public async Task<IActionResult> Put (int id, [FromBody] DevisesViewModel devises) {
            if (ModelState.IsValid) {
                try {
                    Devises _devises = Mapper.Map<Devises> (devises);
                    _unitOfWork.Devises.Update (_devises);
                    await _unitOfWork.SaveChangesAsync ();
                    return Ok ("OK");

                } catch (Exception ex) {

                    return BadRequest (ex.Data);
                }
            } else {
                return BadRequest (ModelState);
            }
        }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public async Task<IActionResult> Delete (int id) {
            if (ModelState.IsValid) {
                try {
                    Devises _devises = _unitOfWork.Devises.GetSingleOrDefault (e => e.Id == id);
                    if (_devises != null) {
                        _unitOfWork.Devises.Remove (_devises);
                        await _unitOfWork.SaveChangesAsync ();
                        return Ok ("OK");
                    } else {
                        return BadRequest ();
                    }

                } catch (Exception ex) {

                    return BadRequest (ex.Data);
                }
            } else {
                return BadRequest (ModelState);
            }
        }
    }
}