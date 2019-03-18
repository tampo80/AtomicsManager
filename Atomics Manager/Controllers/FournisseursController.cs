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
using Newtonsoft.Json;

namespace Atomics_Manager.Controllers {
    [Produces ("application/json")]
    [Route ("api/Fournisseurs")]
    public class FournisseursController : Controller {
        private IUnitOfWork _unitOfWork;
        readonly ILogger _logger;

        public FournisseursController (IUnitOfWork unitOfWork, ILogger<FournisseursController> logger) {
            _unitOfWork = unitOfWork;
            _logger = logger;

        }

        [HttpGet]
        public IActionResult Get () {
            var allFournisseurs = _unitOfWork.Fournisseurs.GetAllIncluding (e => e.Villes, f => f.Devises);

            return Ok (Mapper.Map<IEnumerable<FournisseursViewModel>> (allFournisseurs).Select (e => { e.Secteurs = getSecteursByFournisseursId (e.Id); return e; }));

        }

        [HttpGet ("{id}")]
        public IActionResult GetfournisseurById (int id) {
            var _fournisseurs = _unitOfWork.Fournisseurs.GetAllIncluding (e => e.Villes, f => f.Devises).FirstOrDefault (e => e.Id == id);
            EditFournisseurViewModel fou = new EditFournisseurViewModel ();

            fou = Mapper.Map<EditFournisseurViewModel> (_fournisseurs);

            BankInfos bkinfo = _unitOfWork.BankInfos.GetAllIncluding (e => e.Villes).FirstOrDefault (e => e.Id == id);
            fou.AccountName = bkinfo.AccountName;
            fou.AccountNumber = bkinfo.AccountNumber;
            fou.Adressebk = bkinfo.Adrresse;
            fou.BankName = bkinfo.BankName;
            fou.Iban = bkinfo.IBAN;
            fou.Tel = bkinfo.TelephoneNumbers;
            fou.Villebk = Mapper.Map<EditVillesViewModel> (_unitOfWork.Villes.GetSingleOrDefault (e => e.Id == bkinfo.Villes.Id));
            fou.Paysbk = Mapper.Map<PaysViewModel> (_unitOfWork.Pays.GetSingleOrDefault (e => e.Id == fou.Villebk.PaysId));
            fou.Pays = Mapper.Map<PaysViewModel> (_unitOfWork.Pays.GetSingleOrDefault (e => e.Id == fou.Villes.PaysId));
            fou.Emailbk = bkinfo.Email;
            fou.Contract = _unitOfWork.DocumentsFournisseurs.GetSingleOrDefault (e => e.Fournisseurs.Id == _fournisseurs.Id && e.typeDocFournisseurs == TypeDocFournisseurs.contrat).Documents;
            fou.Secteurs = getSecteursByFournisseursById (_fournisseurs.Id);
            fou.TypePayement = (int) _fournisseurs.TypePayments;
            return Ok (fou);

        }

