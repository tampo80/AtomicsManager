using Microsoft.AspNetCore.Http;

namespace Atomics_Manager.ViewModels
{
    public class logoViewModel
    {
        public string Id { get; set; }
        public IFormFile Logo { get; set; }
    }
}