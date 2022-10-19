using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class daysViewModel
    {
    }

    public class DaysBLL
    {
        public int DaysID { get; set; }
        public int SpecialistID { get; set; }
        public int DoctorID { get; set; }
        public string DaysName { get; set; }
    }

}
