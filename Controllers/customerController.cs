
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
  
    public class customerController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        customerService _service;
        public customerController(IWebHostEnvironment env)
        {
            _service = new customerService();
            _env = env;
        }
        [HttpGet("all")]
        public List<CustomerBLL> GetAll()
        {
            return _service.GetAll();
        }
        [HttpGet("alldropdown")]
        public List<CustomerDropdownBLL> GetAlldropdown()
        {
            return _service.GetAlldropdown();
        }
        [HttpGet("customer/{id}")]
        public CustomerBLL Get(int id)
        {
            return _service.Get(id);
        }
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody]CustomerBLL obj)
        {
            return _service.Insert(obj,_env);
        }
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] CustomerBLL obj)
        {
            return _service.Update(obj, _env);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody]CustomerBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}