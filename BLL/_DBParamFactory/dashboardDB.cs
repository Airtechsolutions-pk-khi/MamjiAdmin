

using MamjiAdmin._Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Text;
using WebAPICode.Helpers;

namespace BAL.Repositories
{

    public class dashboardDB : baseDB
    {
        public static DataTable _dt;
        public static DataSet _ds;
        public dashboardDB()
           : base()
        {
            _dt = new DataTable();
            _ds = new DataSet();
        }

        public List<DashboardSummary> GetDashboardSummary ()
        {
            try
            {
                var lst = new List<DashboardSummary>();
                SqlParameter[] p = new SqlParameter[0];

                _dt = (new DBHelper().GetTableFromSP)("GetDashboard",p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<DashboardSummary>>();
                    }
                }
                return lst;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