        [HttpGet ("Isavailable/{name}")]
        public IActionResult Isavailable ([FromRoute] string name) {
            if (name != null) {
                var Res = _unitOfWork.Fournisseurs.Find (e => e.NomSociete.ToUpper () == name.ToUpper ());
                if (Res.ToList ().Count () > 0) {
                    return Ok (true);
                }

            } else {
                return Ok (false);
            }
            return Ok (false);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post ([FromForm] EditFournisseursViewModel fournisseurs)

        {
            if (ModelState.IsValid) {
                try {
                    DocumentsFournisseurs documentsFournisseurs = new DocumentsFournisseurs ();

                    using (var memoryStream = new MemoryStream ()) {
                        await fournisseurs.Contract.CopyToAsync (memoryStream);
                        documentsFournisseurs.Documents = memoryStream.ToArray ();
                        documentsFournisseurs.typeDocFournisseurs = TypeDocFournisseurs.contrat;
                        documentsFournisseurs.DocumentName = fournisseurs.Contract.FileName;
                    }

                    Fournisseurs _fournisseurs = new Fournisseurs {
                        Adresse = fournisseurs.Adresse,
                        AlternatePhoneNumber = fournisseurs.PhoneNumber,
                        NomDg = fournisseurs.NomDg,
                        NomSociete = fournisseurs.NomSociete,
                        PhoneNumber = fournisseurs.PhoneNumber,
                        CodePostale = fournisseurs.CodePostale,
                        Email = fournisseurs.Email,
                        Titre = fournisseurs.Titre,
                        Emailcommande = fournisseurs.Emailcommande,
                        FormeJuridique = fournisseurs.FormeJuridique,
                        TelCommande = fournisseurs.TelCommande,
                        TelDg = fournisseurs.TelDg,
                        Villes = JsonConvert.DeserializeObject<Villes> (fournisseurs.Ville),
                        Devises = JsonConvert.DeserializeObject<Devises> (fournisseurs.Devises),
                        TypePayments = (TypePayments) Convert.ToInt32 (fournisseurs.TypePayement),
                        BankInfos = new BankInfos {
                        AccountName = fournisseurs.AccountName,
                        AccountNumber = fournisseurs.AccountNumber,
                        Adrresse = fournisseurs.Adressebk,
                        BankName = fournisseurs.BankName,
                        Email = fournisseurs.Emailbk,
                        IBAN = fournisseurs.Iban,
                        TelephoneNumbers = fournisseurs.Tel,
                        Villes = JsonConvert.DeserializeObject<Villes> (fournisseurs.Villebk),

                        }

                    };

                    var deviseF = _unitOfWork.Devises.GetSingleOrDefaultAsync (e => e.Id == _fournisseurs.Devises.Id);
                    var villeF = _unitOfWork.Villes.GetSingleOrDefaultAsync (e => e.Id == _fournisseurs.Villes.Id);
                    var villeBF = _unitOfWork.Villes.GetSingleOrDefaultAsync (e => e.Id == _fournisseurs.BankInfos.Villes.Id);

                    _fournisseurs.Villes = villeF.Result;
                    _fournisseurs.Devises = deviseF.Result;
                    _fournisseurs.BankInfos.Villes = villeBF.Result;

                    _fournisseurs.NomSociete = _fournisseurs.NomSociete.ToUpper ();
                    documentsFournisseurs.Fournisseurs = _fournisseurs;

                    _unitOfWork.DocumentsFournisseurs.Add (documentsFournisseurs);

                    foreach (var item in fournisseurs.Secteurs[0].Split (',')) {
                        var sec = _unitOfWork.Secteurs.GetSingleOrDefault (e => e.Id == Convert.ToInt32 (item));
                        _unitOfWork.SecteursFournisseurs.Add (new SecteursFournisseurs {
                            Secteurs = sec,
                                Fournisseurs = _fournisseurs
                        });
                    }

                    await _unitOfWork.SaveChangesAsync ();
                    return Ok ("OK");

                } catch (Exception ex) {

                    return BadRequest (ex.Data);
                }
            } else {
                return BadRequest (ModelState);
            }
        }

        private string[] getSecteursByFournisseursId (int Id) {
            var Secteurs = _unitOfWork.SecteursFournisseurs.GetAllIncluding (e => e.Secteurs).Where (e => e.FournisseursId == Id);
            List<string> Sec = new List<string> ();
            foreach (var sec in Secteurs) {
                Sec.Add (sec.Secteurs.Name);
            }

            return Sec.ToArray<string> ();
        }

        private List<int> getSecteursByFournisseursById (int Id) {
            var Secteurs = _unitOfWork.SecteursFournisseurs.GetAllIncluding (e => e.Secteurs).Where (e => e.FournisseursId == Id);
            List<int> Sec = new List<int> ();
            foreach (var sec in Secteurs) {
                Sec.Add (sec.Secteurs.Id);
            }

            return Mapper.Map<List<int>> (Sec);
        }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public async Task<IActionResult> Put (int id, [FromForm] EditFournisseursViewModel fournisseurs) {
            if (ModelState.IsValid) {
                try {
                    DocumentsFournisseurs documentsFournisseurs = new DocumentsFournisseurs ();
                    if (fournisseurs.Contract != null) {
                        using (var memoryStream = new MemoryStream ()) {
                            await fournisseurs.Contract.CopyToAsync (memoryStream);
                            documentsFournisseurs.Documents = memoryStream.ToArray ();
                            documentsFournisseurs.typeDocFournisseurs = TypeDocFournisseurs.contrat;
                            documentsFournisseurs.DocumentName = fournisseurs.Contract.FileName;
                        }
                    }

                    Fournisseurs fou = _unitOfWork.Fournisseurs.GetSingleOrDefault (e => e.Id == id);

                    if (fou != null) {
                        fou.Adresse = fournisseurs.Adresse;
                        fou.AlternatePhoneNumber = fournisseurs.PhoneNumber;
                        fou.NomDg = fournisseurs.NomDg;
                        fou.NomSociete = fournisseurs.NomSociete;
                        fou.PhoneNumber = fournisseurs.PhoneNumber;
                        fou.CodePostale = fournisseurs.CodePostale;
                        fou.Email = fournisseurs.Email;
                        fou.Titre = fournisseurs.Titre;
                        fou.Emailcommande = fournisseurs.Emailcommande;
                        fou.FormeJuridique = fournisseurs.FormeJuridique;
                        fou.TelCommande = fournisseurs.TelCommande;
                        fou.TelDg = fournisseurs.TelDg;
                        fou.TypePayments = (TypePayments) Convert.ToInt32 (fournisseurs.TypePayement);
                        var deviseF = _unitOfWork.Devises.GetSingleOrDefault (e => e.Id == Convert.ToInt32 (fournisseurs.Devises));
                        var villeF = _unitOfWork.Villes.GetSingleOrDefault (e => e.Id == Convert.ToInt32 (fournisseurs.Ville));
                        var villeBF = _unitOfWork.Villes.GetSingleOrDefault (e => e.Id == Convert.ToInt32 (fournisseurs.Villebk));

                        fou.Villes = villeF;
                        fou.Devises = deviseF;

                        BankInfos bkinfo = _unitOfWork.BankInfos.GetSingleOrDefault (e => e.FournisseursId == fou.Id);
                        bkinfo.AccountName = fournisseurs.AccountName;
                        bkinfo.AccountNumber = fournisseurs.AccountNumber;
                        bkinfo.Adrresse = fournisseurs.Adressebk;
                        bkinfo.BankName = fournisseurs.BankName;
                        bkinfo.Email = fournisseurs.Emailbk;
                        bkinfo.IBAN = fournisseurs.Iban;
                        bkinfo.TelephoneNumbers = fournisseurs.Tel;
                        bkinfo.Villes = villeBF;

                        fou.BankInfos.Villes = villeBF;

                        fou.NomSociete = fou.NomSociete.ToUpper ();
                    }

                    DocumentsFournisseurs docF = _unitOfWork.DocumentsFournisseurs.GetSingleOrDefault (e => e.Fournisseurs.Id == fou.Id);

                    // documentsFournisseurs.Fournisseurs = fou;
                    List<Secteurs> SercteursArrivant = new List<Secteurs> ();
                    List<Secteurs> SercteursActuelles = new List<Secteurs> ();
                    List<Secteurs> SercteursAsupprimer = new List<Secteurs> ();
                    List<Secteurs> SercteursAJouter = new List<Secteurs> ();

                    foreach (var item in fournisseurs.Secteurs[0].Split (',')) {

                        var sec = _unitOfWork.Secteurs.GetSingleOrDefault (e => e.Id == Convert.ToInt32 (item));

                        if (sec != null) {
                            SercteursArrivant.Add (sec);
                        }

                    }

                    SercteursActuelles = _unitOfWork.SecteursFournisseurs.GetAllIncluding (e => e.Secteurs, e => e.Fournisseurs).Where (f => f.FournisseursId == id).Select (e => e.Secteurs).ToList ();

                    SercteursAsupprimer = SercteursActuelles.Except (SercteursArrivant).ToList ();

                    SercteursAJouter = SercteursArrivant.Except (SercteursActuelles).ToList ();

                    foreach (var sec in SercteursAsupprimer) {
                        _unitOfWork.SecteursFournisseurs.Remove (_unitOfWork.SecteursFournisseurs.GetSingleOrDefault (e => e.SecteursId == sec.Id && e.FournisseursId == fou.Id));

                    }

                    foreach (var sec in SercteursAJouter) {
                        _unitOfWork.SecteursFournisseurs.Add (
                            new SecteursFournisseurs {
                                Secteurs = sec,
                                    Fournisseurs = fou
                            }
                        );
                    }

                    await _unitOfWork.SaveChangesAsync ();
                    return Ok ("OK");

                } catch (Exception ex) {

                    return BadRequest (ex.Data);
                }
            } else {
                return BadRequest (ModelState);
            }
        }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public async Task<IActionResult> Delete (int id) {
            if (ModelState.IsValid) {
                try {
                    Fournisseurs _fournisseurs = _unitOfWork.Fournisseurs.GetSingleOrDefault (e => e.Id == id);
                    if (_fournisseurs != null) {
                        _unitOfWork.Fournisseurs.Remove (_fournisseurs);
                        await _unitOfWork.SaveChangesAsync ();
                        return Ok ("OK");
                    } else {
                        return BadRequest ();
                    }

                } catch (Exception ex) {

                    return BadRequest (ex.Data);
                }
            } else {
                return BadRequest (ModelState);
            }
        }
        public static T Deserialize<T> (string json) {
            Newtonsoft.Json.JsonSerializer s = new JsonSerializer ();
            return s.Deserialize<T> (new JsonTextReader (new StringReader (json)));
        }
    }
}