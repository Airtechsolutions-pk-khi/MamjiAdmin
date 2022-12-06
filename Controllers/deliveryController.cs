
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
  
    public class deliveryController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        deliveryService _service;
        public deliveryController(IWebHostEnvironment env)
        {
            _service = new deliveryService();
            _env = env;
        }

        [HttpGet("all")]
        public List<DeliveryBLL> GetAll()
        {
            return _service.GetAll();
        }
        //[HttpGet("GetAllBrand")]
        //public List<DeliveryBLL> GetAllBrand()
        //{
        //    return _service.GetAllBrand();
        //}

        //[HttpGet("settings/{brandid}")]
        //public BrandSettingsBLL GetItemSettings(int brandid)
        //{
        //    return _service.GetItemSettings(brandid);
        //}

        [HttpGet("{id}")]
        public DeliveryBLL Get(int id)
        {
            return _service.Get(id);
        }

        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] DeliveryBLL obj)
        {
            return _service.Insert(obj);
        }

        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] DeliveryBLL obj)
        {
            return _service.Update(obj, _env);
        }


        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] DeliveryBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
