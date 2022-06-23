import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Base64 } from "js-base64";
import RoleCheck from "../RoleCheck";

function AdminLogin() {
  RoleCheck();
  let history = useHistory();
  const [cookies, setCookie] = useCookies();
  function handleSubmit(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var password = e.target.password.value;
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

    axios(process.env.REACT_APP_API_URL + "/Logins/validate", {
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          if ("admin" !== response.data.role) {
            alert("Access denied!");
            return;
          }

          setCookie("is_admin", true, { path: "/" });
          alert(response.data.message);
          console.log(response.data);
          history.push("/admin");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
          return;
        }
        alert("Something went wrong please try again!")
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
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="py-3">Admin Login Form</h2>
      <form style={{ width: "30%" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text text-danger"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
          <div id="passwordHelp" className="form-text text-danger"></div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
      <div className="pt-3 ms-5 ps-5">
        <span>
          Not a member? <Link to="/registration">Sign-Up Now</Link>
        </span>
      </div>
    </div>
  );
}

export default AdminLogin;
