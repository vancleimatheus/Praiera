using System.Collections.Generic;
using System.Web.Http;
using PraieraAPI.Models;
using System.Data.SqlClient;

namespace PraieraAPI.Controllers
{
    [RoutePrefix("api/products")]
    public class ProductsController : ApiController
    {
        [Route("get")]
        public List<Product> Get(int Ranking, int nextQty)
        {
            var lst = new List<Product>();

            var cnString = System.Web.Configuration.WebConfigurationManager.ConnectionStrings[0].ConnectionString;

            var cn = new SqlConnection(cnString);
            cn.Open();

            var cmd = cn.CreateCommand();

            cmd.CommandText = "SELECT TOP " + nextQty.ToString() + " Id, Name, Type, Capacity, Price, Image FROM Products WHERE Ranking>" + Ranking + " ORDER BY Ranking";
            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                lst.Add(new Product()
                {
                    id = reader.GetInt32(0),
                    name = reader.GetString(1),
                    type = reader.GetString(2),
                    capacity = reader.GetString(3),
                    price = reader.GetDouble(4),
                    image = reader.GetString(5),
                    qty = 0
                });
            }

            cn.Close();

            return lst;
        }
    }
}