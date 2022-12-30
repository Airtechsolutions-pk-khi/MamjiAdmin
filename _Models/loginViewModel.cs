using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class loginViewModel
    {
    }

    public class LoginBLL
    {        
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Type { get; set; }
        public string Password { get; set; }             
        public Nullable<int> StatusID { get; set; }                
        public string LastUpdateBy { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
    }

}
