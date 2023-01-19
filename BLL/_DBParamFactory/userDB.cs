
using DAL.Models;
using MamjiAdmin._Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using WebAPICode.Helpers;

namespace BAL.Repositories
{

    public class userDB : baseDB
    {
        public static LoginBLL repo;
        public static DataTable _dt;
        public static DataSet _ds;
        public userDB()
            : base()
        {
            repo = new LoginBLL();
            _dt = new DataTable();
            _ds = new DataSet();
        }
        public List<LoginBLL> GetAll()
        {
            try
            {
                var lst = new List<LoginBLL>();
                SqlParameter[] p = new SqlParameter[0];

                _dt = (new DBHelper().GetTableFromSP)("sp_getuser", p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        lst = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<LoginBLL>>();
                    }
                }
                return lst;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public LoginBLL Get(int id)
        {
            try
            {
                var _obj = new LoginBLL();
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@id", id);
                _dt = (new DBHelper().GetTableFromSP)("sp_GetUserbyID_Admin", p);
                if (_dt != null)
                {
                    if (_dt.Rows.Count > 0)
                    {
                        _obj = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(_dt)).ToObject<List<LoginBLL>>().FirstOrDefault();
                    }
                }
                return _obj;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public int Insert(LoginBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[7];

                p[0] = new SqlParameter("@UserName", data.UserName);
                p[1] = new SqlParameter("@Email", data.Email);
                p[2] = new SqlParameter("@Type", data.Type);
                p[3] = new SqlParameter("@Password", data.Password);
                p[4] = new SqlParameter("@StatusID", data.StatusID);
                p[5] = new SqlParameter("@LastUpdatedBy", data.LastUpdateBy);
                p[6] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);
                

                rtn = (new DBHelper().ExecuteNonQueryReturn)("sp_insertUser_Admin", p);
                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int Update(LoginBLL data)
        {
            try
            {
                int rtn = 0;
                SqlParameter[] p = new SqlParameter[8];
                p[0] = new SqlParameter("@UserName", data.UserName);
                p[1] = new SqlParameter("@Email", data.Email);
                p[2] = new SqlParameter("@Type", data.Type);
                p[3] = new SqlParameter("@Password", data.Password);
                p[4] = new SqlParameter("@StatusID", data.StatusID);
                p[5] = new SqlParameter("@LastUpdatedBy", data.LastUpdateBy);
                p[6] = new SqlParameter("@LastUpdatedDate", data.LastUpdatedDate);
                p[7] = new SqlParameter("@ID", data.ID);

                rtn = (new DBHelper().ExecuteNonQueryReturn)("sp_updateUser_Admin", p);

                return rtn;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int Delete(LoginBLL data)
        {
            try
            {
                int _obj = 0;
                SqlParameter[] p = new SqlParameter[1];
                p[0] = new SqlParameter("@id", data.ID);

                _obj = (new DBHelper().ExecuteNonQueryReturn)("sp_DeleteUser", p);

                return _obj;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
