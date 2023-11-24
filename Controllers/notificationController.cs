
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;

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

        [HttpGet("all/{fromDate}/{toDate}")]
        public List<NotificationBLL> GetAll(string fromDate, string toDate)
        {
            return _service.GetAll(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
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
