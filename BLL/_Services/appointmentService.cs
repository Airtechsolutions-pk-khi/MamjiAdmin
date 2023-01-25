using BAL.Repositories;
using MamjiAdmin._Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using WebAPICode.Helpers;

namespace MamjiAdmin.BLL._Services
{
    public class appointmentService : baseService
    {
        appointmentDB _service;
        public appointmentService()
        {
            _service = new appointmentDB();
        }
        public List<AppointmentBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception ex)
            {
                return new List<AppointmentBLL>();
            }
        }
        public AppointmentBLL Get(int id)
        {
            try
            {
                return _service.Get(id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public CustomerBLL Getcustomer(int id)
        {
            try
            {
                return _service.Getcustomer(id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int Insert(AppointmentBLL data)
        {
            try
            {
                //data.CreatedOn = DateTime.Now;
                var result = _service.Insert(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        //public int Update(AppointmentBLL data)
        //{
        //    try
        //    {
        //        data.LastUpdatedDate = _UTCDateTime_SA();
        //        var result = _service.Update(data);

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //}

        public int Delete(AppointmentBLL data)
        {
            try
            {
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Delete(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int Status(AppointmentBLL obj, IWebHostEnvironment _env)
        {
            try
            {
                var data = Getcustomer(obj.CustomerID);
                string contentRootPath = _env.ContentRootPath;

                string path = "/ClientApp/dist/assets/Upload/";
                string filePath = contentRootPath + path;

                string Body = "";
                if (obj.AppointmentStatus == 102)
                {
                    Body = System.IO.File.ReadAllText(contentRootPath + "\\Template\\appointmentapproved.txt");
                    //Body =  Body.Replace("#BookingDate#", dt.ToString());
                    UpdateApproved(obj, _env, Body);
                }
                else if (obj.AppointmentStatus == 100)
                {
                    Body = System.IO.File.ReadAllText(contentRootPath + "\\Template\\appointmentcompleted.txt");
                    UpdateComplete(obj, _env, Body);
                }

                else if (obj.AppointmentStatus == 103)
                {
                    Body = System.IO.File.ReadAllText(contentRootPath + "\\Template\\appointmentcancelled.txt");
                    UpdateCancelled(obj, _env, Body);
                }

                obj.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Status(obj);


                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int UpdateComplete(AppointmentBLL obj, IWebHostEnvironment _env, string Body)
        {
            string msg = "";
            //msg = obj.StatusMsg;
            string contentRootPath = _env.ContentRootPath;

            string path = "/ClientApp/dist/assets/Upload/";
            string filePath = contentRootPath + path;

            try
            {
                var data = Get(obj.AppointmentID);
                var email = Getcustomer(obj.CustomerID);

                string ToEmail, SubJect;
                ToEmail = email.Email;
                SubJect = "Your Appointment on MAMJI - " + data.AppointmentNo;

                Body = Body.Replace("#SenderName#", data.FullName);
                SendEmail("Mamji Hospital || Appointments: " + data.AppointmentNo, Body, email.Email);
            }
            catch { }
            return 1;
        }
        public int UpdateCancelled(AppointmentBLL obj, IWebHostEnvironment _env, string Body)
        {
            string msg = "";
            //msg = obj.StatusMsg;
            string contentRootPath = _env.ContentRootPath;

            string path = "/ClientApp/dist/assets/Upload/";
            string filePath = contentRootPath + path;

            try
            {
                var data = Get(obj.AppointmentID);
                var email = Getcustomer(obj.CustomerID);

                string ToEmail, SubJect;
                ToEmail = email.Email;
                SubJect = "Your Appointment on MAMJI - " + data.AppointmentNo;

                Body = Body.Replace("#SenderName#", data.FullName);
                SendEmail("Mamji Hospital || Appointments: " + data.AppointmentNo, Body, email.Email);
            }
            catch { }
            return 1;
        }
        public int UpdateApproved(AppointmentBLL obj, IWebHostEnvironment _env, string Body)
        {
            string msg = "";
            //msg = obj.StatusMsg;
            string contentRootPath = _env.ContentRootPath;

            string path = "/ClientApp/dist/assets/Upload/";
            string filePath = contentRootPath + path;

            try
            {
                var data = Get(obj.AppointmentID);
                var email = Getcustomer(obj.CustomerID);

                string ToEmail, SubJect;
                ToEmail = email.Email;
                SubJect = "Your Appointment on MAMJI - " + data.AppointmentNo;

                Body = Body.Replace("#description#", "-")
                    .Replace("#date#", Convert.ToDateTime(data.Date).ToShortDateString())
                    .Replace("#appointmentno#", data.AppointmentNo)
                    .Replace("#name#", data.FullName)
                    .Replace("#contact#", data.Mobile);
                SendEmail("Mamji Hospital || Appointments: " + data.AppointmentNo, Body, email.Email);
            }
            catch { }
            return 1;
        }
        public void SendEmail(string _SubjectEmail, string _BodyEmail, string _To)
        {
            try
            {
                //MimeMessage message = new MimeMessage();
                //MailboxAddress from = new MailboxAddress("info@karachiflora.com", "info@karachiflora.com");
                //message.From.Add(from);
                //message.To.Add(MailboxAddress.Parse(_To));
                //message.Subject = _SubjectEmail;
                //message.Body = new TextPart(TextFormat.Html) { Text = _BodyEmail };
                //SmtpClient client = new SmtpClient();
                //client.Connect("mail.karachiflora.com", 25, false);
                //client.Authenticate("info@karachiflora.com", "Karachiflora@123");
                //client.Send(message);
                //client.Disconnect(true);
                //client.Dispose();

                MailMessage mail = new MailMessage();
                mail.To.Add(_To);
                mail.From = new MailAddress("ammadsiddiqui136@gmail.com");
                mail.Subject = _SubjectEmail;
                mail.Body = _BodyEmail;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.UseDefaultCredentials = false;
                smtp.Port = Int32.Parse("587");
                smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
                smtp.Credentials = new System.Net.NetworkCredential
                     ("ammadsiddiqui136@gmail.com", "vartpzivrepkaxyq");
                smtp.EnableSsl = true;
                smtp.Send(mail);
                //smtp.UseDefaultCredentials = true;
            }
            catch (Exception ex)
            {
            }
        }
    }
}
