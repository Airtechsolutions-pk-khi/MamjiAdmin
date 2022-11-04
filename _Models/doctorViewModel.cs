using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class doctorViewModel
    {
    }

    public class DoctorBLL
    {
        public int DoctorID { get; set; }
        public string FullName { get; set; }
        public string ImagePath { get; set; }
        public string Email { get; set; }
        public string Skills { get; set; }
        public double? Fees { get; set; }
        public string Gender { get; set; }
        public string Education { get; set; }
        public int StatusID { get; set; }
        public string CreatedBy { get; set; }
        public string LastUpdatedBy { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        //public string Specialities { get; set; }
        //public string Days { get; set; }
        public string TimeSlot { get; set; }
        //public string Times { get; set; }
        public List<TimeBLL> Times { get; set; }
        public List<DaysBLL> Days { get; set; }
        public List<SpecialistBLL> Specialities { get; set; }
        
    }
    public class TimeBLL
    {
        public int TimeID { get; set; }
        public int? DaysID { get; set; }
        public int? DoctorID { get; set; }
        public int? SpecialistID { get; set; }

        public string TimeSlot { get; set; }
    }

}
