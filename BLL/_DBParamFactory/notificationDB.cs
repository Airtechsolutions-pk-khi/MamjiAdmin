

using MamjiAdmin._Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using WebAPICode.Helpers;

namespace BAL.Repositories
{

    public class notificationDB : baseDB
    {
        public static NotificationBLL repo;
        public static DataTable _dt;
        public static DataSet _ds;
        public notificationDB()
           : base()
        {
            repo = new NotificationBLL();
            _dt = new DataTable();
            _ds = new DataSet();
        }

        //public List<NotificationBLL> GetAll()
        //{
        //    try
        //    {
        //        var lst = new List<OffersBLL>();
        //        SqlParameter[] p = new SqlParameter[1];
        //        p[0] = new SqlParameter("@brandid", brandID);

        //        _dt = (new DBHelper().GetTableFromSP)("sp_getOffers", p);
        //        if (_dt != null)
        //        {
        //            if (_dt.Rows.Count > 0)
        //            {
        //                lst = _dt.DataTableToList<OffersBLL>();
        //            }
        //        }
        //        return lst;
        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}

        public OffersBLL Get(int id, int brandID)
        {
            try
            {
                var _obj = new OffersBLL();
                SqlParameter[] p = new SqlParameter[2];
                p[0] = new SqlParameter("@id", id);
                p[1] = new SqlParameter("@brandid", brandID);

                _dt = (new DBHelper().GetTableFromSP)("sp_GetOffersbyID_Admin", p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        _obj = _dt.DataTableToList<OffersBLL>().FirstOrDefault();
                    }
                }
                return _obj;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
