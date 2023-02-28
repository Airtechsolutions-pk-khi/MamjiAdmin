using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class laboratoryViewModel
    {
    }
    public class LaboratoryBLL
    {
        public int LaboratoryID { get; set; }

        public int CustomerID { get; set; }
        public int DiagnoseCatID { get; set; }

        public string FullName { get; set; }
        public string LabReferenceNo { get; set; }

        public string Image { get; set; }

        public Nullable<int> StatusID { get; set; }

        public Nullable<int> LastUpdatedBy { get; set; }

        public Nullable<DateTime> LastUpdatedDate { get; set; }

    }
}
