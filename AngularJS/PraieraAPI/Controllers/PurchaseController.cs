using System.Collections.Generic;
using System.Web.Http;
using PraieraAPI.Models;
using System.Data.SqlClient;
using System;

namespace PraieraAPI.Controllers
{
    [RoutePrefix("api/purchase")]
    public class PurchaseController : ApiController
    {
        public struct saveParams
        {
            public Purchase purchase;
            public List<Product> products;
        }

        [Route("save")]
        public IHttpActionResult Save(saveParams p)
        {
            var cnString = System.Web.Configuration.WebConfigurationManager.ConnectionStrings[0].ConnectionString;

            var cn = new SqlConnection(cnString);
            
            try
            {
                cn.Open();

                var cmd = cn.CreateCommand();
                var purchase = p.purchase;
                var products = p.products;

                purchase.id = System.Guid.NewGuid().ToString();

                cmd.CommandText = "INSERT INTO Purchases (Id, Longitude, Latitude, Comments, Name, Phone, Date) VALUES ('" +
                                purchase.id + "'," +
                                purchase.longitude + ", " +
                                purchase.latitude + ", '" +
                                purchase.comments + "', '" +
                                purchase.name + "', '" +
                                purchase.phone + "', getdate())";

                cmd.ExecuteNonQuery();

                foreach (Product product in products)
                {
                    cmd.CommandText = "INSERT INTO Purchase_Products (Purchase_Id, Product_Id, Quantity, Price) VALUES ('" +
                                    purchase.id + "', " +
                                    product.id + ", " +
                                    product.qty + ", " +
                                    product.price + ")";

                    cmd.ExecuteNonQuery();
                }
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            finally
            {
                cn.Close();
            }

            return Ok();
        }
    }
}