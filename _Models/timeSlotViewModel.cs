﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class timeSlotViewModel
    {
    }
    
    public class TimeSlotBLL 
    { 
        public int TimeSlotID { get; set; }
        public string TimeSlot { get; set; }
        public int? StatusID { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

}
