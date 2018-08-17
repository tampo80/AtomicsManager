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
    [Route("api/Group")]
    public class GroupController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public GroupController(IUnitOfWork unitOfWork, ILogger<GroupController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allGroup = _unitOfWork.Group.GetAllIncluding(e=>e.Process).OrderBy(e => e.Name);
            return Ok(Mapper.Map<IEnumerable<GroupViewModel>>(allGroup));
        }
       
        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.Group.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] GroupViewModel group)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Group _group = Mapper.Map<Group>(group);
                    _group.Name = _group.Name.ToUpper();

                    _group.ProcessId = group.ProcessId;
                    _group.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == group.ProcessId);

                    _unitOfWork.Group.Add(_group);
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
        public async Task<IActionResult> Put(int id, [FromBody] GroupViewModel group)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Group _group = Mapper.Map<Group>(group);
                    _group.ProcessId = group.ProcessId;
                    _group.Process = _unitOfWork.Process.GetSingleOrDefault(e => e.Id == group.ProcessId);
                    _unitOfWork.Group.Update(_group);
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
                    Group _group = _unitOfWork.Group.GetSingleOrDefault(e => e.Id == id);
                    if (_group != null)
                    {
                        _unitOfWork.Group.Remove(_group);
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