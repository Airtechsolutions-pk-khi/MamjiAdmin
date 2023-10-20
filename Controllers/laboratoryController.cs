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
		public FileStreamResult DownloadPdf(string path)
		{
			byte[] pdfBytes = System.IO.File.ReadAllBytes(path);
			MemoryStream ms = new MemoryStream(pdfBytes);
			return new FileStreamResult(ms, "application/pdf");
		}

		[HttpPost]
        [Route("insert")]
        //public async Task<int> Post(UploadViewModel Data , IWebHostEnvironment _env)
            public int Post(UploadViewModel Data, IWebHostEnvironment _env)
        {
			if (Data.PdfFile != null)
			{
				//var filePath = await CopyPdfToPath(Data.PdfFile, FolderName);
                var filePath =  CopyPdfToPath(Data.PdfFile, FolderName);

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

		//internal async Task<string> CopyPdfToPath(IFormFile file, string folderName)
        		internal string CopyPdfToPath(IFormFile file, string folderName)
		{
            var fileName = Path.GetFileName(file.FileName);
            string ext = Path.GetExtension(file.FileName);

            if (!ext.ToLower().Equals(".pdf"))
            {
                return "";
            }
            string path = folderName + "/" + fileName;
            //var filePath = Path.Combine(_env.ContentRootPath, folderName, fileName);
            //string filePath = string.Format(@"http:\mamjihospital.online\pdfFiles\{0}", fileName);
            try
            {
                using FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write);
                //await file.CopyToAsync(fileStream);
                 file.CopyToAsync(fileStream);
            }
            catch (Exception ex)
            {

                throw;
            }
            return path;
		}

		[HttpPost]
        [Route("update")]
        public int PostUpdate([FromBody] LaboratoryBLL obj)
        {
            return _service.Update(obj, _env);
        }
        [HttpPost]
        [Route("delete")]
        public int PostDelete([FromBody] LaboratoryBLL obj)
        {
            return _service.Delete(obj);
        }
    }
}
