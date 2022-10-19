

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

    public class doctorDB : baseDB
    {
        public static DoctorBLL repo;
        public static DataTable _dt;
        public static DataSet _ds;
        public doctorDB()
           : base()
        {
            repo = new DoctorBLL();
            _dt = new DataTable();
            _ds = new DataSet();
        }

        public List<DoctorBLL> GetAll()
        {
            try
            {
                var lst = new List<DoctorBLL>();
                //SqlParameter[] p = new SqlParameter[1];

                _dt = (new DBHelper().GetTableFromSP)("sp_GetAllPromotion_admin");
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<DoctorBLL>>();
                    }
                }
                return lst;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public DoctorBLL Get(int id)
        {
            try
            {
                var _obj = new DoctorBLL();
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@id", id);
                _dt = (new DBHelper().GetTableFromSP)("sp_GetDoctorbyID_Admin", p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        _obj = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<DoctorBLL>>().FirstOrDefault();
                    }
                }
                return _obj;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int Insert(DoctorBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[14];

                p[0] = new SqlParameter("@FirstName", data.FirstName);
                p[1] = new SqlParameter("@LastName", data.LastName);
                p[2] = new SqlParameter("@FullName", data.FullName);
                p[3] = new SqlParameter("@ImagePath", data.ImagePath);
                p[4] = new SqlParameter("@Email", data.Email);
                p[5] = new SqlParameter("@Profile", data.Profile);
                p[6] = new SqlParameter("@Skills", data.Skills);
                p[7] = new SqlParameter("@Education", data.Education);
                p[8] = new SqlParameter("@StatusID", data.StatusID);
                p[9] = new SqlParameter("@CreatedBy", data.CreatedBy);
                p[10] = new SqlParameter("@CreatedOn", data.CreatedOn);
                p[11] = new SqlParameter("@LastUpdatedBy", data.LastUpdatedBy);
                p[12] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);
                p[13] = new SqlParameter("@doctorID", data.DoctorID);


                rtn = (new DBHelper().ExecuteNonQueryReturn)("dbo.sp_insertDoctor_Admin", p);

                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int Update(DoctorBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[14];

                p[0] = new SqlParameter("@FirstName", data.FirstName);
                p[1] = new SqlParameter("@LastName", data.LastName);
                p[2] = new SqlParameter("@FullName", data.FullName);
                p[3] = new SqlParameter("@ImagePath", data.ImagePath);
                p[4] = new SqlParameter("@Email", data.Email);
                p[5] = new SqlParameter("@Profile", data.Profile);
                p[6] = new SqlParameter("@Skills", data.Skills);
                p[7] = new SqlParameter("@Education", data.Education);
                p[8] = new SqlParameter("@StatusID", data.StatusID);
                p[9] = new SqlParameter("@CreatedBy", data.CreatedBy);
                p[10] = new SqlParameter("@CreatedOn", data.CreatedOn);
                p[11] = new SqlParameter("@LastUpdatedBy", data.LastUpdatedBy);
                p[12] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);
                p[13] = new SqlParameter("@doctorID", data.DoctorID);

                rtn = (new DBHelper().ExecuteNonQueryReturn)("dbo.sp_updateDoctor_Admin", p);

                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int Delete(DoctorBLL data)
        {
            try
            {
                int _obj = 0;
                SqlParameter[] p = new SqlParameter[2];
                p[0] = new SqlParameter("@id", data.DoctorID);
                p[1] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);

                _obj = (new DBHelper().ExecuteNonQueryReturn)("sp_DeleteDoctor", p);

                return _obj;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
