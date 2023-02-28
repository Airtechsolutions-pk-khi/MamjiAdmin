﻿using BAL.Repositories;
using MamjiAdmin._Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin.BLL._Services
{
    public class userService : baseService
    {
        userDB _service;
        public userService()
        {
            _service = new userDB();
        }

        public List<LoginBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception ex)
            {
                return new List<LoginBLL>();
            }
        }
        public LoginBLL Get(int id)
        {
            try
            {
                return _service.Get(id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int Insert(LoginBLL data)
        {
            try
            {
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Insert(data);

                return result;
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
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Update(data);

                return result;
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
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Delete(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int UpdatePermission(PermissionBLL data)
        {
            try
            {
                //for (int i = 0; i < length; i++)
                //{

                //}
                data.CreatedDate = _UTCDateTime_SA();
                var result = _service.UpdatePermission(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public PermissionFormBLL GetPermission(string rn)
        {
            try
            {
                return _service.GetPermission(rn);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
