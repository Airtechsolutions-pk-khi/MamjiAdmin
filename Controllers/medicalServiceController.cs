
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
    public class medicalServiceController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        medicalService _service;
        public medicalServiceController(IWebHostEnvironment env)
        {
            _service = new medicalService();
            _env = env;
        }
        [HttpGet("{all}")]
        public List<medicalServiceBLL> GetAll()
        {
            return _service.GetAll();
        }
        
        [HttpGet("service/{id}")]
        public medicalServiceBLL Get(int id)
        {
            return _service.Get(id);
        }
        
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] medicalServiceBLL obj)
        {
            return _service.Insert(obj, _env);
        }
 
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] medicalServiceBLL obj)
        {
            return _service.Update(obj, _env);
        }
 
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] medicalServiceBLL obj)
        {
            return _service.Delete(obj);
        }
         
    }
}
