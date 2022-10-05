
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
    public class prescriptionController : Controller
    {
        private readonly IWebHostEnvironment _env;
        prescriptionService _service;
        public prescriptionController(IWebHostEnvironment env)
        {
            _service = new prescriptionService();
            _env = env;
        }
        [HttpGet("{all}")]
        public List<PrescriptionBLL> GetAll()
        {
            return _service.GetAll();
        }
        [HttpGet("doctor/{id}")]
        public PrescriptionBLL Get(int id)
        {
            return _service.Get(id);
        }
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] PrescriptionBLL obj)
        {
            return _service.Insert(obj, _env);
        }
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] PrescriptionBLL obj)
        {
            return _service.Update(obj);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] PrescriptionBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}