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
    public class customerService : baseService
    {
        customerDB _service;
        public customerService()
        {
            _service = new customerDB();
        }

        public List<CustomerBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception ex)
            {
                return new List<CustomerBLL>();
            }
        }
        public CustomerBLL Get(int id)
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
        public int Insert(CustomerBLL data, IWebHostEnvironment _env)
        {
            try
            {
                data.Image = UploadImage(data.Image, "Customer", _env);
                data.CreatedOn = _UTCDateTime_SA();
                var result = _service.Insert(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int Update(CustomerBLL data, IWebHostEnvironment _env)
        {
            try
            {
                data.Image = UploadImage(data.Image, "Customer", _env);
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Update(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int Delete(CustomerBLL data)
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

    }
}
