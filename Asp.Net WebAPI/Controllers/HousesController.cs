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
    public class HousesController : ControllerBase
    {
        private readonly HouseRentalManagementAppContext _context;

        public HousesController(HouseRentalManagementAppContext context)
        {
            _context = context;
        }

        // GET: api/Houses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<House>>> GetHouse()
        {
            return await _context.House.ToListAsync();
        }


        [Route("searchByHouseId")]
        [HttpGet]
        public async Task<ActionResult<House>> GetHouseByHouseId(int houseId = -1)
        {
            var house = await _context.House.FindAsync(houseId);

            if (house == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "No Data Found!" });
            }

            return house;
        }



        // GET: api/Houses/city/?city=5
        [Route("searchByCity")]
        [HttpGet]
        public async Task<ActionResult<List<House>>> GetHouseByCity(string city = null)
        {
            var house = _context.House.Where(d => d.City == city).ToList();
            if (house.Count() == 0)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "No Data Found!" });

            }

            return house;
        }



        //GET : api/House/searchByUserId?userid=5
        [Route("searchByUserId")]
        [HttpGet]
        public async Task<ActionResult<List<House>>> GetHouseByUserId(int userId = -1)
        {
            var house = _context.House.Where(d => d.UserId == userId).ToList();
            if (house.Count() == 0)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "No Data Found!" });

            }

            return house;
        }



        // PUT: api/Houses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("updatedetails")]
        [HttpPut]
        public async Task<IActionResult> PutHouseDetails(HouseUpdate house)
        {
            var houses = await _context.House.FindAsync(house.HouseId);
            if (houses == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "House Details not found" });

            }
            try
            {
                houses.Locality = house.Locality;
                houses.HouseNo = house.HouseNo;
                houses.Rent=house.Rent;
                houses.Status = house.Status;
                houses.PhoneNo = house.PhoneNo;
                houses.Address = house.Address;
                houses.Description = house.Description;

                await _context.SaveChangesAsync();
                return Ok(new TokenResponseModel { Status = "success", Message = "House details updated successfully" });

            }
            catch (DbUpdateException)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Something went wrong! Please try again later." });

            }

            return NoContent();
        }

        [Route("updateStatus")]
        [HttpPut]
        public async Task<IActionResult> PutHouseStatus(HouseStatus house)
        {
            var houses = await _context.House.FindAsync(house.HouseId);
            if (houses == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "House Details not found" });

            }
            try
            {
                houses.Status = house.Status;

                await _context.SaveChangesAsync();
                return Ok(new TokenResponseModel { Status = "success", Message = "House status updated successfully" });

            }
            catch (DbUpdateException)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Something went wrong! Please try again later." });

            }

            return NoContent();
        }



        // POST: api/Houses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("add")]
        [HttpPost]
        public async Task<ActionResult<HouseDetail>> PostHouse(HouseDetail house)
        {
            var users = _context.User.Where(d => d.UserId == house.UserId).FirstOrDefault();
            if (users == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "User not found" });

            }
            try
            {
                DateTime d;
                DateTime.TryParse(house.PostDate, out d);
                _context.House.Add(new House
                {
                    UserId = house.UserId,
                    Address = house.Address,
                    City = house.City,
                    Description = house.Description,
                    Locality = house.Locality,
                    HouseNo = house.HouseNo,
                    NationalId = house.NationalId,
                    PhoneNo = house.PhoneNo,
                    Rent = house.Rent,
                    Status = house.Status,
                    PostDate = d
                }) ;
                await _context.SaveChangesAsync();
                return Ok(new TokenResponseModel { Status = "success", Message = "House Registered successfully" });

            }
            catch (DbUpdateException)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Something went wrong! Please try again later." });

            }
           
        }

        // DELETE: api/Houses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHouse(int id)
        {
            var house = await _context.House.FindAsync(id);
            if (house == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "House not found" });
            }
            if(house.Status == "occupied")
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Sorry! House is occupied currently.\n You cannot delete right now" });

            }
            _context.House.Remove(house);
            await _context.SaveChangesAsync();

            return Ok(new TokenResponseModel { Status = "success", Message = "House Deleted successfully" });
        }

        private bool HouseExists(int id)
        {
            return _context.House.Any(e => e.HouseId == id);
        }
    }
}
