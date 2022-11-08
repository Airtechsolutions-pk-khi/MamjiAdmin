using BAL.Repositories;
using MamjiAdmin._Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin.BLL._Services
{
    public class dashboardService : baseService
    {
        dashboardDB _service;
        public dashboardService()
        {
            _service = new dashboardDB();
        }

        public List<DashboardSummary> GetAll()
        {
            try
            {
                return _service.GetDashboardSummary();
            }
            catch (Exception ex)
            {
                return new List<DashboardSummary>();
            }
        }

    }
}
