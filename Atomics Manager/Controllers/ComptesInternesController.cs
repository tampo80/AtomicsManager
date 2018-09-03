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
    [Route("api/ComptesInternes")]
    public class ComptesInternesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public ComptesInternesController(IUnitOfWork unitOfWork, ILogger<ComptesInternesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/ComptesInternes
        [HttpGet]
        public IActionResult Get()
        {
            var allComptesInternes = _unitOfWork.ComptesInternes.GetAllIncluding(e => e.TypeComptes);
            return Ok(Mapper.Map<IEnumerable<ComptesInternesViewModel>>(allComptesInternes));
        }

        private int getPaysIdByVille(int typeComptesId)
        {
            return _unitOfWork.TypeComptes.GetSingleOrDefault(e => e.ComptesInternes.FirstOrDefault(j => j.Id == typeComptesId).Id == typeComptesId).Id;
        }

        // POST: api/ComptesInternes
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ComptesInternesViewModel comptesInternes)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    ComptesInternes _comptesInternes = Mapper.Map<ComptesInternes>(comptesInternes);
                    TypeComptes typeComptes = _unitOfWork.TypeComptes.GetSingleOrDefault(e => e.Id == comptesInternes.TypeComptesId);
                    _comptesInternes.TypeComptes = typeComptes;
                    //_comptesInternes.Name = _comptesInternes.   ;
                    await _unitOfWork.ComptesInternes.AddAsync(_comptesInternes);
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
        public async Task<IActionResult> Put(int id, [FromBody] ComptesInternesViewModel comptesInternes)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    ComptesInternes _comptesInternes = Mapper.Map<ComptesInternes>(comptesInternes);
                  
                    //_comptesInternes.Name = _comptesInternes.Name.ToUpper();
                    _unitOfWork.ComptesInternes.Update(_comptesInternes);

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
                    ComptesInternes _comptesInternes = _unitOfWork.ComptesInternes.GetSingleOrDefault(e => e.Id == id);
                    if (_comptesInternes != null)
                    {
                        _unitOfWork.ComptesInternes.Remove(_comptesInternes);
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