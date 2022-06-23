import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [otpNo, setOtpNo] = useState();
  const [sendOTP, setSendOTP] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    var email = e.target.email.value;
    var otp = e.target?.otp?.value;
    var npassword = e.target?.npassword?.value;
    var cpassword = e.target?.cpassword?.value;
    if (!sendOTP && !verifyOTP && (email === "" || email === null)) {
      document.getElementById("emailHelp").innerHTML =
        "Email can not be empty!";
      clearMessage();
      return;
    }
    if (sendOTP && (otp === "" || otp === null)) {
      document.getElementById("otpHelp").innerHTML =
        "Please enter 6 digit OTP!";
      clearMessage();
      return;
    }
    if (verifyOTP && (npassword === "" || npassword === null)) {
      document.getElementById("npasswordHelp").innerHTML =
        "Passwords can not be empty!";
      clearMessage();
      return;
    }
    if (verifyOTP && (cpassword === "" || cpassword === null)) {
      document.getElementById("cpasswordHelp").innerHTML =
        "Passwords can not be empty!";
      clearMessage();
      return;
    }
    if (verifyOTP && cpassword !== npassword) {
      document.getElementById("cpasswordHelp").innerHTML =
        "Passwords dosn't match!";
      clearMessage();
      return;
    }
    if (!sendOTP && !verifyOTP) {
      axios(process.env.REACT_APP_API_URL + "/OTP/sendmail?email="+email, {
        method: "POST"
      })
        .then((response) => {
          if (response.status === 200) {
            setOtpNo(response.data.otp);
            alert(response.data.message);
            setSendOTP(true);
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
    if (sendOTP && !verifyOTP) {
        if(otp !== otpNo){
            alert("Incorrect OTP");
            return;
        }
      setSendOTP(false);
      setVerifyOTP(true);
    }
    if(!sendOTP && verifyOTP){
        axios(process.env.REACT_APP_API_URL + "/Logins/resetpassword", {
            method: "PUT",
            data:{
                email: email,
                password: npassword
            }
          })
            .then((response) => {
              if (response.status === 200) {
                alert(response.data.message);
                history.push("/login");
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
  }
  function clearMessage() {
    setTimeout(() => {
      document.getElementById("emailHelp").innerHTML = "";
      sendOTP && (document.getElementById("otpHelp").innerHTML = "");
      verifyOTP && (document.getElementById("npasswordHelp").innerHTML = "");
      verifyOTP && (document.getElementById("cpasswordHelp").innerHTML = "");
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
          <h2 className="py-3">Reset Password </h2>
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

          {sendOTP && (
            <div className="">
              <label htmlFor="otp" className="form-label">
                OTP
              </label>
              <input
                name="otp"
                type="number"
                className="form-control"
                id="otp"
                aria-describedby="otpHelp"
                placeholder="Enter OTP"
              />
              <div id="otpHelp" className="form-text text-danger"></div>
            </div>
          )}

          {verifyOTP && (
            <>
              {" "}
              <div className="">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  New Password
                </label>
                <input
                  name="npassword"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="New Password"
                />
                <div id="npasswordHelp" className="form-text text-danger"></div>
              </div>
              <div className="">
                <label htmlFor="exampleInputPassword2" className="form-label">
                  Confirm Password
                </label>
                <input
                  name="cpassword"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                />
                <div id="cpasswordHelp" className="form-text text-danger"></div>
              </div>
            </>
          )}

          {!sendOTP && !verifyOTP && (
            <button type="submit" className="btn btn-primary mt-3">
              Send OTP
            </button>
          )}

          {sendOTP && !verifyOTP && (
            <button type="submit" className="btn btn-primary mt-3">
              Verify OTP
            </button>
          )}

          {verifyOTP && (
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
