using BAL.Repositories;
using MamjiAdmin._Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using MohsinFoodAdmin._Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MamjiAdmin.BLL._Services
{
    public class laboratoryService : baseService
    {
        laboratoryDB _service;
        public laboratoryService()
        {
            _service = new laboratoryDB();
        }
        public List<LaboratoryBLL> GetAll()
        {
            try
            {
                return _service.GetAll();
            }
            catch (Exception ex)
            {
                return new List<LaboratoryBLL>();
            }
        }
        public LaboratoryBLL Get(int id)
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
        public int SendEmailtoCustLab(UploadViewModel obj, IWebHostEnvironment _env)
        {
            try
            {
                var data = Getcustomer(obj.CustomerID);
                string contentRootPath = _env.ContentRootPath;

                string Body = "";
                
                    Body = System.IO.File.ReadAllText(contentRootPath + "\\Template\\labreportupload.txt");
                  
                    try
                    {
                    CustLab(obj, _env, Body);
                    //var ds = _service.GetToken(obj.CustomerID);
                    //var getTokens = JArray.Parse(Newtonsoft.Json.JsonConvert.SerializeObject(ds.Tables[0])).ToObject<List<PushTokenBLL>>();
                    //foreach (var item in getTokens)
                    //{
                    //    var token = new PushNotificationBLL();
                    //    token.Title = "Mamji Hospital" + " | Appointment Update";
                    //    token.Message = "Your appointment has been confirmed";
                    //    token.DeviceID = item.Token;
                    //    _service.PushNotificationAndroid(token);
                    //}
                }
                    catch (Exception)
                    {
                    }
                
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int CustLab(UploadViewModel obj, IWebHostEnvironment _env, string Body)
        {
            string msg = "";
            //msg = obj.StatusMsg;
            string contentRootPath = _env.ContentRootPath;

            string path = "/ClientApp/dist/assets/Upload/";
            string filePath = contentRootPath + path;

            try
            {
                
                var email = Getcustomer(obj.CustomerID);

                string ToEmail, SubJect;
                ToEmail = email.Email;
                SubJect = "Your Report has been uploaded";

                Body = Body.Replace("#description#", "-")
                    .Replace("#date#", DateTime.UtcNow.ToString());
                SendEmail("Mamji Hospital: ||  " + "Reports", Body, email.Email);
            }
            catch { }
            return 1;
        }
        public void SendEmail(string _SubjectEmail, string _BodyEmail, string _To)
        {
            try
            {                
                MailMessage mail = new MailMessage();
                mail.To.Add(_To);
                mail.From = new MailAddress("mamjihospital5@gmail.com");
                mail.Subject = _SubjectEmail;
                mail.Body = _BodyEmail;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.UseDefaultCredentials = false;
                smtp.Port = Int32.Parse("587");
                smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
                smtp.Credentials = new System.Net.NetworkCredential
                     ("mamjihospital5@gmail.com", "npdcdyiamrbqmyud");
                smtp.EnableSsl = false;
                smtp.Send(mail);               
            }
            catch (Exception ex)
            {
            }
        }
        public CustomerBLL Getcustomer(string id)
        {
            try
            {
                return _service.Getcustomer(int.Parse(id));
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public int Insert(LaboratoryBLL data, IWebHostEnvironment _env)
        {
            try
            {
                //data.Image = UploadImage(data.Image, "laboratory", _env);
                data.LastUpdatedDate = _UTCDateTime_SA();
                var result = _service.Insert(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        
        public int Update(LaboratoryBLL data, IWebHostEnvironment _env)
        {
            try
            {
                //data.Image = uploadFiles(data.Image, "laboratory", _env);
                data.LastUpdatedDate = DateTime.Now;
                var result = _service.Update(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int Delete(LaboratoryBLL data)
        {
            try
            {
                var result = _service.Delete(data);

                return result;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
