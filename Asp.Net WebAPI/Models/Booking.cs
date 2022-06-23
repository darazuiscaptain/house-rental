using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HouseRentalManagementApp.Models
{
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }

        public int? UserId { get; set; }

        public User Users { get; set; }

        [Required]
        public string Occupation { get; set; }

        [Required]
        public string NationalId { get; set; }

        [Required]
        public int Duration { get; set; }

        public int? HouseId { get; set; }

        public House Houses { get; set;}

        [Required]
        public string PaymentId { get; set; }

        [Required]
        public string OrderId { get; set; }

        [Required]
        public int Amount { get; set; }
        [Required]
        public DateTime BookingDate { get; set; }

    }
}
