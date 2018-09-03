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
    [Route("api/TypeComptes")]
    public class TypeComptesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public TypeComptesController(IUnitOfWork unitOfWork, ILogger<TypeComptesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/TypeComptes
        [HttpGet]
        public IActionResult Get()
        {
            var allTypeComptes = _unitOfWork.TypeComptes.GetAllIncluding();
            return Ok(Mapper.Map<IEnumerable<TypeComptesViewModel>>(allTypeComptes));
                
        }

        private int getPaysIdByVille(int villesId)
        {
            return _unitOfWork.Pays.GetSingleOrDefault(e => e.Villes.FirstOrDefault(j => j.Id == villesId).Id == villesId).Id;
        }

        // POST: api/TypeComptes
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TypeComptesViewModel typeComptes)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    TypeComptes _typeComptes = Mapper.Map<TypeComptes>(typeComptes);
                   
                    //_typeComptes.Name = _typeComptes.   ;
                    await _unitOfWork.TypeComptes.AddAsync(_typeComptes);
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
        public async Task<IActionResult> Put(int id, [FromBody] TypeComptesViewModel typeComptes)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    TypeComptes _typeComptes = Mapper.Map<TypeComptes>(typeComptes);
                    
                    //_typeComptes.Name = _typeComptes.Name.ToUpper();
                    _unitOfWork.TypeComptes.Update(_typeComptes);

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
                    TypeComptes _typeComptes = _unitOfWork.TypeComptes.GetSingleOrDefault(e => e.Id == id);
                    if (_typeComptes != null)
                    {
                        _unitOfWork.TypeComptes.Remove(_typeComptes);
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