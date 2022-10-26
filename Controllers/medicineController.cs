﻿
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
    public class medicineController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        medicineService _service;
        public medicineController(IWebHostEnvironment env)
        {
            _service = new medicineService();
            _env = env;
        }
        [HttpGet("{all}")]
        public List<MedicineBLL> GetAll()
        {
            return _service.GetAll();
        }
        [HttpGet("medicine/{id}")]
        public MedicineBLL Get(int id)
        {
            return _service.Get(id);
        }
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody]MedicineBLL obj)
        {
            return _service.Insert(obj, _env);
        }
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] MedicineBLL obj)
        {
            return _service.Update(obj);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] MedicineBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
