
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
    public class notificationController : ControllerBase
    {
        notificationService _service;
        public notificationController()
        {
            _service = new notificationService();
        }

        [HttpGet("{all}")]
        public List<NotificationBLL> GetAll()
        {
            return _service.GetAll();
        }

        [HttpGet("notification/{id}")]
        public NotificationBLL Getbyid(int id)
        {
            return _service.Getbyid(id);
        }
        [HttpPost]
        [Route("status")]
        public int Status([FromBody] NotificationBLL obj)
        {
            return _service.Status(obj);
        }
    }
}
