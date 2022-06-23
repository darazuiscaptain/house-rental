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
    public class UsersController : ControllerBase
    {
        private readonly HouseRentalManagementAppContext _context;

        public UsersController(HouseRentalManagementAppContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            var users = _context.User.Where(d => d.Email == email).FirstOrDefault();
            if (users == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Email not found" });

            }

            return users;
        }
        // GET: api/Users/5
        [Route("allusers")]
        [HttpGet]
        public async Task<Object> GetAllUser()
        {

            var users = _context.User
                .Join(
                    _context.Login,
                    user => user.Email,
                    login => login.Email,
                    (user, login) => new
                    {
                        UserId = user.UserId,
                        UserName = user.UserName,
                        Email = user.Email,
                        PhoneNo = user.PhoneNo,
                        Address = user.Address,
                        Gender = user.Gender,
                        DOB = user.DOB,
                        Password = login.Password,
                        Role = login.Role,
                    }
                ).ToList();

            return users;
        }



        [Route("update")]

        [HttpPut]

        public async Task<ActionResult<List<UserValidate>>> UpdateUser(UserValidate user)
        {
            var users = _context.User.Where(d => d.Email == user.Email).FirstOrDefault();
            if (users == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Email not found" });

            }
            try
            {
                users.UserName = user.UserName;
                users.PhoneNo = user.PhoneNo;
                users.Gender= user.Gender;
                users.DOB = user.DOB;
                users.Address = user.Address;


                await _context.SaveChangesAsync();
                return Ok(new TokenResponseModel { Status = "success", Message = "Details updated successfully" });

            }
            catch (DbUpdateException)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Something went wrong! Please try again later." });

            }
        }






        [Route("add")]

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            var users = _context.User.Where(d => d.Email == user.Email).FirstOrDefault();
            if (users !=null)
            {
                return BadRequest(new UserResponseModel { Status = "fail", Message = "Email Already Present!" });
            }

            try
            {
                _context.User.Add(user);
                await _context.SaveChangesAsync();

                var userdata = _context.User.Where(d => d.Email == user.Email).FirstOrDefault();

                return Ok(new UserRegisterResponse { Status = "success", Message = "User registered successfully", User= userdata});
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new UserResponseModel { Status = "fail", Message = "Something went wrong! Please try again later" });

            }
        }

        [Route("delete")]
        // DELETE: api/Users/5
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var users = _context.User.Where(d => d.Email == email).FirstOrDefault();
            var bookings = _context.Booking.Where(d => d.UserId == users.UserId).ToList();
            var houses = _context.House.Where(d => d.UserId == users.UserId).ToList();
            if (users == null)
            {
                return BadRequest(new UserResponseModel { Status = "fail", Message = "Email doesn't exist!" });
            }
            var logins = _context.Login.Where(d => d.Email == email).FirstOrDefault();
            try
            {

                _context.Booking.RemoveRange(bookings);
                _context.House.RemoveRange(houses);
                _context.User.Remove(users);
                _context.Login.Remove(logins);
                await _context.SaveChangesAsync();

                return Ok(new UserResponseModel { Status = "success", Message = "User deleted successfully" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new UserResponseModel { Status = "fail", Message = "Something went wrong! Please try again later" });

            }
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserId == id);
        }
    }

    internal class UserResponseModel
    {
        public string Status { get; set; }
        public string Message { get; set; }
    }
    internal class UserRegisterResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public User User { get; set; }
    }
}
