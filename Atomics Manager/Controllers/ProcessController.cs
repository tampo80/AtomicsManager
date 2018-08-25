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
    [Route("api/Process")]
    public class ProcessController : Controller
    {
        // GET: api/Process
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public ProcessController(IUnitOfWork unitOfWork, ILogger<ProcessController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allProcess = _unitOfWork.Process.GetAll();
            return Ok(Mapper.Map<IEnumerable<ProcessViewModel>>(allProcess));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Process.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] ProcessViewModel process)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Process _process = Mapper.Map<Process>(process);
                    //_process.Name = _process.Name.ToUpper();
                    _unitOfWork.Process.Add(_process);
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
        public async Task<IActionResult> Put(int id, [FromBody] ProcessViewModel process)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Process _process = Mapper.Map<Process>(process);
                    _unitOfWork.Process.Update(_process);
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
                    Process _process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == id);
                    if (_process != null)
                    {
                        _unitOfWork.Process.Remove(_process);
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
