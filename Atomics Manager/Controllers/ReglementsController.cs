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
    [Route("api/Reglements")]
    public class ReglementsController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public ReglementsController(IUnitOfWork unitOfWork, ILogger<PaysController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/Reglements
        [HttpGet]
        public IActionResult Get()
        {
            var allReglements = _unitOfWork.Reglements.GetAllIncluding(e => e.Factures);
            return Ok(Mapper.Map<IEnumerable<ReglementsViewModel>>(allReglements));
        }

       

        // POST: api/Reglements
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReglementsViewModel reglements)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Reglements _reglements = Mapper.Map<Reglements>(reglements);
                  
                    //_reglements.Name = _reglements.Name.ToUpper ();
                    await _unitOfWork.Reglements.AddAsync(_reglements);
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
        public async Task<IActionResult> Put(int id, [FromBody] ReglementsViewModel reglements)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Reglements _reglements = Mapper.Map<Reglements>(reglements);
                   
                    //_reglements.Name = _reglements.Name.ToUpper ();
                    _unitOfWork.Reglements.Update(_reglements);

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
                    Reglements _reglements = _unitOfWork.Reglements.GetSingleOrDefault(e => e.Id == id);
                    if (_reglements != null)
                    {
                        _unitOfWork.Reglements.Remove(_reglements);
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