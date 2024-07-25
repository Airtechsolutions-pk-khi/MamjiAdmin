
using System;
using System.Collections.Generic;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Mvc;

namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]

    public class reportController : ControllerBase
    {
        reportService _service;
        public reportController()
        {
            _service = new reportService();
        }

        [HttpGet("summary/{brandid}/{fromDate}/{toDate}")]
        public List<salesSummarytBLL> GetSummaryRpt(int brandid, string fromDate, string toDate)
        {
            return _service.GetSalesSummaryRpt(brandid, Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }

        [HttpGet("salesdetail/{fromDate}/{toDate}")]
        public List<SalesDetailBLL> GetSalesDetail(string fromDate, string toDate)
        {
            return _service.GetSalesDetailRpt(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }
        [HttpGet("medicinedetail/{fromDate}/{toDate}")]
        public List<MedicineDetailBLL> GetMedicineDetail(string fromDate, string toDate)
        {
            return _service.GeMedicineDetailRpt(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }
        [HttpGet("prescriptiondetail/{fromDate}/{toDate}")]
        public List<PrescriptionDetailBLL> GetPrescriptionDetail(string fromDate, string toDate)
        {
            return _service.GetPrescriptionDetailRpt(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }
        [HttpGet("dashboarddetail/{fromDate}/{toDate}")]
        public List<DashboardRptBLL> Getdashboarddetail(string fromDate, string toDate)
        {
            return _service.Getdashboarddetail(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }
        [HttpGet("orderlistrpt/{fromDate}/{toDate}")]
        public List<MedicineOrderListReport> GetMedOrderdetail(string fromDate, string toDate)
        {
            return _service.GetMedOrderdetailRpt(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }
        [HttpGet("salesitemwise/{brandid}/{locationid}/{fromDate}/{toDate}")]
        public List<SalesItemwiseBLL> GetSalesItemwise(int brandid, string locationid, string fromDate, string toDate)
        {
            return _service.GetSalesItemwiseRpt(locationid, brandid, Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }

        [HttpGet("salescategorywise/{brandid}/{locationid}/{fromDate}/{toDate}")]
        public List<SalesCategorywiseBLL> GetSalesCategorywise(int brandid, string locationid, string fromDate, string toDate)
        {
            return _service.GetSalesCategorywiseRpt(locationid, brandid, Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }

        [HttpGet("salesuserwise/{brandid}/{locationid}/{fromDate}/{toDate}")]
        public List<SalesUserwiseBLL> GetSalesuserwise(int brandid, string locationid, string fromDate, string toDate)
        {
            return _service.GetSalesUserwiseRpt(locationid, brandid, Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }

        [HttpGet("salescustomerwise/{brandid}/{locationid}/{customerid}/{fromDate}/{toDate}")]
        public List<SalesCustomerwiseBLL> GetSalesCustomerwise(int brandid, string locationid, int customerid, string fromDate, string toDate)
        {
            return _service.GetSalesCustomerwiseRpt(locationid, brandid, customerid,Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }
        [HttpGet("customerrpt/{fromDate}/{toDate}")]
        public List<CustomerBLL> GetCustomer(string fromDate, string toDate)
        {
            return _service.GetCustomer(Convert.ToDateTime(fromDate), Convert.ToDateTime(toDate));
        }
    }
}
