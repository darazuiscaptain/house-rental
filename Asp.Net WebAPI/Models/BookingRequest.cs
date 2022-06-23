namespace HouseRentalManagementApp.Models
{
    public class BookingRequest
    {

        public int UserId { get; set; }

        public string Occupation { get; set; }

        public string NationalId { get; set; }
        public int HouseId { get; set; }
        public int Duration { get; set; }
        public string PaymentId { get; set; }
        public string OrderId { get; set; }

        public int Amount { get; set; }

        public string BookingDate { get; set; }

    }
}
