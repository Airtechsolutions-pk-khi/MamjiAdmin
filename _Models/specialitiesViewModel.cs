using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class specialitiesViewModel
    {
    }

    public class SpecialistBLL
    {
        public int SpecialistID { get; set; }
        public int DoctorID { get; set; }
        public string SpecialityName { get; set; }
        public int StatusID { get; set; }
    }

}
