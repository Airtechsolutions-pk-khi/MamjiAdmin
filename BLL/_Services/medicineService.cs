using BAL.Repositories;
using MamjiAdmin._Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin.BLL._Services
{
    public class medicineService : baseService
    {
        medicineDB _service;
        public medicineService()
        {
            _service = new medicineDB();
        }
        public List<MedicineBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception)
            {
                return new List<MedicineBLL>();
            }
        }
        public MedicineBLL Get(int id)
        {
            try
            {
                return _service.Get(id);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public int Insert(MedicineBLL data, IWebHostEnvironment _env)
        {
            try
            {
                data.ImagePath = UploadImage(data.ImagePath, "Brand", _env);
                data.CreatedOn = _UTCDateTime_SA();
                var result = _service.Insert(data);

                return result;
            }
            catch (Exception)
            {
                return 0;
            }
        }
        public int Update(MedicineBLL data)
        {
            try
            {
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Update(data);

                return result;
            }
            catch (Exception)
            {
                return 0;
            }
        }
        public int Delete(MedicineBLL data)
        {
            try
            {
                data.CreatedOn = _UTCDateTime_SA();
                var result = _service.Delete(data);

                return result;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
