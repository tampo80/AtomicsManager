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
    [Route("api/Services")]
    public class ServicesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public ServicesController(IUnitOfWork unitOfWork, ILogger<ServicesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/Services
        [HttpGet]
        public IActionResult Get()
        {
            var allServices = _unitOfWork.Services.GetAllIncluding(e => e.Departements);
            return Ok(Mapper.Map<IEnumerable<ServicesViewModel>>(allServices));
        }

        //[HttpGet("bypaysid/{id}")]
        //public IActionResult bypaysid(int id)
        //{
        //    var allServices = _unitOfWork.Services.GetAllIncluding(e => e.Departements).Where(f => f.Departements.Id == id);
        //    return Ok(Mapper.Map<IEnumerable<ServicesViewModel>>(allServices));
        //}
        // GET: api/Services/5
      
        // POST: api/Services
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ServicesViewModel services)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Services _services = Mapper.Map<Services>(services);
                    Departements departements = _unitOfWork.Departements.GetSingleOrDefault(e => e.Id == services.departementsId);
                    _services.Departements = departements;
                   // _services.Name = _services.Name.ToUpper();
                    await _unitOfWork.Services.AddAsync(_services);
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
        public async Task<IActionResult> Put(int id, [FromBody] ServicesViewModel services)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Services _services = Mapper.Map<Services>(services);
                    Departements departements = _unitOfWork.Departements.GetSingleOrDefault(e => e.Id == services.departementsId);
                    _services.Departements = departements;
                   // _services.Name = _services.Name.ToUpper();
                    _unitOfWork.Services.Update(_services);

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

        [HttpGet ("bydepartementsid/{id}")]
        public IActionResult bydepartementsid (int id) {
            var allServices = _unitOfWork.Services.GetAllIncluding (e => e.Departements).Where (f => f.Departements.Id == id);
            return Ok (Mapper.Map<IEnumerable<ServicesViewModel>> (allServices));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Services _services = _unitOfWork.Services.GetSingleOrDefault(e => e.Id == id);
                    if (_services != null)
                    {
                        _unitOfWork.Services.Remove(_services);
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