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
    [Route ("api/Villes")]
    public class VillesController : Controller {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public VillesController (IUnitOfWork unitOfWork, ILogger<PaysController> logger) {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/Villes
        [HttpGet]
        public IActionResult Get () {
            var allVilles = _unitOfWork.Villes.GetAllIncluding (e => e.Pays);
            return Ok (Mapper.Map<IEnumerable<VillesViewModel>> (allVilles));
        }

        [HttpGet ("bypaysid/{id}")]
        public IActionResult bypaysid (int id) {
            var allVilles = _unitOfWork.Villes.GetAllIncluding (e => e.Pays).Where (f => f.Pays.Id == id);
            return Ok (Mapper.Map<IEnumerable<VillesViewModel>> (allVilles));
        }
        // GET: api/Villes/5
        [HttpGet ("{id}", Name = "Get")]
        public string Get (int id) {
            return "value";
        }

        // POST: api/Villes
        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] VillesViewModel villes) {
            if (ModelState.IsValid) {
                try {

                    Villes _villes = Mapper.Map<Villes> (villes);
                    Pays pays = _unitOfWork.Pays.GetSingleOrDefault (e => e.Id == villes.PaysId);
                    _villes.Pays = pays;
                    //_villes.Name = _villes.Name.ToUpper ();
                    await _unitOfWork.Villes.AddAsync (_villes);
                    return Ok (await _unitOfWork.SaveChangesAsync ());

                } catch (Exception ex) {

                    return BadRequest (ex.Data);
                }
            }
            return BadRequest ();
        }

        [HttpPut ("{id}")]
        public async Task<IActionResult> Put (int id, [FromBody] VillesViewModel villes) {
            if (ModelState.IsValid) {
                try {

                    Villes _villes = Mapper.Map<Villes> (villes);
                    Pays pays = _unitOfWork.Pays.GetSingleOrDefault (e => e.Id == villes.PaysId);
                    _villes.Pays = pays;
                    //_villes.Name = _villes.Name.ToUpper ();
                    _unitOfWork.Villes.Update (_villes);

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
                    Villes _villes = _unitOfWork.Villes.GetSingleOrDefault (e => e.Id == id);
                    if (_villes != null) {
                        _unitOfWork.Villes.Remove (_villes);
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