using DAL.Models.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Atomics_Manager.ViewModels
{
    public class ActionsViewModel
    {
    public int Id { get; set; }
    public TypeAction TypeAction { get; set; }

    public string  ProcessName { get; set; }
    public int ProcessId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
}
