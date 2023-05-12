using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
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

        public IFormFile SelectedFile { get; set; }

        public Nullable<int> StatusID { get; set; }

        public Nullable<int> LastUpdatedBy { get; set; } = 1;

        public Nullable<DateTime> LastUpdatedDate { get; set; }
        public string FilePath { get; set; } = "";
        public string FullName { get; set; }

    }
}
