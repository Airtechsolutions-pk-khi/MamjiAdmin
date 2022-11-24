using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class medicalServiceViewModel
    {
    }
    public class medicalServiceBLL
    {
        public int MedicalServiceID { get; set; }
        public int NursingTypeID { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Requirment { get; set; }
        public float Fees { get; set; }
        public int StatusID { get; set; }
    }
}
