using System.Web.Http;
using System.Data.SqlClient;
using PraieraAPI.Models;
using System.Configuration;
using System;

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

        public struct contactForm
        {
            public string name;
            public string phone;
            public string email;
            public string message;
            public string suggestions;   
        }

        [Route("sendcontact")]
        public IHttpActionResult SendContact(contactForm p)
        {
            try
            {
                var body = "Nome: " + p.name +
                           "\nTelefone:" + p.phone +
                           "\nEmail:" + p.email +
                           "\nMensagem:" + p.message +
                           "\nSugestões:" + p.suggestions;

                Utils.Mail.sendMail(ConfigurationManager.AppSettings["contactEmail"], "Fale Conosco", body);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
}