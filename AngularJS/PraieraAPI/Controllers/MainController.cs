using System.Web.Http;
using System.Data.SqlClient;
using PraieraAPI.Models;

namespace PraieraAPI.Controllers
{
    [RoutePrefix("api/main")]
    public class MainController : ApiController
    {
        [Route("getConfig")]
        public Config Get()
        {
            Config ret = new Config();

            var cnString = System.Web.Configuration.WebConfigurationManager.ConnectionStrings[0].ConnectionString;

            var cn = new SqlConnection(cnString);
            cn.Open();

            var cmd = cn.CreateCommand();

            cmd.CommandText = "SELECT isOnline, minimunPurchase FROM Config";
            var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                ret.isOnline = reader.GetBoolean(0);
                ret.minimunPurchase = reader.GetDouble(1);
            }
            
            cn.Close();

            return ret;
        }
    }
}