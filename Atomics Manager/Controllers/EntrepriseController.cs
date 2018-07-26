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
    [Route("api/Entreprise")]
    public class EntrepriseController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public EntrepriseController(IUnitOfWork unitOfWork, ILogger<EntrepriseController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        // GET: api/Entreprise
        [HttpGet]
        public IActionResult Get()
        {
            var Entreprise = _unitOfWork.Entreprise.GetAll().SingleOrDefault(e=>e.Id==e.Id);

            return Ok(Mapper.Map<EntrepriseViewModel>(Entreprise));
        }

        [HttpGet("getlogo")]
        public IActionResult Getlogo()
        {
            var Entreprise = _unitOfWork.Entreprise.GetAll().SingleOrDefault(e=>e.Id==e.Id);
            byte[] Logo = new byte[0];
            string Slogo = string.Empty;
                try
                {
                Logo = Entreprise.Logo;
                Slogo = Convert.ToBase64String(Logo);
                IAttachmentType Mime = Utilities.GetMimeType(Slogo);

                Slogo = "data:" + Mime.MimeType + ";base64," + Slogo;
               }
                catch (Exception ex)
                {

                
                }
           
            return Ok(Slogo);
        }

        // GET: api/Entreprise/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var entreprise = await _unitOfWork.Entreprise.GetSingleOrDefaultAsync(e => e.Id == id);
            
            return Ok(entreprise);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EntrepriseViewModel entreprise)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    Entreprise _entreprise = Mapper.Map<Entreprise>(entreprise);
                   
                    
                    await _unitOfWork.Entreprise.AddAsync(_entreprise);
                    return Ok(await _unitOfWork.SaveChangesAsync());

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Data);
                }
            }
            return BadRequest();
        }


         [HttpPost("uploadLogo")]
        public async Task<IActionResult> uploadLogo([FromForm] logoViewModel logo)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    
                    Entreprise _entreprise =await _unitOfWork.Entreprise.GetSingleOrDefaultAsync(e=>e.Id==Convert.ToInt32(logo.Id));
                   
                      using (var memoryStream = new MemoryStream ()) {
                        await logo.Logo.CopyToAsync (memoryStream);
                        _entreprise.Logo = memoryStream.ToArray ();

                    }

                     _unitOfWork.Entreprise.Update(_entreprise);
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
        public async Task<IActionResult> Put(int id, [FromBody] EntrepriseViewModel entreprise)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    //Entreprise _entreprise = Mapper.Map<Entreprise>(entreprise);
                    var _entreprise=_unitOfWork.Entreprise.GetSingleOrDefault(e=>e.Id==id);

                    _entreprise.Adresse=entreprise.Adresse;
                    _entreprise.email=entreprise.email;
                    _entreprise.FormeJuridique=entreprise.FormeJuridique;
                    _entreprise.Name=entreprise.Name;
                    _entreprise.Tel=entreprise.Tel;
                    _entreprise.titre=entreprise.titre;
                    _entreprise.webSite=entreprise.webSite;
                   // _entreprise.Name="rrtt";

                    _unitOfWork.Entreprise.Update(_entreprise);

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
                    Entreprise _entreprise = _unitOfWork.Entreprise.GetSingleOrDefault(e => e.Id == id);
                    if (_entreprise != null)
                    {
                        _unitOfWork.Entreprise.Remove(_entreprise);
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
