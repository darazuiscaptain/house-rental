#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseRentalManagementApp.Data;
using HouseRentalManagementApp.Models;

namespace HouseRentalManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowCrossSite]
    public class BookingsController : ControllerBase
    {
        private readonly HouseRentalManagementAppContext _context;

        public BookingsController(HouseRentalManagementAppContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
            return await _context.Booking.ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Booking.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        [Route("byUserId")]
        [HttpGet]
        public async Task<ActionResult<List<BookingResponse>>> GetBookingByUserId(int userId=-1)
        {
            var users = _context.User.Where(d => d.UserId == userId).FirstOrDefault();
            if (users == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "User not found" });

            }
            var bookings = _context.Booking.Where(d => d.UserId == userId).ToList();
            if (bookings.Count() == 0)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "No Data Found!" });

            }
            List<BookingResponse> result = new List<BookingResponse>();
            foreach (var booking in bookings)
            {
                result.Add(new BookingResponse {
                    UserId = booking.UserId, 
                    Amount=booking.Amount, 
                    BookingDate=booking.BookingDate, 
                    BookingId=booking.BookingId, 
                    Duration=booking.Duration, 
                    HouseId=booking.HouseId, 
                    PaymentId=booking.PaymentId ,
                    Occupation=booking.Occupation
                });
            }
            return result;


        }



        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookingRequest>> PostBooking(BookingRequest booking)
        {
            var users = _context.User.Where(d => d.UserId == booking.UserId).FirstOrDefault();
            if (users == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "User not found" });

            }
            var houses = await _context.House.FindAsync(booking.HouseId);
            if (houses == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "House Details not found" });

            }
            if(houses.Status != "available")
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "House is not available" });
            }
            try
            {
                DateTime d;
                DateTime.TryParse(booking.BookingDate, out d);
                _context.Booking.Add(new Booking { 
                    Amount=booking.Amount, 
                    BookingDate=d, 
                    Duration=booking.Duration, 
                    Occupation=booking.Occupation, 
                    NationalId=booking.NationalId, 
                    PaymentId=booking.PaymentId, 
                    OrderId=booking.OrderId, 
                    HouseId=booking.HouseId, 
                    UserId=booking.UserId
                });
                //await _context.SaveChangesAsync();
                houses.Status = "occupied";

                await _context.SaveChangesAsync();


                return Ok(new TokenResponseModel { Status = "success", Message = "House booked successfully" });
            }
            catch (DbUpdateException)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Something went wrong! Please try again later." });

            }

        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Booking.FindAsync(id);
            if (booking == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Booking not found!" });
            }
            var houses = await _context.House.FindAsync(booking.HouseId);

            _context.Booking.Remove(booking);
            houses.Status = "available";
            await _context.SaveChangesAsync();

            return Ok(new TokenResponseModel { Status = "success", Message = "Booking deleted successfully" });
        }

        private bool BookingExists(int id)
        {
            return _context.Booking.Any(e => e.BookingId == id);
        }
    }
}
