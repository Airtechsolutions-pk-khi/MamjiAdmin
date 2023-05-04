
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
				//upload files to wwwroot
				var fileName = Path.GetFileName(Data.PdfFile.FileName);
				//judge if it is pdf file
				string ext = Path.GetExtension(Data.PdfFile.FileName);
				if (ext.ToLower() != ".pdf")
				{
                    return 0;
				}
				var filePath = Path.Combine(_env.WebRootPath, "pdffiles", fileName);

				using (var fileSteam = new FileStream(filePath, FileMode.Create))
				{
					await Data.PdfFile.CopyToAsync(fileSteam);
				}
				//your logic to save filePath to database, for example

                //_context.Engineers.Add(engineer);
                //await _context.SaveChangesAsync();
                return 1;
			}
			return 0;
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
