
using DAL.Models;
using MamjiAdmin._Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using WebAPICode.Helpers;

namespace BAL.Repositories
{

    public class loginDB : baseDB
    {
        //public static LoginBLL repo;
        public static DataTable _dt;
        public static DataSet _ds;

        public loginDB()
           : base()
        {
            //repo = new LoginBLL();
            _dt = new DataTable();
            _ds = new DataSet();
        }

        public LoginBLL GetAuthenticateUser(string username, string password)
        {
            //var bll = new List<PermissionFormBLL>();
            var repo = new LoginBLL();
            try
            {

                SqlParameter[] p = new SqlParameter[2];
                p[0] = new SqlParameter("@email", username);
                p[1] = new SqlParameter("@password", password);
                _ds = (new DBHelper().GetDatasetFromSP)("sp_authenticateUser_admin", p);
                if (_ds != null)
                {
                    repo = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_ds.Tables[0])).ToObject<List<LoginBLL>>().FirstOrDefault();
                    //repo.PermissionForm = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_ds.Tables[1])).ToObject<List<PermissionFormBLL>>();
                    repo.PermissionForm = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_ds.Tables[1])).ToObject<List<FormPermissionBLL>>();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return repo;
        }
    }
}
