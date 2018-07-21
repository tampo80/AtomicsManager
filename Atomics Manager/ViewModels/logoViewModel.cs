using Microsoft.AspNetCore.Http;

namespace Atomics_Manager.ViewModels
{
    public class logoViewModel
    {
        public int Id { get; set; }
        public IFormFile Logo { get; set; }
    }
}