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
    public class laboratoryDB : baseDB
    {
        public static LaboratoryBLL repo;
        public static DataTable _dt;
        public static DataSet _ds;
        public laboratoryDB() : base()
        {
            repo = new LaboratoryBLL();
            _dt = new DataTable();
            _ds = new DataSet();
        }
        public List<LaboratoryBLL> GetAll()
        {
            try
            {
                var lst = new List<LaboratoryBLL>();
                _dt = (new DBHelper().GetTableFromSP)("sp_getAllReports");
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<LaboratoryBLL>>();
                    }
                }
                return lst;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public LaboratoryBLL Get(int id)
        {
            try
            {
                var _obj = new LaboratoryBLL();
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@id", id);
                _dt = (new DBHelper().GetTableFromSP)("sp_GetReportbyID_Admin", p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        _obj = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<LaboratoryBLL>>().FirstOrDefault();
                    }
                }
                return _obj;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public int Insert(LaboratoryBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[6];

                p[0] = new SqlParameter("@CustomerID", data.CustomerID);
                p[1] = new SqlParameter("@ImagePath", data.Image);
                p[2] = new SqlParameter("@LabReferenceNo", data.LabReferenceNo);
                p[3] = new SqlParameter("@StatusID", data.StatusID);
                p[4] = new SqlParameter("@LastUpdatedBy", data.LastUpdatedBy);
                p[5] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);

                rtn = (new DBHelper().ExecuteNonQueryReturn)("sp_insertReport_Admin", p);

                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int Update(LaboratoryBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[7];

                p[0] = new SqlParameter("@CustomerID", data.CustomerID);
                p[1] = new SqlParameter("@ImagePath", data.Image);
                p[2] = new SqlParameter("@LaboratoryID", data.LaboratoryID);
                p[3] = new SqlParameter("@LabReferenceNo", data.LabReferenceNo);
                p[4] = new SqlParameter("@StatusID", data.StatusID);
                p[5] = new SqlParameter("@LastUpdatedBy", data.LastUpdatedBy);
                p[6] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);

                rtn = (new DBHelper().ExecuteNonQueryReturn)("dbo.sp_updateReport_Admin", p);

                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int Delete(LaboratoryBLL data)
        {
            try
            {
                int _obj = 0;
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@id", data.LaboratoryID);

                _obj = (new DBHelper().ExecuteNonQueryReturn)("sp_DeleteLabReport", p);

                return _obj;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
