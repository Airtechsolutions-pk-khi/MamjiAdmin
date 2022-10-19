﻿
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
    public class doctorController : Controller
    {
        private readonly IWebHostEnvironment _env;
        doctorService _service;
        public doctorController(IWebHostEnvironment env)
        {
            _service = new doctorService();
            _env = env;
        }

        [HttpGet("all")]
        public List<DoctorBLL> GetAlldoctor()
        {
            return _service.GetAll();
        }

        [HttpGet("speciality")]
        public List<SpecialistBLL> GetSpecialities()
        {
            return _service.GetSpeciality();
        }

        [HttpGet("days")]
        public List<SpecialistBLL> GetDays()
        {
            return _service.GetSpeciality();
        }
        [HttpGet("doctor/{id}")]
        public DoctorBLL Get(int id)
        {
            return _service.Get(id);
        }

        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] DoctorBLL obj)
        {
            return _service.Insert(obj, _env);
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
