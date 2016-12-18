using System.Collections.Generic;
using System.Web.Http;
using PraieraAPI.Models;
using System.Data.SqlClient;
using System;
using System.Net.Mail;
using System.Configuration;

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

                cmd.CommandText = "INSERT INTO Purchases (Id, Longitude, Latitude, Comments, Name, Phone, Change, Date) VALUES ('" +
                                purchase.id + "'," +
                                purchase.longitude + ", " +
                                purchase.latitude + ", '" +
                                purchase.comments + "', '" +
                                purchase.name + "', '" +
                                purchase.phone + "'," + 
                                purchase.change + ", getdate())";

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

                var subject = "Novo pedido " + purchase.id;
                var body = "Novo pedido solicitado, favor verificar\n\n\nPurchase Id: " + purchase.id +
                                "\nLongitude: " + purchase.longitude +
                                "\nLatitude: " + purchase.latitude +
                                "\nObservações: " + purchase.comments +
                                "\nNome: " + purchase.name +
                                "\nTelefone: " + purchase.phone + "\n\n--- Produtos ---\n\n";

                cmd.CommandText = "select p.Name, p.Type, p.Capacity, p.Price, pp.Quantity from products p inner join purchase_products pp on(pp.product_id = p.id) where pp.purchase_id = '" + purchase.id + "'";
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    var capacity = dr.IsDBNull(2) ? "" : dr.GetString(2);
                    body += dr.GetString(0) + " " + dr.GetString(1) + " " + capacity + " - Preço: " + dr.GetDecimal(3).ToString() + " - Quantidade: " + dr.GetInt32(4).ToString() + "\n";
                }

                Utils.Mail.sendMail(ConfigurationManager.AppSettings["purchaseEmail"], subject, body);

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