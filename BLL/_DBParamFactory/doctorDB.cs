

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

                _dt = (new DBHelper().GetTableFromSP)("sp_Doctor_admin");
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<DoctorBLL>>();
                    }
                }
                return lst;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public List<SpecialistBLL> GetSpeciality()
        {
            try
            {
                var lst = new List<SpecialistBLL>();
                //SqlParameter[] p = new SqlParameter[1];

                _dt = (new DBHelper().GetTableFromSP)("sp_GetALLSpecialities_admin");
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<SpecialistBLL>>();
                    }
                }
                return lst;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public List<DaysBLL> GetDocDays()
        {
            try
            {
                var lst = new List<DaysBLL>();
                //SqlParameter[] p = new SqlParameter[1];

                _dt = (new DBHelper().GetTableFromSP)("sp_GetDocDays_admin");
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<DaysBLL>>();
                    }
                }
                return lst;
            }
            catch (Exception)
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
            catch (Exception)
            {
                return null;
            }
        }
        public int Insert(DoctorBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[13];

                p[0] = new SqlParameter("@FullName", data.FullName);
                p[1] = new SqlParameter("@ImagePath", data.ImagePath);
                p[2] = new SqlParameter("@Email", data.Email);
                p[3] = new SqlParameter("@Skills", data.Skills);
                p[4] = new SqlParameter("@Education", data.Education);
                p[5] = new SqlParameter("@Fees", data.Fees);
                p[6] = new SqlParameter("@Gender", data.Gender);
                p[7] = new SqlParameter("@StatusID", data.StatusID);
                p[8] = new SqlParameter("@CreatedBy", data.CreatedBy);
                p[9] = new SqlParameter("@CreatedOn", data.CreatedOn);
                p[10] = new SqlParameter("@LastUpdatedBy", data.LastUpdatedBy);
                p[11] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);
                p[12] = new SqlParameter("@DoctorID", data.DoctorID);
                //rtn = (new DBHelper().ExecuteNonQueryReturn)("dbo.sp_insertDoctor_Admin", p);
                rtn = int.Parse(new DBHelper().GetTableFromSP("dbo.sp_insertDoctor_Admin", p).Rows[0]["DoctorID"].ToString());


                //if (data.Specialities != "")
                //{
                //    SqlParameter[] p1 = new SqlParameter[2];

                //    p1[0] = new SqlParameter("@Specialities", data.Specialities == "" ? null : data.Specialities);
                //    p1[1] = new SqlParameter("@DoctorID", rtn);

                //    (new DBHelper().ExecuteNonQueryReturn)("sp_insertDocSpecialities_Admin", p1);
                //}
                //if (data.Days != "")
                //{
                //    //char[] spearator = { ',' };
                //    var days = data.Days.Split(',');
                //    var speciality = data.Specialities.Split(',');
                                                    
                //        SqlParameter[] p2 = new SqlParameter[3];
                //        p2[0] = new SqlParameter("@Days", data.Days);
                //        p2[1] = new SqlParameter("@DoctorID", rtn);
                //        p2[2] = new SqlParameter("@Specialities", data.Specialities);

                //        (new DBHelper().ExecuteNonQueryReturn)("dbo.sp_insertDocDays_Admin", p2);
                     
                     
                //}

                //if (data.Times != "")
                //{
                //    char[] spearator = { ',' };
                //    var times = data.Times.Split(spearator);
                //    var speciality = data.Specialities.Split(spearator);
                //    foreach (var time in times)
                //    {
                //        foreach (var specialtime in speciality)
                //        {
                //            SqlParameter[] p2 = new SqlParameter[4];

                //            p2[0] = new SqlParameter("@DaysID", rtn1);
                //            p2[1] = new SqlParameter("@DoctorID", rtn);
                //            p2[2] = new SqlParameter("@SpecialistID", int.Parse(specialtime));
                //            p2[3] = new SqlParameter("@TimeSlot", time);
                //            (new DBHelper().ExecuteNonQueryReturn)("sp_insertDocTimeslot_Admin", p2);
                //        }
                //    }
                //}

                //return rtn;
                return 0;
            }
            catch (Exception)
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
                p[2] = new SqlParameter("@FullName", data.FullName);
                p[3] = new SqlParameter("@ImagePath", data.ImagePath);
                p[4] = new SqlParameter("@Email", data.Email);
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
            catch (Exception)
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
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
