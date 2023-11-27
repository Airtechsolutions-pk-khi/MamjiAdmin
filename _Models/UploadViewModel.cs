using Microsoft.AspNetCore.Http;

namespace MohsinFoodAdmin._Models
{
	public class UploadViewModel
	{
		public int LaboratoryID { get; set; }
		public string UserName { get; set; }
		public int DiagnosticCatID { get; set; }
		public IFormFile File { get; set; }
		public string Name { get; set; }
		public string ReferenceNo { get; set; }
		public string RegistrationNo { get; set; }
	}	
}
