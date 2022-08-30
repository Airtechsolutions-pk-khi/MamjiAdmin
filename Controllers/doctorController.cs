
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Mvc;
namespace MohsinFoodAdmin.Controllers
{
    [Route("api/[controller]")]
    public class doctorController : Controller
    {
        doctorService _service;
        public doctorController()
        {
            _service = new doctorService();
        }

        [HttpGet("all/{doctorid}")]
        public List<DoctorBLL> GetAll(int DoctorID)
        {
            return _service.GetAll(DoctorID);
        }

        [HttpGet("{id}/doctor/{doctorid}")]
        public DoctorBLL Get(int id, int DoctorID)
        {
            return _service.Get(id, DoctorID);
        }
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] DoctorBLL obj)
        {
            return _service.Insert(obj);
        }
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] DoctorBLL obj)
        {
            return _service.Update(obj);
        }


        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] DoctorBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
