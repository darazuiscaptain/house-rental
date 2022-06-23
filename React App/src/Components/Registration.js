import axios from "axios";
import { Base64 } from "js-base64";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import RoleCheck from "./RoleCheck";

function Registration() {
  RoleCheck();
  const [cookies, setCookie] = useCookies();
  let history = useHistory();
  function handleSubmit(e) {
    // console.log("check");
    e.preventDefault();
    var username = e.target.username.value;
    var email = e.target.email.value;
    var password = e.target.password.value;
    var cpassword = e.target.cpassword.value;
    var mobile = e.target.mobile.value;
    var address = e.target.address.value;
    var role = e.target.role.value;
    var dob = e.target.dob.value;
    var gender = e.target.gender.value;
    if (username === "" || username === null) {
      document.getElementById("userHelp").innerHTML =
        "User name can not be empty!";
      clearMessage();
      return;
    }
    if (email === "" || email === null) {
      document.getElementById("emailHelp").innerHTML =
        "Email can not be empty!";
      clearMessage();
      return;
    }
    if (
      password === "" ||
      password === null ||
      cpassword === "" ||
      cpassword === null
    ) {
      document.getElementById("passwordHelp").innerHTML =
        "Passwords can not be empty!";
      clearMessage();
      return;
    }
    if (mobile === "" || mobile === null) {
      document.getElementById("mobileHelp").innerHTML =
        "Mobile number can not be empty!";
      clearMessage();
      return;
    }
    if (gender === "" || gender === null) {
      document.getElementById("genderHelp").innerHTML =
        "Please select a gender!";
      clearMessage();
      return;
    }
    if (dob === "" || dob === null) {
      document.getElementById("dobHelp").innerHTML =
        "Date of Birth can not be empty!";
      clearMessage();
      return;
    }

    if (address === "" || address === null) {
      document.getElementById("addressHelp").innerHTML =
        "Address can not be empty!";
      clearMessage();
      return;
    }
    if (role === "" || role === null) {
      document.getElementById("roleHelp").innerHTML = "Please select a role!";
      clearMessage();
      return;
    }
    if (password !== cpassword) {
      document.getElementById("passwordHelp").innerHTML =
        "Password doesn't match!";
      clearMessage();
      return;
    }

    axios(process.env.REACT_APP_API_URL + "/Users/add", {
      method: "POST",
      data: {
        userName: username,
        email: email,
        phoneNo: mobile,
        address: address,
        gender: gender,
        dob: dob,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          var userinfo = Base64.encode(
            JSON.stringify(Object.assign(response.data.user, { role: role }))
          );
          setCookie("userinfo", userinfo, { path: "/" });
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
          return;
        }
        console.log(error.response);
        alert("Something went wrong! Error communicating to server.");
      });
    axios(process.env.REACT_APP_API_URL + "/Logins/add", {
      method: "POST",
      data: {
        email: email,
        password: password,
        role: role,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          if (role === "user") {
            history.push("/user");
          } else {
            history.push("/owner");
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
          return;
        }
        console.log(error.response);
        alert("Something went wrong! Error communicating to server.");
      });
  }
  function clearMessage() {
    setTimeout(() => {
      document.getElementById("userHelp").innerHTML = "";
      document.getElementById("emailHelp").innerHTML = "";
      document.getElementById("passwordHelp").innerHTML = "";
      document.getElementById("mobileHelp").innerHTML = "";
      document.getElementById("addressHelp").innerHTML = "";
      document.getElementById("roleHelp").innerHTML = "";
      document.getElementById("genderHelp").innerHTML = "";
      document.getElementById("dobHelp").innerHTML = "";
    }, 3000);
  }

  return (
    <div className="registration-page">
      
      <form className="registration-form" onSubmit={handleSubmit}>
      <h2 className="pb-3">Registration Form</h2>
        <div id="error-message" className="form-text text-danger"></div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            aria-describedby="emailHelp"
            name="username"
          />
          <div id="userHelp" className="form-text text-danger"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
          />
          <div id="emailHelp" className="form-text text-danger"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="cpassword"
          />
          <div id="passwordHelp" className="form-text text-danger"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneNumber"
            name="mobile"
          />
          <div id="mobileHelp" className="form-text text-danger"></div>
        </div>
        <label className="form-label pe-5 me-5 mt-2 mb-4">Gender</label>
        <div className="form-check form-check-inline pe-4">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="male"
          />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value="female"
          />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
        <div id="genderHelp" className="form-text text-danger"></div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input name="dob" id="dob" type="date" className="form-control" />
          <div id="dobHelp" className="form-text text-danger"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
          />
          <div id="addressHelp" className="form-text text-danger"></div>
        </div>

        <label className="form-label">Role</label>
        <select
          name="role"
          className="form-select"
          aria-label="Default select example"
        >
          <option defaultValue="">
            Select....
          </option>
          <option value="user">User</option>
          <option value="owner">House Owner</option>
        </select>
        <div id="roleHelp" className="form-text text-danger"></div>

        <button type="submit" className="btn btn-primary mt-3">
          Sign Up
        </button>
      </form>
      <div className="pt-3 ms-5 ps-5">
        <span>
          Already a member? <Link to="/login">Login Now</Link>
        </span>
      </div>
    </div>
  );
}

export default Registration;
