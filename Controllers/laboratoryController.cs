
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MamjiAdmin._Models;
using MamjiAdmin.BLL._Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MohsinFoodAdmin._Models;
using Newtonsoft.Json;

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
        [HttpPost]
        [Route("insert")]
        public async Task<int> Post(UploadViewModel Data)
        {
			if (Data.PdfFile != null)
			{
				////upload files to wwwroot
				//var fileName = Path.GetFileName(Data.PdfFile.FileName);
				////judge if it is pdf file
				//string ext = Path.GetExtension(Data.PdfFile.FileName);
				//if (ext.ToLower() != ".pdf")
				//{
				//                return 0;
				//}
				//var filePath = Path.Combine(_env.WebRootPath, "pdffiles", fileName);

				//using (var fileSteam = new FileStream(filePath, FileMode.Create))
				//{
				//	await Data.PdfFile.CopyToAsync(fileSteam);
				//}

				var filePath = await CopyPdfToPath(Data.PdfFile, FolderName);

				LaboratoryBLL data = new LaboratoryBLL();
                data.CustomerID = int.Parse(Data.CustomerID);
                data.FilePath = filePath;
                data.DiagnoseCatID = int.Parse(Data.DiagnosticCatID);
                data.StatusID = 1;

                var res = _service.Insert(data, _env);

                if(res >= 1)
                {
					{
						using (var client = new HttpClient())
						{
							const string title = "Success!";
							const string body = "Your reports has been uploaded!";
							var URL = string.Format("https://localhost:44359/api/push/androidData/{0}/{1}", title, body);
							var response = await client.GetAsync(URL);
							response.EnsureSuccessStatusCode();
						}
					}
				}

                return 1;
			}
			return 0;
		}
		internal async Task<string> CopyPdfToPath(IFormFile file, string folderName)
		{
			var fileName = Path.GetFileName(file.FileName);
			string ext = Path.GetExtension(file.FileName);

			if (ext.ToLower() != ".pdf")
			{
				return "";
			}
			var filePath = Path.Combine(_env.ContentRootPath, folderName, fileName);

			using (var fileSteam = new FileStream(filePath, FileMode.Create))
			{
				await file.CopyToAsync(fileSteam);
			}
			return filePath;
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
