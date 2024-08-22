﻿

using MamjiAdmin._Models;
using Nancy.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using WebAPICode.Helpers;

namespace BAL.Repositories
{

    public class ordersDB : baseDB
    {
        public static OrdersBLL repo;
        public static DataTable _dt;
        public static DataSet _ds;
        public ordersDB()
           : base()
        {
            repo = new OrdersBLL();
            _dt = new DataTable();
            _ds = new DataSet();
        }

        public List<OrdersBLL> GetAll(DateTime FromDate, DateTime ToDate)
        {
            try
            {
                var lst = new List<OrdersBLL>();
                SqlParameter[] p = new SqlParameter[2];
              
                p[0] = new SqlParameter("@fromdate", FromDate.Date);
                p[1] = new SqlParameter("@todate", ToDate.Date);

                _dt = (new DBHelper().GetTableFromSP)("sp_rptSalesOrders_Medicine", p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<OrdersBLL>>();
                    }
                }
           
                return lst;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public DataSet Get(int id)
        {
            try
            {
                var _obj = new OrdersBLL();
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@OrderID", id);
                

                _ds = (new DBHelper().GetDatasetFromSP)("sp_GetOrdersbyID_Medicine", p);
              
                return _ds;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int Update(OrdersBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[5];

                p[0] = new SqlParameter("@date", data.LastUpdatedDate);
                p[1] = new SqlParameter("@statusID", data.StatusID);
                p[2] = new SqlParameter("@orderid", data.OrderID);
                p[3] = new SqlParameter("@StatusMsg", data.StatusMsg);
                p[4] = new SqlParameter("@LastUpdatedBy", data.LastUpdateBy);
                rtn = (new DBHelper().ExecuteNonQueryReturn)("sp_UpdateOrderstatusMedicine_Admin", p);

                return rtn;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public int Delete(OrdersBLL data)
        {
            try
            {
                int _obj = 0;
                SqlParameter[] p = new SqlParameter[2];
                p[0] = new SqlParameter("@id", data.OrderID);
                p[1] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);

                _obj = (new DBHelper().ExecuteNonQueryReturn)("sp_DeleteOrders", p);

                return _obj;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
