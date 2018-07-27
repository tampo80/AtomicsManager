using System;
using System.Collections.Generic;
using System.IO;
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
    [Route("api/Product")]
    public class ProductController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
        public ProductController(IUnitOfWork unitOfWork, ILogger<ProductController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }
        // GET: api/Product
        [HttpGet]
        public IActionResult Get()
        {
            var allProduct = _unitOfWork.Product.GetAllIncluding(e => e.ProductCategory,j=>j.Fournisseurs);
            return Ok(Mapper.Map<IEnumerable<ProductViewModel>>(allProduct));
        }

       

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProductViewModel product)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (product.IIcon!=null)
                    {
                         using (var memoryStream = new MemoryStream ()) {
                        await product.IIcon.CopyToAsync (memoryStream);
                        product.Icon = memoryStream.ToArray ();
                    }
                       
                       
                    }
                    Product _product = Mapper.Map<Product>(product);
                    ProductCategory productCategory = _unitOfWork.ProductCategory.GetSingleOrDefault(e => e.Id == product.ProductCategoryId);
                    _product.ProductCategory = productCategory;
                    Fournisseurs _fournisseurs=_unitOfWork.Fournisseurs.GetSingleOrDefault(e=>e.Id==product.FournisseursId);
                    _product.Fournisseurs=_fournisseurs;
                    _product.Name = _product.Name.ToUpper();
                    await _unitOfWork.Product.AddAsync(_product);
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
        public async Task<IActionResult> Put(int id, [FromBody] ProductViewModel product)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Product _product = Mapper.Map<Product>(product);
                    ProductCategory productCategory = _unitOfWork.ProductCategory.GetSingleOrDefault(e => e.Id == product.ProductCategoryId);
                    _product.ProductCategory = productCategory;
                    _product.Name = _product.Name.ToUpper();
                    _unitOfWork.Product.Update(_product);

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
                    Product _product = _unitOfWork.Product.GetSingleOrDefault(e => e.Id == id);
                    if (_product != null)
                    {
                        _unitOfWork.Product.Remove(_product);
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