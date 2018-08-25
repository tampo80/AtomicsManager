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
    [Route("api/Departements")]
    public class DepartementsController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public DepartementsController(IUnitOfWork unitOfWork, ILogger<DepartementsController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allDepartements = _unitOfWork.Departements.GetAll();
            return Ok(Mapper.Map<IEnumerable<DepartementsViewModel>>(allDepartements));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Departements.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] DepartementsViewModel departements)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Departements _departements = Mapper.Map<Departements>(departements);
                    //_departements.Name = _departements.Name.ToUpper();
                    _unitOfWork.Departements.Add(_departements);
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
        public async Task<IActionResult> Put(int id, [FromBody] DepartementsViewModel departements)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Departements _departements = Mapper.Map<Departements>(departements);
                    _unitOfWork.Departements.Update(_departements);
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
                    Departements _departements = _unitOfWork.Departements.GetSingleOrDefault(e => e.Id == id);
                    if (_departements != null)
                    {
                        _unitOfWork.Departements.Remove(_departements);
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