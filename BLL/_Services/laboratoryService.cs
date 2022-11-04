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
    public class laboratoryService : baseService
    {
        laboratoryDB _service;
        public laboratoryService()
        {
            _service = new laboratoryDB();
        }
        public List<LaboratoryBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception ex)
            {
                return new List<LaboratoryBLL>();
            }
        }
        public LaboratoryBLL Get(int id)
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
        public int Insert(LaboratoryBLL data, IWebHostEnvironment _env)
        {
            try
            {
                data.ImagePath = UploadImage(data.ImagePath, "laboratory", _env);
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Insert(data);

                return result;
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
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Update(data);

                return result;
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
