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
    public class specialitiesService : baseService
    {
        specialitiesDB _service;
        public specialitiesService()
        {
            _service = new specialitiesDB();
        }
        public List<SpecialistBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception ex)
            {
                return new List<SpecialistBLL>();
            }
        }
        public SpecialistBLL Get(int id)
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
        //public int Insert(SpecialistBLL data, IWebHostEnvironment _env)
        //{
        //    try
        //    {
        //        data.CreatedOn = _UTCDateTime_SA();
        //        var result = _service.Insert(data);

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //}

        //public int Update(SpecialistBLL data)
        //{
        //    try
        //    {
        //        data.LastUpdatedDate = _UTCDateTime_SA();
        //        var result = _service.Update(data);

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //}

        //public int Delete(SpecialistBLL data)
        //{
        //    try
        //    {
        //        data.LastUpdatedDate = _UTCDateTime_SA();
        //        var result = _service.Delete(data);

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //}

    }
}
