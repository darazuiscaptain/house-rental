import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Base64 } from "js-base64";
import RoleCheck from "./RoleCheck";

function Login() {
  // RoleCheck();
  let history = useHistory();
  const [cookies, setCookie] = useCookies();
  function handleSubmit(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var password = e.target.password.value;
    var role = e.target.role.value;
    if (email === "" || email === null) {
      document.getElementById("emailHelp").innerHTML =
        "Email can not be empty!";
      clearMessage();
      return;
    }
    if (password === "" || password === null) {
      document.getElementById("passwordHelp").innerHTML =
        "Passwords can not be empty!";
      clearMessage();
      return;
    }
    if (role === "" || role === null) {
      document.getElementById("roleHelp").innerHTML = "Please select a role!";
      clearMessage();
      return;
    }
    axios(process.env.REACT_APP_API_URL + "/Logins/validate", {
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          if (role !== response.data.role) {
            alert("Incorrect role selected!");
            return;
          }

          //   console.log(response.data.user);
          //   console.log(Base64.decode(userinfo));
          if (response.data.role === "user") {
            var userinfo = Base64.encode(
              JSON.stringify(
                Object.assign(response.data.user, { role: response.data.role })
              )
            );
            setCookie("userinfo", userinfo, { path: "/" });
            alert(response.data.message);
            console.log(response.data);
            history.push("/user");
          } else if (response.data.role === "owner") {
            var userinfo = Base64.encode(
              JSON.stringify(
                Object.assign(response.data.user, { role: response.data.role })
              )
            );
            setCookie("userinfo", userinfo, { path: "/" });
            alert(response.data.message);
            console.log(response.data);
            history.push("/owner");
          } else if (response.data.role === "admin") {
            setCookie("is_admin", true, { path: "/" });
            alert(response.data.message);
            console.log(response.data);
            history.push("/admin");
          } else {
            alert("You are not allowed to login!");
          }
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          alert(error.response.data.message);
          return;
        }
        console.log(error);
      });
  }
  function clearMessage() {
    setTimeout(() => {
      document.getElementById("emailHelp").innerHTML = "";
      document.getElementById("passwordHelp").innerHTML = "";
      document.getElementById("roleHelp").innerHTML = "";
    }, 2500);
  }

  return (
    <div className="row m-0 login-page">
      <div className="col-md-6 image-container">
        <p>Create Account</p>
        <Link to="/registration">
          <button>Sign-Up</button>
        </Link>
      </div>
      <div className="col-md-6 login-content">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="py-3">Login Form</h2>
          <div className="">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <div id="emailHelp" className="form-text text-danger"></div>
          </div>
          <div className="">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <div id="passwordHelp" className="form-text text-danger"></div>
          </div>
          <label className="form-label">Role</label>
          <select
            name="role"
            className="form-select mb-3"
            aria-label="Default select example"
          >
            <option value="">Select....</option>
            <option value="user">User</option>
            <option value="owner">House Owner</option>
            <option value="admin">Admin</option>
          </select>
          <div id="roleHelp" className="form-text text-danger"></div>

          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
          <Link to="/resetpassword">
            <p className="w-100 text-center pt-4">Forgot your password?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
