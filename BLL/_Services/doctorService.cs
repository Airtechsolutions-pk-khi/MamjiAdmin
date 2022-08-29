using BAL.Repositories;
using MamjiAdmin._Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin.BLL._Services
{
    public class doctorService : baseService
    {
        doctorDB _service;
        public doctorService()
        {
            _service = new doctorDB();
        }

        public List<DoctorBLL> GetAll(int doctorID)
        {
            try
            {
                return _service.GetAll(doctorID);
            }
            catch (Exception ex)
            {
                return new List<DoctorBLL>();
            }
        }
        
        public DoctorBLL Get(int id, int brandID)
        {
            try
            {
                return _service.Get(id, brandID);
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
                data.CreatedOn = _UTCDateTime_SA();
                var result = _service.Insert(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        //public int Update(DoctorBLL data)
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

        //public int Delete(DoctorBLL data)
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
