import axios from "axios";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function UpdateDetail() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    var userdata = JSON.parse(Base64.decode(cookies.userinfo));
    console.log(userdata);
    axios(process.env.REACT_APP_API_URL + "/Users/" + userdata.email)
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    var username = e.target.username.value;
    var email = e.target.email.value;
    var mobile = e.target.mobile.value;
    var address = e.target.address.value;
    var dob = e.target.dob.value;
    
    var gender = e.target.gender.value;

    if (username === "" || username === null) {
      document.getElementById("userHelp").innerHTML =
        "User name can not be empty!";
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

    axios(process.env.REACT_APP_API_URL + "/Users/update", {
      method: "PUT",
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
  }

  function clearMessage() {
    setTimeout(() => {
      document.getElementById("userHelp").innerHTML = "";
      document.getElementById("emailHelp").innerHTML = "";
      document.getElementById("mobileHelp").innerHTML = "";
      document.getElementById("addressHelp").innerHTML = "";
      document.getElementById("genderHelp").innerHTML = "";
      document.getElementById("dobHelp").innerHTML = "";
    }, 3000);
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 bg-light update-detail">
      {!isLoading && (
        <form className="update-detail-form " onSubmit={handleSubmit}>
      <h1 className="pt-2  ">Update Details</h1>
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
              defaultValue={user.userName}
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
              disabled
              value={user.email}
            />
            <div id="emailHelp" className="form-text text-danger"></div>
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
              defaultValue={user.phoneNo}
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
              defaultChecked = {user.gender === "male"}
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
              defaultChecked = {user.gender === "female"}
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
            <input
              name="dob"
              id="dob"
              type="date"
              className="form-control"
              defaultValue={(new Date(user.dob)).toISOString().split('T')[0]}
            />

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
              defaultValue={user.address}
            />
            <div id="addressHelp" className="form-text text-danger"></div>
          </div>
          <button type="submit" className="btn btn-secondary mb-5 ">
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateDetail;
