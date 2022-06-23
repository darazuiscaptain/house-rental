namespace HouseRentalManagementApp.Models
{
    public class BookingResponse
    {
        public int BookingId { get; set; }
        public int? UserId { get; set; }

        public string Occupation { get; set; }

        public int? HouseId { get; set; }
        public int Duration { get; set; }
        public string PaymentId { get; set; }
        public string OrderId { get; set; }

        public int Amount { get; set; }

        public DateTime BookingDate { get; set; }

    }
}
