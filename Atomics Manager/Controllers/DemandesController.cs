using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Primitives;
using Atomics_Manager.Helpers;
using Atomics_Manager.ViewModels;
using AutoMapper;
using DAL;
using DAL.Core.Interfaces;
using DAL.Models;
using DAL.Models.enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OpenIddict.EntityFrameworkCore;
using OpenIddict.Validation;

namespace Atomics_Manager.Controllers

{
    [Produces("application/json")]
    [Route("api/Demandes")]
    public class DemandesController : Controller
    {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;
         private readonly IAccountManager _accountManager;
        public DemandesController(IAccountManager accountManager,IUnitOfWork unitOfWork, ILogger<DemandesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _accountManager=accountManager;

        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get()
        {
           var username= User.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value;
            //if (User.Identity.Name==null)
            //{
            //   return Unauthorized();
            //}
            string usersId =await getCurrentUserId();
            var allDemandes = _unitOfWork.Demandes.GetAllIncluding(e=>e.Product,f=>f.user,y=>y.CurrentStat).Where(e=>e.userId==usersId).OrderByDescending(e=>e.Id);
            return Ok(Mapper.Map<IEnumerable<DemandesViewModel>>(allDemandes));
        }


       [HttpGet("in")]
       [Authorize(AuthenticationSchemes = OpenIddictValidationDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetIn()
        {
            string usersId = User.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value;
            if (usersId == null)
            {
                return Unauthorized();
            }
           // string usersId = await getCurrentUserId();

            List<Demandes> DemandesIn = new List<Demandes>();

            var demandeAction = _unitOfWork.DemandesAction.Find(e => e.IsActive);

          //  DemandesIn = _unitOfWork.Demandes.GetAllIncluding(e => e.CurrentStat, k => k.user, y => y.Product).Where(e => e.userId == usersId).OrderByDescending(e => e.Id).ToList();

            var MyGroupMembers = _unitOfWork.GroupMember.Find(e => e.UserId == usersId).Distinct() ;

            List<Group> MyGroups = new List<Group>();

            foreach (var member in MyGroupMembers)
            {
                MyGroups.Add(_unitOfWork.Group.GetAll().FirstOrDefault(e => e.Id == member.GroupId));
            }


           


            List<ActionTarget> actionTargets = new List<ActionTarget>();


            foreach (var MyGroup in MyGroups)
            {
                actionTargets = actionTargets.Union(_unitOfWork.ActionTarget.GetAllIncluding(a=>a.Actions).Where(e => e.GroupId==MyGroup.Id).ToList()).ToList();

            }



           

            List<Actions> MyActions = new List<Actions>();

            foreach (var actionTarget in actionTargets)
            {
                MyActions.Add(actionTarget.Actions);
               // DemandesIn = DemandesIn.Union(_unitOfWork.Demandes.GetAllIncluding(e => e.CurrentStat, k => k.user, y => y.Product).Where(e => e.DemandesAction.));
            }

            List<DemandesAction> demandeaction = new List<DemandesAction>();

            foreach (var item in MyActions)
            {
                demandeaction = demandeaction.Union(_unitOfWork.DemandesAction.GetAllIncluding(e => e.Demandes).Where(a=>a.ActionsId==item.Id && a.IsActive)).ToList();
            }

            foreach (var demandes in demandeaction)
            {
              DemandesIn=DemandesIn.Union(_unitOfWork.Demandes.GetAllIncluding(e => e.CurrentStat, k => k.user, y => y.Product).Where(e=>e.Id==demandes.DemandesId).ToList()).ToList();
            }
            return Ok(Mapper.Map<IEnumerable<DemandesViewModel>>(DemandesIn).Select(e =>
            {
                e.AgenceName = getUserAgence(e.userId);
                e.ServiceName = getUserService(e.userId);
                return e;
            }
            
                
                
                ));
        }

       
       [HttpGet("level")]
       public async Task<IActionResult> BuildWorkFlow()
       {
              var WORKFLOW=await _unitOfWork.ApprobationLevel.GetAllAsyn();
              return Ok(WORKFLOW.ToList().OrderBy(e=>e.Level));
       }


        private bool IsExpert(string userId,int ExpertGId)
        {
            var APGm = _unitOfWork.ApprobationLevel.GetAllIncluding(e => e.APGmembers).Where(e => e.Id == ExpertGId).FirstOrDefault();
            if (APGm.APGmembers.FirstOrDefault(e=>e.MemberId==userId)!=null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        private List<ApprobationLevel> APGExperts()
        {
            return _unitOfWork.ApprobationLevel.Find(e=>e.TypeApprovalGroup==TypeApprovalGroup.EXPERTS).ToList();
        }
        private string getUserService(string userid)
        {
          var entrepriseUserInfos=_unitOfWork.EntrepriseUserInfos.GetAll().FirstOrDefault(e=>e.ApplicationUserId==userid);
          string ServiceName=string.Empty;
          if (entrepriseUserInfos!=null)
          {
                var service = _unitOfWork.Services.GetAll().FirstOrDefault(e => e.Id == entrepriseUserInfos.ServicesId);
                ServiceName = service != null ? service.Name:"NAP" ;
          }

          return ServiceName;
        }

        private string getUserAgence(string userid)
         {
          var entrepriseUserInfos=_unitOfWork.EntrepriseUserInfos.GetAll().FirstOrDefault(e=>e.ApplicationUserId==userid);
          string AgenceName=string.Empty;
          if (entrepriseUserInfos!=null)
          {
                AgenceName = _unitOfWork.Agences.GetAll().FirstOrDefault(e=>e.Id==entrepriseUserInfos.AgencesId).Name;
          }

          return AgenceName;
        }
        private EntrepriseUserInfos getUserInfos(string usersId)
        {

            return _unitOfWork.EntrepriseUserInfos.GetAll().FirstOrDefault(e => e.ApplicationUserId == usersId);
        }

        private bool IsHeadService(string UserId)
        {
            int serviceId = _unitOfWork.EntrepriseUserInfos.GetAll().FirstOrDefault(e=>e.ApplicationUserId==UserId).ServicesId;

            var service = _unitOfWork.Services.GetAll().FirstOrDefault(e => e.Id == serviceId);

            if (service!=null)

            {
                if (service.Head!=null)
                {
                    string headId = service.Head.Id;
                    if (headId != string.Empty)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
                
            }
            else
            {
                return false;
            }

           

        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DemandesViewModel demandes)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Demandes _demandes = Mapper.Map<Demandes>(demandes);
                    Product _product=_unitOfWork.Products.GetAll().FirstOrDefault(e=>e.Id==demandes.ProductId);
                    ApplicationUser user=await _accountManager.GetUserByIdAsync(_demandes.userId);
                    _demandes.Product=_product;
                    _demandes.CurrentStat = WorkflowEntryStat();
                    _demandes.DateDemande = DateTime.Now;
                    _demandes.Process= _unitOfWork.Process.GetAll().FirstOrDefault(e => e.Name == GlobalVars.MAIN_PROCESS_NAME);
                    _unitOfWork.Demandes.Add(_demandes);
                    List<DemandesAction> demandeActions = new List<DemandesAction>();
                    Actions subMitterAction = new Actions();
                    var transistion = _unitOfWork.Transition.Find(e => e.EtatActuelId == _demandes.CurrentStatId);
                    foreach (var item in transistion)
                    {
                        var transitionAction = _unitOfWork.TransitionActions.GetAllIncluding(e=>e.Actions, k=>k.Transition).Where(e => e.TransitionId == item.Id);
                        foreach (var TA in transitionAction)
                        {
                            var submitterAction = _unitOfWork.ActionTarget.GetAll().FirstOrDefault(e => e.ActionsId == TA.ActionsId && e.Target == Target.Demandeur && TA.Transition.EtatActuel.TypeEtats==TypeEtats.Debut);

                            if (submitterAction!=null)
                            {
                                subMitterAction = TA.Actions;
                                demandeActions.Add(new DemandesAction
                                {
                                    Demandes = _demandes,
                                    Transition = item,
                                    Actions = TA.Actions,
                                    IsActive = false,
                                    IsComplete = true,
                                    

                                });
                            }
                            else
                            {
                                demandeActions.Add(new DemandesAction
                                {
                                    Demandes = _demandes,
                                    Transition = item,
                                    Actions = TA.Actions,
                                    IsActive = true,
                                    IsComplete = false,

                                });
                            }

                          
                        }
                    }
                    foreach (var item in demandeActions)
                    {
                        _unitOfWork.DemandesAction.Add(item);
                    }
                    _unitOfWork.ActionsHistories.Add(new ActionsHistories {
                        Demandes = _demandes,
                        dateOperation = DateTime.Now,
                        User = user,
                        Etat = _demandes.CurrentStat,
                        Actions = subMitterAction,
                        Comment="Demande soumis"

                    });
                    await _unitOfWork.SaveChangesAsync();

                    if (CanMoveTonextStat(_demandes.Id))
                    {
                        MoveState(_demandes.Id);
                    }
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

        private void MoveState(int demandeId)
        {
            var demande = _unitOfWork.Demandes.GetAll().FirstOrDefault(e=>e.Id==demandeId);
            var transitions = _unitOfWork.Transition.GetAllIncluding(e => e.EtatActuel,k=>k.EtatSuivant).Where(e=>e.EtatActuel.Id==demande.CurrentStatId);
            Etat currentStat = demande.CurrentStat;
            foreach (var tran in transitions)
            {
                var TDA = _unitOfWork.DemandesAction.Find(e => e.TransitionId == tran.Id && e.IsComplete && e.DemandesId==demandeId);
                if (TDA.Count>0)
                {

                    demande.CurrentStat = tran.EtatSuivant;
                    _unitOfWork.SaveChanges();
                    LoadNextStep(tran.EtatSuivant, demande);
                    break;
                }
            }
           
        }

        private void LoadNextStep(Etat stat,Demandes _demandes)
        {
            var transitions = _unitOfWork.Transition.Find(e => e.EtatActuelId==stat.Id);
          //  List<TransitionActions> TA = new List<TransitionActions>();
            List<DemandesAction> demandeActions = new List<DemandesAction>();
            foreach (var transition in transitions)
            {
                var transitionAction = _unitOfWork.TransitionActions.GetAllIncluding(e => e.Actions, k => k.Transition).Where(e => e.TransitionId == transition.Id);
                foreach (var TA in transitionAction)
                {
                    var submitterAction = _unitOfWork.ActionTarget.GetAll().FirstOrDefault(e => e.ActionsId == TA.ActionsId && e.Target == Target.Demandeur && TA.Transition.EtatActuel.TypeEtats == TypeEtats.Debut);

                    if (submitterAction != null)
                    {
                        demandeActions.Add(new DemandesAction
                        {
                            Demandes = _demandes,
                            Transition = transition,
                            Actions = TA.Actions,
                            IsActive = false,
                            IsComplete = true,

                        });
                    }
                    else
                    {
                        demandeActions.Add(new DemandesAction
                        {
                            Demandes = _demandes,
                            Transition = transition,
                            Actions = TA.Actions,
                            IsActive = true,
                            IsComplete = false,

                        });
                    }


                }
            }
            foreach (var item in demandeActions)
            {
                _unitOfWork.DemandesAction.Add(item);
            }

             _unitOfWork.SaveChanges();
        }

        private bool CanMoveTonextStat(int demandesId)
        {

            List<DemandesAction> DA = _unitOfWork.DemandesAction.GetAllIncluding(e => e.Actions, k => k.Transition).Where(e => e.DemandesId == demandesId).ToList() ;
            List<Transition> transitions = DA.Select(
                e => { return e.Transition; }
            ).ToList() ;
            bool completed = false;
            foreach (var item in transitions)
            {
                var TDA = _unitOfWork.DemandesAction.Find(e=>e.TransitionId==item.Id && e.IsActive);
                if(TDA.Count>0)
                {
                    completed = false;
                }
                else
                {
                    completed = true;
                }

            }
            return completed;
        }

        private Etat WorkflowEntryStat()
        {
            int processId = 0;
            Process Pro = _unitOfWork.Process.GetAll().FirstOrDefault(e => e.Name == GlobalVars.MAIN_PROCESS_NAME);
            Etat firstEtat = new Etat();
            if (Pro!=null)
            {
                processId = Pro.Id;
                firstEtat = _unitOfWork.Etat.GetAll().FirstOrDefault(e => e.ProcessId == processId && e.TypeEtats == TypeEtats.Debut);
            }
           
            return firstEtat;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] DemandesViewModel demandes)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Demandes _demandes = Mapper.Map<Demandes>(demandes);
                    _unitOfWork.Demandes.Update(_demandes);
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
        [HttpPost("commentaction")]
        public async Task<IActionResult> commentAction([FromBody]commentActionViewModel commentAction)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Demandes demande = _unitOfWork.Demandes.GetAll().FirstOrDefault(e=>e.Id==commentAction.DemandesId);

                    var demandeAction = _unitOfWork.DemandesAction.GetAllIncluding(e=>e.Actions).Where(e => e.DemandesId==demande.Id && e.IsActive);

                    var DA = demandeAction.Where(e=>e.Actions.TypeAction==commentAction.ActionsType);


                    if (DA.Count()>1)
                    {
                        DemandesAction demandeaction = DA.FirstOrDefault();
                        demandeaction.IsActive = false;
                        demandeaction.IsComplete = true;



                        await _unitOfWork.SaveChangesAsync();
                    }
                    else if(DA.Count()==1)
                    {
                        DemandesAction demandeaction = DA.FirstOrDefault();

                        demandeaction.IsActive = false;
                        demandeaction.IsComplete = true;
                        _unitOfWork.DemandesAction.Update(demandeaction);


                        await _unitOfWork.SaveChangesAsync();

                        var newAD = _unitOfWork.DemandesAction.Find(e=>e.IsActive==true && e.DemandesId==demande.Id);

                        foreach (var ad in newAD)
                        {
                            ad.IsActive = false;
                            ad.IsComplete = false;
                        }

                        _unitOfWork.ActionsHistories.Add(new ActionsHistories
                        {
                            Demandes = demande,
                            dateOperation = DateTime.Now,
                            User =await _accountManager.GetUserByUserNameAsync(User.Identity.Name),
                            Etat = _unitOfWork.Etat.GetAll().FirstOrDefault(e=>e.Id== demande.CurrentStatId),
                            Actions = demandeaction.Actions,
                            Comment=commentAction.Comment

                        });
                        await _unitOfWork.SaveChangesAsync();

                        if (CanMoveTonextStat(demande.Id))
                        {
                            MoveState(demande.Id);
                        }

                    }


                 //   var actions = _unitOfWork.TransitionActions.GetAllIncluding(a => a.Actions).Where(e => e.TransitionId == DA.TransitionId);



                   


                   

                    

                  
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

        private async Task<string> getCurrentUserId()
        {
            ApplicationUser user=await _accountManager.GetUserByUserNameAsync(User.Identity.Name);
            return user.Id;
        }
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Demandes _demandes = _unitOfWork.Demandes.GetSingleOrDefault(e => e.Id == id);
                    if (_demandes != null)
                    {
                        _unitOfWork.Demandes.Remove(_demandes);
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