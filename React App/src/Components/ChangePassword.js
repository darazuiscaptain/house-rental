import axios from "axios";
import { Base64 } from "js-base64";
import { useCookies } from "react-cookie";

function ChangePassword() {
  const [cookies, setCookie] = useCookies();

  var userdata = JSON.parse(Base64.decode(cookies.userinfo));
  console.log(userdata);

  function handleSubmit(e) {
    e.preventDefault();
    var oldpassword = e.target.oldpassword.value;
    var newpassword = e.target.newpassword.value;
    var cpassword = e.target.cpassword.value;

    if (
      newpassword === "" ||
      newpassword === null ||
      cpassword === "" ||
      cpassword === null ||
      oldpassword === "" ||
      oldpassword === null
    ) {
      document.getElementById("passwordHelp").innerHTML =
        "Passwords can not be empty!";
      clearMessage();
      return;
    }
    if (newpassword !== cpassword) {
      document.getElementById("passwordHelp").innerHTML =
        "Password doesn't match!";
      clearMessage();
      return;
    }

    axios(process.env.REACT_APP_API_URL + "/Logins/update", {
      method: "PUT",
      data: {
        email: userdata.email,
        oldPassword:  oldpassword,
        password: newpassword
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert(response.data.message);
          e.target.oldpassword.value ="";
          e.target.newpassword.value ="";
          e.target.cpassword.value ="";
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
      document.getElementById("passwordHelp").innerHTML = "";
    }, 3000);
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light h-100 change-password">
      <form className="change-password-form" onSubmit={handleSubmit}>
      <h3 className="pb-3 m-5">Change Password</h3>
        <div id="error-message" className="form-text tet-danger"></div>

        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            name="oldpassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newpassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cpassword"
          />
          <div id="passwordHelp" className="form-text text-danger"></div>
        </div>
        <button type="submit" className="btn btn-secondary mb-5">
          Change
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
