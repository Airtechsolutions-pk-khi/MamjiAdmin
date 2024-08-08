export class Report {

}
export class MedicineReport {
  name: string;
  brandDetails: string;  
  price: string;
  quantityDescription: string;
  status: number;  
}
export class PrescriptionReport {
  prescriptionID: number;
  customerName: string;
  image: string;
  mobile: string;
  address: string;
  note: string;
  statusID: number;
   
  lastUpdatedBy: string;
}
export class DashboardReport{
  totalDoctors: string;
  totalPatients: string;  
  DoctorAppointments: string;  
  totalPrescription: string;
}
export class MedicineOrderListReport{
   
  orderNo: number;
  transactionNo: string;
  customerMobile: string;   
  customerName: string;
  amountTotal: number;   
  statusID: number;
  orderDate: string;
  orderType: string
  
}
export class SummaryReport {
  totalSales: string;
  totalTax: string;
  totalDiscount: string;
  totalReturn: string;
  totalNetSales: string;
  totalSalesOrders: string;
  totalDeliveryOrders: string;
  totalPickUpOrders: string;
  totalCancelOrders: string;
  brandID: number;
}

export class SalesdetailReport {
  appointmentNo: number;
  patientName: string;
  mobile: string;
  bookingDate: string;
  appointmentDate: string;
  appointmentSlot: string;
  appointmentStatus: number;
  approvedBy: number;
  fullName:string;
  timeSlot:string;
  lastUpdatedBy:string;
}
export class SalesitemwiseReport {
  itemName: string;
  quantity: string;
  cost: string;
  price: string;
  profit: string;
  itemID: string;
}
export class SalescustomerwiseReport {
  orderNo: number;
  transactionNo: number;
  customerID: string;
  customerName: string;
  customerMobile: string;
  orderDate: string;
  statusID: number;
  orderID: number;
  amountTotal: number;
  grandTotal: number;
  serviceCharges: number;
  tax: number;
}
export class SalesuserwiseReport {
  orderNo: string;
  transactionNo: string;
  customerName: string;
  customerContact: string;
  orderDate: string;
  statusID: string;
  amountTotal: string;
  orderID: string;
}
export class SalescategorywiseReport {
  categoryName: string;
  quantity: string;
  cost: string;
  price: string;
  profit: string;
  itemID: string;
}

export class CustomerReport {
  customerID: number;
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  image: string;
  statusID: number;
  registrationNo: string;
}
