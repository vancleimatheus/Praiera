using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PraieraAPI.Models
{
    public class Product
    {
        public int id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string capacity { get; set; }
        public double price { get; set; }
        public string image { get; set; }
        public int qty { get; set; }
    }
}