using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using System.Configuration;

namespace PraieraAPI.Utils
{
    public static class Mail
    {
        public static void sendMail(string to, string subject, string body)
        {
            var fromAddress = new MailAddress(ConfigurationManager.AppSettings["fromEmail"]);
            var toAddress = new MailAddress(to);
            string fromPassword = ConfigurationManager.AppSettings["fromPWD"];

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }

        }
    }
}