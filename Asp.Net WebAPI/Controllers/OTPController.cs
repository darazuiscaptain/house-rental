using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using HouseRentalManagementApp.Data;

namespace HouseRentalManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowCrossSite]
    public class OTPController : ControllerBase
    {
        private readonly HouseRentalManagementAppContext _context;

        public OTPController(HouseRentalManagementAppContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("sendmail")]
        public async Task<Object> SendOTP(string email)
        {
            var logins = await _context.Login.FindAsync(email);
            if (logins == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Email not found" });

            }
            Random randomObj = new Random();
            string OTP = randomObj.Next(100000, 999999).ToString();
            EmailSender emailSender = new EmailSender();
            emailSender.SendEmailAsync(email, "", OTP);
            return Ok(new { status = "success", OTP = OTP, Message = "OTP Sent Successfully"});
        }

    }

    public class EmailSender : IEmailSender
    {
        public EmailSender()
        {

        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            string fromMail = "warnerbros0000@gmail.com";
            string fromPassword = "H@ckworld1";

            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = "Reset Password OTP";
            message.To.Add(new MailAddress(email));
            message.Body = "<html><body> Your Email Verification code is <h3><b>" + htmlMessage + " </b></h3></body></html>";
            message.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };
            smtpClient.Send(message);
        }

    }
}
