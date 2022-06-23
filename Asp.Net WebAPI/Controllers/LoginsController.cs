#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseRentalManagementApp.Data;
using HouseRentalManagementApp.Models;

namespace HouseRentalManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowCrossSite]
    public class LoginsController : ControllerBase
    {
        private readonly HouseRentalManagementAppContext _context;

        public LoginsController(HouseRentalManagementAppContext context)
        {
            _context = context;
        }

        // GET: api/Logins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> GetLogin()
        {
            return await _context.Login.ToListAsync();
        }

        // GET: api/Logins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetLogin(string id)
        {
            var login = await _context.Login.FindAsync(id);

            if (login == null)
            {
                return NotFound();
            }

            return login;
        }



        [Route("resetpassword")]

        [HttpPut]

        public async Task<Object> ResetPassword(LoginValidate login)
        {
            var logins = await _context.Login.FindAsync(login.Email);
            if (logins == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Email not found" });

            }
            try
            {
                
                logins.Password = login.Password;

                await _context.SaveChangesAsync();
                return Ok(new TokenResponseModel { Status = "success", Message = "Password reset successfully" });

            }
            catch (DbUpdateException)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Something went wrong! Please try again later." });

            }
        }




        [Route("update")]

        [HttpPut]

        public async Task<ActionResult<List<ChangePassword>>> UpdateLogin(ChangePassword login)
        {
            var logins = await _context.Login.FindAsync(login.Email);
            if (logins == null)
            { 
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Email not found" });

            }
            try
            {

                if(login.OldPassword != logins.Password)
                {
                    return BadRequest(new TokenResponseModel { Status = "fail", Message = "Incorrect old password!" });
                }
                logins.Password = login.Password;

                await _context.SaveChangesAsync();
                return Ok(new TokenResponseModel { Status = "success", Message = "Password updated successfully"});

            }
            catch (DbUpdateException)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Something went wrong! Please try again later." });

            }
        }

        //POST: api/Logins/validate
        [Route("validate")]
        [HttpPost]

        public async Task<IActionResult> LoginValidate(LoginValidate login)
        {
            if(login.Email == "" || login.Password == "")
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Email and Password cannot be empty" });
            }
            var logins = await _context.Login.FindAsync(login.Email);
            var users = _context.User.Where(d => d.Email == login.Email).FirstOrDefault();

            if (logins == null)
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Email not found" });
            }
            if(login.Password == logins.Password)
            {
                return Ok(new LoginResponseModel { Status = "success", Message = "Login Successful", Role = logins.Role, User = users});
            }
            else
            {
                return BadRequest(new TokenResponseModel { Status = "fail", Message = "Password doesn't match" });
            }

        }



        // POST: api/Logins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("add")]
        [HttpPost]
        public async Task<ActionResult<Login>> PostLogin(Login login)
        {
            _context.Login.Add(login);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LoginExists(login.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLogin", new { id = login.Email }, login);
        }

        // DELETE: api/Logins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogin(string id)
        {
            var login = await _context.Login.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }
            var users = _context.User.Where(d => d.Email == login.Email).FirstOrDefault();

            _context.Login.Remove(login);
            _context.User.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginExists(string id)
        {
            return _context.Login.Any(e => e.Email == id);
        }
    }

    internal class LoginResponseModel
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public User User { get; set; }
        public string Role { get; set; }
    }

    internal class TokenResponseModel
    {
        public string Status { get; set; }
        public string Message { get; set; }
       
    }
}
