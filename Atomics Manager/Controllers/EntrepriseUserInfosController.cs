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
    [Route("api/EntrepriseUserInfos")]
    public class EntrepriseUserInfosController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public EntrepriseUserInfosController(IUnitOfWork unitOfWork, ILogger<EntrepriseUserInfosController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var allEntrepriseUserInfos = _unitOfWork.EntrepriseUserInfos.GetAll();
            return Ok(Mapper.Map<IEnumerable<CategoriesViewModel>>(allEntrepriseUserInfos));
        }

        [HttpGet("getentrepriseuserInfosbyuserid/{id}")]
        public IActionResult getEntrepriseUserInfosByUserId([FromRoute] string id)
        {
            EntrepriseUserInfos eUinfos=null;
            if (id != null)
            {
                eUinfos = _unitOfWork.EntrepriseUserInfos.GetAllIncluding(e=>e.Services,a=>a.Agences,d=>d.Departements).SingleOrDefault(e => e.ApplicationUserId == id);
            //    if (Res.ToList().Count() > 0)
            //    {
            //        return Ok(true);
            //    }

            //}
            //else
            //{
            //    return Ok(false);
              
            }
            return Ok(Mapper.Map<EntrepriseUserInfosViewModel>(eUinfos));
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EntrepriseUserInfosViewModel entrepriseUserInfos)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    EntrepriseUserInfos _entrepriseUserInfos = Mapper.Map<EntrepriseUserInfos>(entrepriseUserInfos);
                    
                    Agences _agence=_unitOfWork.Agences.GetSingleOrDefault(e=>e.Id==entrepriseUserInfos.AgencesId);
                    Services _service=_unitOfWork.Services.GetSingleOrDefault(e=>e.Id==entrepriseUserInfos.ServicesId);

                        _entrepriseUserInfos.Agences=_agence;
                        _entrepriseUserInfos.Services=_service;
                       _entrepriseUserInfos.ApplicationUserId=entrepriseUserInfos.ApplicationUserId;
                    _unitOfWork.EntrepriseUserInfos.Add(_entrepriseUserInfos);
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
        public async Task<IActionResult> Put(int id, [FromBody] EntrepriseUserInfos entrepriseUserInfos)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    EntrepriseUserInfos _entrepriseUserInfos = Mapper.Map<EntrepriseUserInfos>(entrepriseUserInfos);
                    
                    _unitOfWork.EntrepriseUserInfos.Update(_entrepriseUserInfos);
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
                    EntrepriseUserInfos _entrepriseUserInfos = _unitOfWork.EntrepriseUserInfos.GetSingleOrDefault(e => e.Id == id);
                    if (_entrepriseUserInfos != null)
                    {
                        _unitOfWork.EntrepriseUserInfos.Remove(_entrepriseUserInfos);
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