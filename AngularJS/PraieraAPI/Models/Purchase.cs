using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PraieraAPI.Models
{
    public class Purchase
    {
        public string id { get; set; }
        public double longitude { get; set; }
        public double latitude { get; set; }
        public string comments { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public double change { get; set; }
        public DateTime date { get; set; }
    }
}