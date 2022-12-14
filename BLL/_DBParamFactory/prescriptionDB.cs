

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
    public class prescriptionDB : baseDB
    {
        public static PrescriptionBLL repo;
        public static DataTable _dt;
        public static DataSet _ds;
        public prescriptionDB()
           : base()
        {
            repo = new PrescriptionBLL();
            _dt = new DataTable();
            _ds = new DataSet();
        }
        public List<PrescriptionBLL> GetAll()
        {
            try
            {
                var lst = new List<PrescriptionBLL>();
                //SqlParameter[] p = new SqlParameter[1];
                _dt = (new DBHelper().GetTableFromSP)("sp_getPrescription_admin");
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<PrescriptionBLL>>();
                    }
                }
                return lst;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public PrescriptionBLL Get(int id)
        {
            try
            {
                var _obj = new PrescriptionBLL();
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@id", id);
                _dt = (new DBHelper().GetTableFromSP)("sp_GetPrescriptionbyID_Admin", p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        _obj = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<PrescriptionBLL>>().FirstOrDefault();
                    }
                }
                return _obj;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int Insert(PrescriptionBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[11];

                p[0] = new SqlParameter("@CustomerName", data.CustomerName);
                p[1] = new SqlParameter("@Image", data.Image);
                p[2] = new SqlParameter("@Mobile", data.Mobile);
                p[3] = new SqlParameter("@Address", data.Address);
                p[4] = new SqlParameter("@Note", data.Note);
                p[5] = new SqlParameter("@StatusID", data.StatusID);
                p[6] = new SqlParameter("@CreatedBy", data.CreatedBy);
                p[7] = new SqlParameter("@CreatedOn", data.CreatedOn);
                p[8] = new SqlParameter("@LastUpdatedBy", data.LastUpdatedBy);
                p[9] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);
                p[10] = new SqlParameter("@PrescriptionID", data.PrescriptionID);

                rtn = (new DBHelper().ExecuteNonQueryReturn)("dbo.sp_insertPrescription_Admin", p);

                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int Update(PrescriptionBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[11];

                p[0] = new SqlParameter("@CustomerName", data.CustomerName);
                p[1] = new SqlParameter("@Image", data.Image);
                p[2] = new SqlParameter("@Mobile", data.Mobile);
                p[3] = new SqlParameter("@Address", data.Address);
                p[4] = new SqlParameter("@Note", data.Note);
                p[5] = new SqlParameter("@StatusID", data.StatusID);
                p[6] = new SqlParameter("@CreatedBy", data.CreatedBy);
                p[7] = new SqlParameter("@CreatedOn", data.CreatedOn);
                p[8] = new SqlParameter("@LastUpdatedBy", data.LastUpdatedBy);
                p[9] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);
                p[10] = new SqlParameter("@PrescriptionID", data.PrescriptionID);

                rtn = (new DBHelper().ExecuteNonQueryReturn)("dbo.sp_updatePrescription_Admin", p);

                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int Delete(int PrescriptionID)
        {
            try
            {
                int _obj = 0;
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@id", PrescriptionID);

                _obj = (new DBHelper().ExecuteNonQueryReturn)("sp_DeletePrescription", p);

                return _obj;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
