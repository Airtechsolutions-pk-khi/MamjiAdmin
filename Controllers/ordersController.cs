
using System;
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
  
    public class ordersController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        ordersService _service;
      
        public ordersController(IWebHostEnvironment env)
        {
            _service = new ordersService();
            _env = env;
        }


        [HttpGet("all/{customerid}/{fromDate}/{toDate}")]
        public List<OrdersBLL> GetAll(int customerid, string fromDate, string toDate)
        {
            return _service.GetAll(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }


        [HttpGet("{id}")]
        public RspOrderDetail Get(int id)
        {
            return _service.Get(id);
        }
        [HttpGet("print/{id}")]
        public RspPrintReceipt GetPrint(int id)
        {
            return _service.GetPrint(id,  _env);
        }

        [HttpPost]
        [Route("insert")]   
        public int Post([FromBody]OrdersBLL obj)
        {
            return _service.Insert(obj, _env);
        }

        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody]OrdersBLL obj)
        {
            return _service.Update(obj, _env);
        }


        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody]OrdersBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
