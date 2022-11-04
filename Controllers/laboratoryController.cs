
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
    public class laboratoryController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        laboratoryService _service;
        public laboratoryController(IWebHostEnvironment env)
        {
            _service = new laboratoryService();
            _env = env;
        }
        [HttpGet("all")]
        public List<LaboratoryBLL> GetAll()
        {
            return _service.GetAll();
        }
        [HttpGet("laboratory/{id}")]
        public LaboratoryBLL Get(int id)
        {
            return _service.Get(id);
        }
        [HttpPost]
        [Route("insert")]
        public int Post([FromBody] LaboratoryBLL obj)
        {
            return _service.Insert(obj, _env);
        }
        [HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] LaboratoryBLL obj)
        {
            return _service.Update(obj);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] LaboratoryBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
