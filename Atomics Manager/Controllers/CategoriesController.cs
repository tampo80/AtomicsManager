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
    [Route("api/Categories")]
    public class CategoriesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public CategoriesController(IUnitOfWork unitOfWork, ILogger<CategoriesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allProductCategory = _unitOfWork.ProductCategory.GetAll();
            return Ok(Mapper.Map<IEnumerable<CategoriesViewModel>>(allProductCategory));
        }

        [HttpGet("Isavailable/{name}")]
        public IActionResult Isavailable([FromRoute] string name)
        {
            if (name != null)
            {
                var Res = _unitOfWork.ProductCategory.Find(e => e.Name.ToUpper() == name.ToUpper());
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
        public async Task<IActionResult> Post([FromBody] CategoriesViewModel secteurs)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ProductCategory _secteurs = Mapper.Map<ProductCategory>(secteurs);
                    _secteurs.Name = _secteurs.Name.ToUpper();
                    _unitOfWork.ProductCategory.Add(_secteurs);
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
        public async Task<IActionResult> Put(int id, [FromBody] CategoriesViewModel secteurs)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ProductCategory _secteurs = Mapper.Map<ProductCategory>(secteurs);
                    _unitOfWork.ProductCategory.Update(_secteurs);
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
                    ProductCategory _secteurs = _unitOfWork.ProductCategory.GetSingleOrDefault(e => e.Id == id);
                    if (_secteurs != null)
                    {
                        _unitOfWork.ProductCategory.Remove(_secteurs);
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