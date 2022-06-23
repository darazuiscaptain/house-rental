namespace HouseRentalManagementApp.Models
{
    public class OrderModel
    {
        public string id { get; set; }
        public string razorpayKey { get; set; }
        public int amount { get; set; }
        public int amount_paid { get; set; }
        public int amount_due { get; set; }
        public string entity { get; set; }
        public int attempts { get; set; }
        public string currency { get; set; }
        public string offer_id { get; set; }
        public string status { get; set; }
        public string receipt { get; set; }
        public int created_at { get; set; }
    }
}
