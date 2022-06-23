using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;

using HouseRentalManagementApp.Models;

namespace HouseRentalManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowCrossSite]
    public class PaymentController : ControllerBase
    {
        [HttpPost]
        [Route("createorder")]
        public async Task<Object> CreateOrder(OrderRequest orderRequest)
        {
            Random randomObj = new Random();
            string transactionId = randomObj.Next(10000000, 100000000).ToString();
            try
            {
                RazorpayClient client = new RazorpayClient("rzp_test_EZq9gu1FoD1ngg", "VJdFLjiTaSZzJ0wzc5Ib50Qm");
                Dictionary<string, object> options = new Dictionary<string, object>();
                options.Add("amount", orderRequest.Amount); // amount in the smallest currency unit
                options.Add("receipt", transactionId);
                options.Add("currency", orderRequest.Currency);
                Order order = client.Order.Create(options);

                 OrderModel orders =  new OrderModel
                {
                    id = order.Attributes["id"],
                    razorpayKey = "rzp_test_EZq9gu1FoD1ngg",
                    entity = order.Attributes["entity"],
                    amount = order.Attributes["amount"],
                    amount_paid = order.Attributes["amount_paid"],
                    amount_due = order.Attributes["amount_due"],
                    currency = order.Attributes["currency"],
                    receipt = order.Attributes["receipt"],
                    offer_id = order.Attributes["offer_id"],
                    status = order.Attributes["status"],
                    attempts = order.Attributes["attempts"],
                    created_at = order.Attributes["created_at"],
                };

                return orders;
            }
            catch (Exception ex)
            {
                return BadRequest(new { Status = "fail", Message = ex.Message });

            }
        }
    }


}
