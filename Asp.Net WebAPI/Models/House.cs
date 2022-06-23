using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HouseRentalManagementApp.Models
{
    public class House
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HouseId { get; set; }

        [Required]
        public int? UserId { get; set; }
        public User Users { get; set; }

        [Required]
        public int HouseNo { get; set; }

        [Required]
        public string Locality { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public int Rent { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string NationalId { get; set; }

        [Required]
        public string PhoneNo { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public DateTime PostDate { get; set; }


    }
}
