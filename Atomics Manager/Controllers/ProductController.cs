using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Atomics_Manager.Helpers;
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
            var allProduct = _unitOfWork.Products.GetAllIncluding(e => e.ProductCategory,j=>j.Fournisseurs);
            return Ok(Mapper.Map<IEnumerable<ProductViewModel>>(allProduct).Select(e=>{
                e.Sicone=getIcone(e.Icon);
                return e;
            }));
        }
       [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var allProduct = _unitOfWork.Products.GetAllIncluding(e => e.ProductCategory,j=>j.Fournisseurs).SingleOrDefault(e=>e.Id==id);
            var product=Mapper.Map<ProductViewModel>(allProduct);
            product.Sicone=getIcone(product.Icon);
           
            return Ok(product);
        }


        [HttpGet("getworkflowstatbyid/{id}")]
        public IActionResult getworkFlowStatById(int id)
        {
            var AllHistoriies = _unitOfWork.ActionsHistories.GetAllIncluding(a=>a.Demandes,b=>b.Actions,c=>c.User,d=>d.Etat).Where(e=>e.DemandesId==id);
          //  Console.Write(AllHistoriies);
            var histories = Mapper.Map<IEnumerable<ActionsHistoriesViewModel>>(AllHistoriies);
            return Ok(histories);
        }
        private string getIcone(byte[] icone)
        {
             //icone = new byte[0];
            string Sicone = string.Empty;
                try
                {
                
                Sicone = Convert.ToBase64String(icone);
                IAttachmentType Mime = Utilities.GetMimeType(Sicone);

                Sicone = "data:" + Mime.MimeType + ";base64," + Sicone;
               }
                catch (Exception ex)
                {

                
                }
                return Sicone;
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
                   // _product.Name = _product.Name.ToUpper();
                    await _unitOfWork.Products.AddAsync(_product);
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
        public async Task<IActionResult> Put( int id,[FromForm] ProductViewModel product)
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
                    Product _product = _unitOfWork.Products.GetSingleOrDefault(e=>e.Id==product.Id);
                    ProductCategory productCategory = _unitOfWork.ProductCategory.GetSingleOrDefault(e => e.Id == product.ProductCategoryId);
                    _product.ProductCategory = productCategory;
                    Fournisseurs _fournisseurs=_unitOfWork.Fournisseurs.GetSingleOrDefault(e=>e.Id==product.FournisseursId);
                    _product.Fournisseurs=_fournisseurs;
                    _product.Name = product.Name;
                    _product.Icon=product.IIcon==null?_product.Icon:product.Icon;
                    _product.BuyingPrice = product.BuyingPrice;
                    _product.DateModified = DateTime.Now;
                    _product.Description = product.Description;
                    _product.UpdatedBy = User.Identity.Name;
                    
                    _unitOfWork.Products.Update(_product);

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
                    Product _product = _unitOfWork.Products.GetSingleOrDefault(e => e.Id == id);
                    if (_product != null)
                    {
                        _unitOfWork.Products.Remove(_product);
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