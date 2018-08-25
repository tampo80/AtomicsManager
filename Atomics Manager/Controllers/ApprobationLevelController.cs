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
    [Route("api/ApprobationLevel")]
    public class ApprobationLevelController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public ApprobationLevelController(IUnitOfWork unitOfWork, ILogger<ApprobationLevelController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        
        [HttpGet]
        public IActionResult Get()
        {
            var allApprobationLevel = _unitOfWork.ApprobationLevel.GetAll().OrderBy(e=>e.Level) ;
            return Ok(Mapper.Map<IEnumerable<ApprobationLevelViewModel>>(allApprobationLevel));
        }
        [HttpGet("expertise")]
        public IActionResult GetExpert()
        {
            var allApprobationLevel = _unitOfWork.ApprobationLevel.Find(e=>e.TypeApprovalGroup==TypeApprovalGroup.EXPERTS);
            return Ok(Mapper.Map<IEnumerable<ApprobationLevelViewModel>>(allApprobationLevel));
        }
        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.ApprobationLevel.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] ApprobationLevelViewModel approbationLevel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ApprobationLevel _approbationLevel = Mapper.Map<ApprobationLevel>(approbationLevel);
                   // _approbationLevel.Name = _approbationLevel.Name.ToUpper();
                    _unitOfWork.ApprobationLevel.Add(_approbationLevel);
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
        public async Task<IActionResult> Put(int id, [FromBody] ApprobationLevelViewModel approbationLevel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ApprobationLevel _approbationLevel = Mapper.Map<ApprobationLevel>(approbationLevel);
                    _unitOfWork.ApprobationLevel.Update(_approbationLevel);
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
                    ApprobationLevel _approbationLevel = _unitOfWork.ApprobationLevel.GetSingleOrDefault(e => e.Id == id);
                    if (_approbationLevel != null)
                    {
                        _unitOfWork.ApprobationLevel.Remove(_approbationLevel);
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