
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
    public class appointmentController : Controller
    {
        private readonly IWebHostEnvironment _env;
        appointmentService _service;
        public appointmentController(IWebHostEnvironment env)
        {
            _service = new appointmentService();
            _env = env;
        }


        [HttpGet("{all}")]
        public List<AppointmentBLL> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("appointment/{id}")]
        public AppointmentBLL Get(int id)
        {
            return _service.Get(id);
        }

        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] AppointmentBLL data)
        {
            return _service.Insert(data);
        }
        //[HttpPost]
        //[Route("update")]
        //public int PostUpdate([FromBody] AppointmentBLL obj)
        //{
        //    return _service.Update(obj);
        //}

        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] AppointmentBLL obj)
        {
            return _service.Delete(obj);
        }
        [HttpPost]
        [Route("status")]
        public int AppointmentStatus([FromBody] AppointmentBLL obj)
        {
            return _service.Status(obj, _env);
        }
    }
}
