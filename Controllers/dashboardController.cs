
using System;
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]

    public class dashboardController : ControllerBase
    {
        dashboardService _service;
        public dashboardController()
        {
            _service = new dashboardService();
        }

        [HttpGet("all")]
        public List<DashboardSummary> GetAll ()
        {
            return _service.GetAll();
        }

        [HttpGet("getcharts")]
        public RspDashboard GetChart()
        {
            return _service.GetChart();
        }

        [HttpGet("getlinecharts")]
        public RspDashboard GetLineChart()
        {
            return _service.GetChart();
        }
    }
}
