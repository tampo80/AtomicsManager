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
    [Route ("api/Pays")]
    public class PaysController : Controller {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public PaysController (IUnitOfWork unitOfWork, ILogger<PaysController> logger) {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get () {
            var allPays = _unitOfWork.Pays.GetAll ();
            return Ok (Mapper.Map<IEnumerable<PaysViewModel>> (allPays));
        }

        [HttpGet ("Isavailable/{name}")]
        public IActionResult Isavailable ([FromRoute] string name) {
            if (name != null) {
                var Res = _unitOfWork.Pays.Find (e => e.Name.ToUpper () == name.ToUpper ());
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
        public async Task<IActionResult> Post ([FromBody] PaysViewModel pays) {
            if (ModelState.IsValid) {
                try {
                    Pays _pays = Mapper.Map<Pays> (pays);
                    _pays.Name = _pays.Name.ToUpper ();
                    _unitOfWork.Pays.Add (_pays);
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
        public async Task<IActionResult> Put (int id, [FromBody] PaysViewModel pays) {
            if (ModelState.IsValid) {
                try {
                    Pays _pays = Mapper.Map<Pays> (pays);
                    _unitOfWork.Pays.Update (_pays);
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
                    Pays _pays = _unitOfWork.Pays.GetSingleOrDefault (e => e.Id == id);
                    if (_pays != null) {
                        _unitOfWork.Pays.Remove (_pays);
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