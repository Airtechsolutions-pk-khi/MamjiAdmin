using Microsoft.AspNetCore.Http;

namespace MohsinFoodAdmin._Models
{
	public class UploadViewModel
	{
		public string LaboratoryID { get; set; }
		public string DiagnosticCatID { get; set; }
		public string CustomerID { get; set; }
		public IFormFile File { get; set; }
		public string Name { get; set; }
		public string ReferenceNo { get; set; }
		public string RegistrationNo { get; set; }
	}	
}
