// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Atomics_Manager.Controllers {
    public class HomeController : Controller {
        public IActionResult Index () {
            return View ();
        }

        public IActionResult Error () {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View ();
        }

        // GET api/values
        [Route ("api/[controller]"), Authorize, HttpGet]
        public IEnumerable<string> Get () {
            return new string[] { "value1", "value2" };
        }
    }
}