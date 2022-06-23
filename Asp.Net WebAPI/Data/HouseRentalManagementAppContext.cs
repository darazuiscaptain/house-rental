#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HouseRentalManagementApp.Models;

namespace HouseRentalManagementApp.Data
{
    public class HouseRentalManagementAppContext : DbContext
    {
        public HouseRentalManagementAppContext (DbContextOptions<HouseRentalManagementAppContext> options)
            : base(options)
        {
        }

        public DbSet<HouseRentalManagementApp.Models.Booking> Booking { get; set; }

        public DbSet<HouseRentalManagementApp.Models.House> House { get; set; }

        public DbSet<HouseRentalManagementApp.Models.Login> Login { get; set; }

        public DbSet<HouseRentalManagementApp.Models.User> User { get; set; }
    }
}
