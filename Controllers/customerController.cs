
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
  
    public class customerController : ControllerBase
    {
        customerService _service;
        public customerController()
        {
            _service = new customerService();
        }
        [HttpGet("all")]
        public List<CustomerBLL> GetAll()
        {
            return _service.GetAll();
        }
        [HttpGet("doctor/{id}")]
        public CustomerBLL Get(int id)
        {
            return _service.Get(id);
        }
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody]CustomerBLL obj)
        {
            return _service.Insert(obj);
        }
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] CustomerBLL obj)
        {
            return _service.Update(obj);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody]CustomerBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}