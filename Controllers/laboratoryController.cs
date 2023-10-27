using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MohsinFoodAdmin._Models;


namespace MamjiAdmin.Controllers
{
    [Route("api/[controller]")]
    public class laboratoryController : ControllerBase
    {
		private const string FolderName = "pdfFiles";
		private readonly IWebHostEnvironment _env;
        laboratoryService _service;
        public laboratoryController(IWebHostEnvironment env)
        {
            _service = new laboratoryService();
            _env = env;
        }
        [HttpGet("all")]
        public List<LaboratoryBLL> GetAll()
        {
            return _service.GetAll();
        }
        [HttpGet("laboratory/{id}")]
        public LaboratoryBLL Get(int id)
        {
            return _service.Get(id);
        }

		[HttpGet]
		[Route("loadpdf")]
       
        public ActionResult DownloadPdf(string path)
        {
            if (System.IO.File.Exists(path))
            {
                byte[] pdfBytes = System.IO.File.ReadAllBytes(path);
                return File(pdfBytes, "application/pdf");
            }
            else
            {
                // Handle the case where the file doesn't exist or there is an error
                return Content("File not found");
            }
        }

        [HttpPost]
        [Route("insert")]
        public async Task<int> Post(UploadViewModel Data)
        {
            if (Data.File != null)
            {
                var filePath = await CopyPdfToPath(Data.File, FolderName);                

               

                LaboratoryBLL data = new LaboratoryBLL();
                data.CustomerID = int.Parse(Data.CustomerID);
                data.FilePath = filePath;                
                data.DiagnoseCatID = int.Parse(Data.DiagnosticCatID);
                data.StatusID = 1;

                int res = _service.Insert(data, _env);


                if (res != 0)
                {
                    _service.SendEmailtoCustLab(Data, _env);
                    //await PushAndriod.PushNotify("Success!", "Your report has been uploaded!");
                }
                return res;
            }
            return 0;
        }
        internal async Task<string> CopyPdfToPath(IFormFile file, string FolderName)
		{
            var fileName = Path.GetFileName(file.FileName);
            string ext = Path.GetExtension(file.FileName);

            if (!ext.ToLower().Equals(".pdf"))
            {
                return "";
            }

            string contentRootPath = _env.ContentRootPath;
            string path = "/ClientApp/dist/assets/Upload/" + FolderName + "/" + Path.GetFileName(Guid.NewGuid() + ".pdf");            
            string filePath = contentRootPath + path;
            
            try
            {                
                using FileStream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write);                
                await file.CopyToAsync(fileStream);
            }
            catch (Exception ex)
            {

                throw;
            }
            return path;
		}

		[HttpPost]
        [Route("update")]
        public async Task<int> PostUpdate(UploadViewModel Data)
        {
            var filePath = await CopyPdfToPath(Data.File, FolderName);
            LaboratoryBLL data = new LaboratoryBLL();
            data.CustomerID = int.Parse(Data.CustomerID);
            data.FilePath = filePath;            
            data.DiagnoseCatID = int.Parse(Data.DiagnosticCatID);
            data.LaboratoryID = int.Parse(Data.LaboratoryID);
            data.StatusID = 1;
            
            return _service.Update(data, _env);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] LaboratoryBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
