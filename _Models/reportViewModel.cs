using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MamjiAdmin._Models
{
    public class reportViewModel
    {
    }

    public class salesSummarytBLL
    {
        public float TotalSales { get; set; }
        public float TotalTax { get; set; }
        public float TotalDiscount { get; set; }
        public float TotalReturn { get; set; }
        public float TotalNetSales { get; set; }
        public int TotalSalesOrders { get; set; }
        public int TotalDeliveryOrders { get; set; }

        public int TotalPickUpOrders { get; set; }
        public int TotalCancelOrders { get; set; }

    }
    public class SalesDetailBLL
    {
        public int AppointmentNo { get; set; }
        public string BookingDate { get; set; }
        public string Day { get; set; }
        public string DoctorName { get; set; }
        public string FullName { get; set; }
        public string Mobile { get; set; }
        public string CreatedOn{ get; set; }
        public string ApprovedBy { get; set; }
        //public int AppointmentStatus { get; set; }
        public string Timeslot { get; set; }
        //public string LastUpdatedBy { get; set; }
        public string Status { get; set; }
        //public Nullable<System.DateTime> LastUpdatedDate { get; set; } 
    }
    public class MedicineDetailBLL
    {  
        public string Name { get; set; }
        public string BrandDetails { get; set; }
        public int Price { get; set; }
        public string QuantityDescription { get; set; }        
        public int StatusID { get; set; }


    }
    public class PrescriptionDetailBLL
    {       
            public int? prescriptionID { get; set; }
        public string CustomerName { get; set; }
        public string Image { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
  
        public string LastUpdatedBy { get; set; }
        public int StatusID { get; set; }


    }
    public class DashboardRptBLL
    {   
        public string TotalDoctors { get; set; }
        public string TotalPatients { get; set; }
        public string TotalDoctorAppointments { get; set; }
        public string TotalPrescription { get; set; }
         
    }
    public class MedicineOrderListReport
    {       
        public string OrderNo { get; set; }
        public string TransactionNo { get; set; }
        public string CustomerMobile { get; set; }
        public string CustomerName { get; set; }
        public double? AmountTotal { get; set; }
        public int? StatusID { get; set; }
        public string OrderDate { get; set; }
        public string OrderType { get; set; }

    }
    public class SalesUserwiseBLL
    {
        public int OrderNo { get; set; }
        public int TransactionNo { get; set; }
        public string customerName { get; set; }
        public string customerContact { get; set; }
        public DateTime orderDate { get; set; }
        public int statusID { get; set; }
        public float amountTotal { get; set; }

        public int orderID { get; set; }

    }
    public class SalesCustomerwiseBLL
    {
        public int OrderNo { get; set; }
        public int TransactionNo { get; set; }
        public float GrandTotal { get; set; }
        public float Tax { get; set; }
        public float ServiceCharges { get; set; }
        public float AmountTotal { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerMobile { get; set; }
        public int CustomerID { get; set; }
        public int StatusID { get; set; }
        public int OrderID { get; set; }
        public DateTime OrderDate { get; set; }

    }
    public class SalesItemwiseBLL
    {
        public string ItemName { get; set; }
        public int ItemID { get; set; }
        public float? Quantity { get; set; }
        public float? Cost { get; set; }
        public float? Price { get; set; }
        public float? Profit { get; set; }
    }
    public class SalesCategorywiseBLL
    {
        public string CategoryName { get; set; }
        public int ItemID { get; set; }
        public float? Quantity { get; set; }
        public float? Cost { get; set; }
        public float? Price { get; set; }
        public float? Profit { get; set; }

    }
}
