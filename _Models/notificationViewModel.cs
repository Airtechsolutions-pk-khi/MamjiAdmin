using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class notificationViewModel
    {
    }

    public class NotificationBLL
    {
        public int NotificationID { get; set; }
        public string NotificationType { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? NotificationDate { get; set; }
        public int? IsRead { get; set; }
        public int? StatusID { get; set; }
    }
}