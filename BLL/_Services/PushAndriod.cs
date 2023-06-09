using System.Net.Http;
using System.Threading.Tasks;

namespace MamjiAdmin.BLL._Services
{
	public static class PushAndriod
	{
		public static async Task PushNotify(string title, string body)
		{
			{
				using (var client = new HttpClient())
				{
					var URL = string.Format("https://localhost:44359/api/push/androidData/{0}/{1}", title, body);
					var response = await client.GetAsync(URL);
					response.EnsureSuccessStatusCode();
				}
			}
		}
	}
}
