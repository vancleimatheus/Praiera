using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Praiera
{
    public partial class Index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
#if DEBUG
#else
            if (!Request.Url.AbsoluteUri.StartsWith("https"))
            {
                Response.Redirect("https://secure.praiera.com");
            }
#endif
        }
    }
}