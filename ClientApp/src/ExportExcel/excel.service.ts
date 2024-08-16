//import { Injectable } from '@angular/core';
//import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';

//const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//const EXCEL_EXTENSION = '.xlsx';

//@Injectable()
//export class ExcelService {

// constructor() { }

// public exportAsExcelFile(json: any[], excelFileName: string): void {

//   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
//   console.log('worksheet',worksheet);
//   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//   //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
//   this.saveAsExcelFile(excelBuffer, excelFileName);
// }

// private saveAsExcelFile(buffer: any, fileName: string): void {
//   const data: Blob = new Blob([buffer], {
//     type: EXCEL_TYPE
//   });
//   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
// }

//}
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as ExcelJS from 'exceljs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExcelService {

  constructor(private http: HttpClient) { }

  public async exportAsExcelFile(json: any[], excelFileName: string): Promise<void> {
    try {
      const logoUrl = 'assets/img/MamjiNewLogo.jpg';  // Path to your logo in assets folder
      const footerUrl = 'assets/img/MamjiReportFooter.jpg'; // Path to your footer image in assets folder
      const logoBase64 = await this.getBase64ImageFromAssets(logoUrl);
      const footerBase64 = await this.getBase64ImageFromAssets(footerUrl);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Remove gridlines
      worksheet.properties.showGridLines = false;

      // Merge cells across more columns to center the logo horizontally
      worksheet.mergeCells('A1:C8');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'centerContinuous' };

      // Add the logo image to the worksheet
      const logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 }, // Position the top-left of the image
        ext: { width: 400, height: 150 }, // Adjust width and height as needed
      });

      // Leave the necessary space before adding the data
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Add data headers and rows, starting after the empty rows
      worksheet.addRow(Object.keys(json[0]));  // Add header row
      json.forEach((order) => {
        worksheet.addRow(Object.values(order));  // Add data rows
      });

      // Adjust column widths
      worksheet.columns = [
        { key: 'col1', width: 15 },
        { key: 'col2', width: 30 },
        { key: 'col3', width: 30 },
        { key: 'col4', width: 30 },
        { key: 'col5', width: 30 },
        { key: 'col6', width: 30 },
        { key: 'col7', width: 30 },
        { key: 'col8', width: 30 },
        { key: 'col9', width: 30 },
        { key: 'col10', width: 30 },
      ];

      // Add the footer image to the worksheet
      const footerImage = workbook.addImage({
        base64: footerBase64,
        extension: 'png',
      });

      // Determine the row for the footer image (e.g., 2 rows below the last data row)
      const footerRow = worksheet.lastRow.number + 4;
      worksheet.mergeCells(`A${footerRow}:C${footerRow + 4}`); // Adjust merging range as needed
      worksheet.addImage(footerImage, {
        tl: { col: 0, row: footerRow + 0 }, // Position the top-left of the footer image
        ext: { width: 500, height: 75 }, // Adjust width and height as needed
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  public async exportAppointment(json: any[], excelFileName: string): Promise<void> {
    try {
      const logoUrl = 'assets/img/MamjiNewLogo.jpg';  // Path to your logo in assets folder
      const footerUrl = 'assets/img/MamjiReportFooter.jpg'; // Path to your footer image in assets folder
      const logoBase64 = await this.getBase64ImageFromAssets(logoUrl);
      const footerBase64 = await this.getBase64ImageFromAssets(footerUrl);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Remove gridlines
      worksheet.properties.showGridLines = false;

      // Merge cells across more columns to center the logo horizontally
      worksheet.mergeCells('A1:C8');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'centerContinuous' };

      // Add the logo image to the worksheet
      const logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 }, // Position the top-left of the image
        ext: { width: 400, height: 150 }, // Adjust width and height as needed
      });


      // Adjust the "From Date" and "To Date" filters
      worksheet.addRow([]);
      worksheet.mergeCells('A10');
      worksheet.mergeCells('C10');

      const fromDateCell = worksheet.getCell('A10');
      const toDateCell = worksheet.getCell('C10');

      fromDateCell.value = `From Date: ${json[0]?.fromDate || 'N/A'}`;
      toDateCell.value = `To Date: ${json[0]?.toDate || 'N/A'}`;

      // Format the "From Date" and "To Date" cells
      fromDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color
      toDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color

      fromDateCell.alignment = { vertical: 'middle', horizontal: 'left' };
      toDateCell.alignment = { vertical: 'middle', horizontal: 'left' };

      // Leave the necessary space before adding the data
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Predefined Column Titles
      const headers = ['Appointment #', 'Booking Date', 'Booking Day', 'Doctor Name', 'Patient Name', 'Mobile', 'CreatedOn', 'Approved By', 'Timeslot', 'Status'];
      const headerRow = worksheet.addRow(headers);

      // Bold the header row
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Add data rows, starting after the header row
      json.forEach((order) => {
        worksheet.addRow([
          order.appointmentNo,
          order.bookingDate,
          order.day,
          order.doctorName,
          order.fullName,
          order.mobile,
          order.createdOn,
          order.approvedBy,
          order.timeslot,
          order.status,
        ]);
      });

      // Adjust column widths
      worksheet.columns = headers.map((header) => ({ width: 25 }));

      // Add borders to each cell in the table
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >= 4) { // Assuming row 3 is headers and data starts from row 4
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        }
      });

      // Add the footer image to the worksheet
      const footerImage = workbook.addImage({
        base64: footerBase64,
        extension: 'png',
      });

      // Determine the row for the footer image (e.g., 2 rows below the last data row)
      const footerRow = worksheet.lastRow.number + 5;
      worksheet.mergeCells(`A${footerRow}:E${footerRow + 5}`); // Adjust merging range as needed
      worksheet.addImage(footerImage, {
        tl: { col: 0, row: footerRow + 0 }, // Position the top-left of the footer image
        ext: { width: 750, height: 75 }, // Adjust width and height as needed
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  public async exportMedical(json: any[], excelFileName: string): Promise<void> {
    try {
      const logoUrl = 'assets/img/MamjiNewLogo.jpg';  // Path to your logo in assets folder
      const footerUrl = 'assets/img/MamjiReportFooter.jpg'; // Path to your footer image in assets folder
      const logoBase64 = await this.getBase64ImageFromAssets(logoUrl);
      const footerBase64 = await this.getBase64ImageFromAssets(footerUrl);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Remove gridlines
      worksheet.properties.showGridLines = false;

      // Merge cells across more columns to center the logo horizontally
      worksheet.mergeCells('A1:C8');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'centerContinuous' };

      // Add the logo image to the worksheet
      const logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 }, // Position the top-left of the image
        ext: { width: 400, height: 150 }, // Adjust width and height as needed
      });


      // Adjust the "From Date" and "To Date" filters
      worksheet.addRow([]);
      worksheet.mergeCells('A10');
      worksheet.mergeCells('C10');

      const fromDateCell = worksheet.getCell('A10');
      const toDateCell = worksheet.getCell('C10');

      fromDateCell.value = `From Date: ${json[0]?.fromDate || 'N/A'}`;
      toDateCell.value = `To Date: ${json[0]?.toDate || 'N/A'}`;

      // Format the "From Date" and "To Date" cells
      fromDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color
      toDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color

      fromDateCell.alignment = { vertical: 'middle', horizontal: 'left' };
      toDateCell.alignment = { vertical: 'middle', horizontal: 'left' };


      // Leave the necessary space before adding the data
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Predefined Column Titles
      const headers = ['Name', 'Brand Details', 'Price', 'Quantity'];
      const headerRow = worksheet.addRow(headers);

      // Bold the header row
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Add data rows, starting after the header row
      json.forEach((order) => {
        worksheet.addRow([
          order.name,
          order.brandDetails,
          order.price,
          order.quantityDescription,
        ]);
      });

      // Adjust column widths
      worksheet.columns = headers.map((header) => ({ width: 25 }));

      // Add borders to each cell in the table
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >= 2) { // Assuming row 3 is headers and data starts from row 4
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        }
      });

      // Add the footer image to the worksheet
      const footerImage = workbook.addImage({
        base64: footerBase64,
        extension: 'png',
      });

      // Determine the row for the footer image (e.g., 2 rows below the last data row)
      const footerRow = worksheet.lastRow.number + 5;
      worksheet.mergeCells(`A${footerRow}:D${footerRow + 5}`); // Adjust merging range as needed
      worksheet.addImage(footerImage, {
        tl: { col: 0, row: footerRow + 0 }, // Position the top-left of the footer image
        ext: { width: 600, height: 75 }, // Adjust width and height as needed
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  public async exportPrescripiton(json: any[], excelFileName: string): Promise<void> {
    try {
      const logoUrl = 'assets/img/MamjiNewLogo.jpg';  // Path to your logo in assets folder
      const footerUrl = 'assets/img/MamjiReportFooter.jpg'; // Path to your footer image in assets folder
      const logoBase64 = await this.getBase64ImageFromAssets(logoUrl);
      const footerBase64 = await this.getBase64ImageFromAssets(footerUrl);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Remove gridlines
      worksheet.properties.showGridLines = false;

      // Merge cells across more columns to center the logo horizontally
      worksheet.mergeCells('A1:C8');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'centerContinuous' };

      // Add the logo image to the worksheet
      const logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 }, // Position the top-left of the image
        ext: { width: 400, height: 150 }, // Adjust width and height as needed
      });


      // Adjust the "From Date" and "To Date" filters
      worksheet.addRow([]);
      worksheet.mergeCells('A10');
      worksheet.mergeCells('C10');

      const fromDateCell = worksheet.getCell('A10');
      const toDateCell = worksheet.getCell('C10');

      fromDateCell.value = `From Date: ${json[0]?.fromDate || 'N/A'}`;
      toDateCell.value = `To Date: ${json[0]?.toDate || 'N/A'}`;

      // Format the "From Date" and "To Date" cells
      fromDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color
      toDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color

      fromDateCell.alignment = { vertical: 'middle', horizontal: 'left' };
      toDateCell.alignment = { vertical: 'middle', horizontal: 'left' };


      // Leave the necessary space before adding the data
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Predefined Column Titles
      const headers = ['Image', 'Customer Name', 'Mobile', 'Address', 'Note', 'Approved By'];
      const headerRow = worksheet.addRow(headers);

      // Bold the header row
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Add data rows, starting after the header row
      json.forEach((order) => {
        worksheet.addRow([
          order.image,
          order.customerName,
          order.mobile,
          order.address,
          order.note,
          order.lastUpdatedBy,
        ]);
      });

      // Adjust column widths
      worksheet.columns = headers.map((header) => ({ width: 25 }));

      // Add borders to each cell in the table
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >= 2) { // Assuming row 3 is headers and data starts from row 4
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        }
      });

      // Add the footer image to the worksheet
      const footerImage = workbook.addImage({
        base64: footerBase64,
        extension: 'png',
      });

      // Determine the row for the footer image (e.g., 2 rows below the last data row)
      const footerRow = worksheet.lastRow.number + 5;
      worksheet.mergeCells(`A${footerRow}:D${footerRow + 5}`); // Adjust merging range as needed
      worksheet.addImage(footerImage, {
        tl: { col: 0, row: footerRow + 0 }, // Position the top-left of the footer image
        ext: { width: 600, height: 75 }, // Adjust width and height as needed
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  public async exportDashboardReport(json: any[], excelFileName: string): Promise<void> {
    try {
      const logoUrl = 'assets/img/MamjiNewLogo.jpg';  // Path to your logo in assets folder
      const footerUrl = 'assets/img/MamjiReportFooter.jpg'; // Path to your footer image in assets folder
      const logoBase64 = await this.getBase64ImageFromAssets(logoUrl);
      const footerBase64 = await this.getBase64ImageFromAssets(footerUrl);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Remove gridlines
      worksheet.properties.showGridLines = false;

      // Merge cells across more columns to center the logo horizontally
      worksheet.mergeCells('A1:C8');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'centerContinuous' };

      // Add the logo image to the worksheet
      const logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 }, // Position the top-left of the image
        ext: { width: 400, height: 150 }, // Adjust width and height as needed
      });


      // Adjust the "From Date" and "To Date" filters
      worksheet.addRow([]);
      worksheet.mergeCells('A10');
      worksheet.mergeCells('C10');

      const fromDateCell = worksheet.getCell('A10');
      const toDateCell = worksheet.getCell('C10');

      fromDateCell.value = `From Date: ${json[0]?.fromDate || 'N/A'}`;
      toDateCell.value = `To Date: ${json[0]?.toDate || 'N/A'}`;

      // Format the "From Date" and "To Date" cells
      fromDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color
      toDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color

      fromDateCell.alignment = { vertical: 'middle', horizontal: 'left' };
      toDateCell.alignment = { vertical: 'middle', horizontal: 'left' };


      // Leave the necessary space before adding the data
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Predefined Column Titles
      const headers = ['Total Doctors', 'Total Patients', 'Total Doctors Appointment', 'Total Prescription'];
      const headerRow = worksheet.addRow(headers);

      // Bold the header row
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Add data rows, starting after the header row
      json.forEach((order) => {
        worksheet.addRow([
          order.totalDoctors,
          order.totalPatients,
          order.totalDoctorAppointments,
          order.totalPrescription,
        ]);
      });

      // Adjust column widths
      worksheet.columns = headers.map((header) => ({ width: 25 }));

      // Add borders to each cell in the table
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >= 2) { // Assuming row 3 is headers and data starts from row 4
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        }
      });

      // Add the footer image to the worksheet
      const footerImage = workbook.addImage({
        base64: footerBase64,
        extension: 'png',
      });

      // Determine the row for the footer image (e.g., 2 rows below the last data row)
      const footerRow = worksheet.lastRow.number + 5;
      worksheet.mergeCells(`A${footerRow}:D${footerRow + 5}`); // Adjust merging range as needed
      worksheet.addImage(footerImage, {
        tl: { col: 0, row: footerRow + 0 }, // Position the top-left of the footer image
        ext: { width: 600, height: 75 }, // Adjust width and height as needed
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  public async exportMedicineReport(json: any[], excelFileName: string): Promise<void> {
    try {
      const logoUrl = 'assets/img/MamjiNewLogo.jpg';  // Path to your logo in assets folder
      const footerUrl = 'assets/img/MamjiReportFooter.jpg'; // Path to your footer image in assets folder
      const logoBase64 = await this.getBase64ImageFromAssets(logoUrl);
      const footerBase64 = await this.getBase64ImageFromAssets(footerUrl);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Remove gridlines
      worksheet.properties.showGridLines = false;

      // Merge cells across more columns to center the logo horizontally
      worksheet.mergeCells('A1:C8');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'centerContinuous' };

      // Add the logo image to the worksheet
      const logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 }, // Position the top-left of the image
        ext: { width: 400, height: 150 }, // Adjust width and height as needed
      });


      // Adjust the "From Date" and "To Date" filters
      worksheet.addRow([]);
      worksheet.mergeCells('A10');
      worksheet.mergeCells('C10');

      const fromDateCell = worksheet.getCell('A10');
      const toDateCell = worksheet.getCell('C10');

      fromDateCell.value = `From Date: ${json[0]?.fromDate || 'N/A'}`;
      toDateCell.value = `To Date: ${json[0]?.toDate || 'N/A'}`;

      // Format the "From Date" and "To Date" cells
      fromDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color
      toDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color

      fromDateCell.alignment = { vertical: 'middle', horizontal: 'left' };
      toDateCell.alignment = { vertical: 'middle', horizontal: 'left' };

      // Leave the necessary space before adding the data
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Predefined Column Titles
      const headers = ['Order #', 'Transaction #', 'Customer Name', 'Customer Mobile', 'Amount Total', 'Order Date', 'Status'];
      const headerRow = worksheet.addRow(headers);

      // Bold the header row
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Add data rows, starting after the header row
      json.forEach((order) => {
        worksheet.addRow([
          order.orderNo,
          order.transactionNo,
          order.customerName,
          order.customerMobile,
          order.amountTotal,
          order.orderDate,
          order.status,
        ]);
      });

      // Adjust column widths
      worksheet.columns = headers.map((header) => ({ width: 25 }));

      // Add borders to each cell in the table
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >= 2) { // Assuming row 3 is headers and data starts from row 4
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        }
      });

      // Add the footer image to the worksheet
      const footerImage = workbook.addImage({
        base64: footerBase64,
        extension: 'png',
      });

      // Determine the row for the footer image (e.g., 2 rows below the last data row)
      const footerRow = worksheet.lastRow.number + 5;
      worksheet.mergeCells(`A${footerRow}:D${footerRow + 5}`); // Adjust merging range as needed
      worksheet.addImage(footerImage, {
        tl: { col: 0, row: footerRow + 0 }, // Position the top-left of the footer image
        ext: { width: 600, height: 75 }, // Adjust width and height as needed
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  public async exportCustomerReport(json: any[], excelFileName: string): Promise<void> {
    try {
      const logoUrl = 'assets/img/MamjiNewLogo.jpg';  // Path to your logo in assets folder
      const footerUrl = 'assets/img/MamjiReportFooter.jpg'; // Path to your footer image in assets folder
      const logoBase64 = await this.getBase64ImageFromAssets(logoUrl);
      const footerBase64 = await this.getBase64ImageFromAssets(footerUrl);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      // Remove gridlines
      worksheet.properties.showGridLines = false;

      // Merge cells across more columns to center the logo horizontally
      worksheet.mergeCells('A1:C8');
      worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'centerContinuous' };

      // Add the logo image to the worksheet
      const logo = workbook.addImage({
        base64: logoBase64,
        extension: 'png',
      });

      worksheet.addImage(logo, {
        tl: { col: 0, row: 0 }, // Position the top-left of the image
        ext: { width: 400, height: 150 }, // Adjust width and height as needed
      });

      // Adjust the "From Date" and "To Date" filters
      worksheet.addRow([]);
      worksheet.mergeCells('A10');
      worksheet.mergeCells('C10');

      const fromDateCell = worksheet.getCell('A10');
      const toDateCell = worksheet.getCell('C10');

      fromDateCell.value = `From Date: ${json[0]?.fromDate || 'N/A'}`;
      toDateCell.value = `To Date: ${json[0]?.toDate || 'N/A'}`;

      // Format the "From Date" and "To Date" cells
      fromDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color
      toDateCell.font = { bold: true, color: { argb: 'FF0000' } }; // Bold and red color

      fromDateCell.alignment = { vertical: 'middle', horizontal: 'left' };
      toDateCell.alignment = { vertical: 'middle', horizontal: 'left' };

      // Leave the necessary space before adding the data
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Predefined Column Titles
      const headers = ['Image', 'Full Name', 'Address', 'Email', 'Mobile', 'Registration #', 'Password', 'Created On'];
      const headerRow = worksheet.addRow(headers);

      // Bold the header row
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Add data rows, starting after the header row
      json.forEach((order) => {
        worksheet.addRow([
          order.image ?? '',          
          order.fullName ?? '',       
          order.address ?? '',        
          order.email ?? '',          
          order.mobile ?? '',         
          order.registrationNo ?? '', 
          order.password ?? '',       
          order.createdOn ?? ''       
        ]);
      });

      // Adjust column widths
      worksheet.columns = headers.map((header) => ({ width: 25 }));

      // Add borders to each cell in the table
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber >= 2) { // Assuming row 3 is headers and data starts from row 4
          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          });
        }
      });

      // Add the footer image to the worksheet
      const footerImage = workbook.addImage({
        base64: footerBase64,
        extension: 'png',
      });

      // Determine the row for the footer image (e.g., 2 rows below the last data row)
      const footerRow = worksheet.lastRow.number + 5;
      worksheet.mergeCells(`A${footerRow}:D${footerRow + 5}`); // Adjust merging range as needed
      worksheet.addImage(footerImage, {
        tl: { col: 0, row: footerRow + 0 }, // Position the top-left of the footer image
        ext: { width: 600, height: 75 }, // Adjust width and height as needed
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      this.saveAsExcelFile(buffer, excelFileName);
    } catch (error) {
      console.error('Error exporting Excel file:', error);
    }
  }

  private async getBase64ImageFromAssets(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const base64data = canvas.toDataURL('image/png');
        resolve(base64data);
      };
      img.onerror = (err) => {
        reject(`Failed to load image: ${err}`);
      };
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(blob, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
}
