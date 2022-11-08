
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
  
    public class brandController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        brandService _service;
        public brandController(IWebHostEnvironment env)
        {
            _service = new brandService();
            _env = env;
        }
      

        [HttpGet("all")]
        public List<BrandBLL> GetAll()
        {
            return _service.GetAll();
        }


        [HttpGet("{id}")]
        public BrandBLL Get(int id, int brandid)
        {
            return _service.Get(id, brandid);
        }

        [HttpPost]
        [Route("insert")]
        public int Post([FromBody]BrandBLL obj)
        {
            return _service.Insert(obj, _env);
        }

        //[HttpPost]
        //[Route("update")]
        //public int Put([FromBody]BrandBLL obj)
        //{
        //    return _service.Update(obj, _env);
        //}


        [HttpPost]
        [Route("delete")]
        public int Delete(BrandBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
