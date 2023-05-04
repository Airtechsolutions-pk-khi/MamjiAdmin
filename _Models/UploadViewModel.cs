using Microsoft.AspNetCore.Http;

namespace MohsinFoodAdmin._Models
{
	public class UploadViewModel
	{
		public string DiagnosticCatID { get; set; }
		public string CustomerID { get; set; }
		public IFormFile PdfFile { get; set; }
	}

}
