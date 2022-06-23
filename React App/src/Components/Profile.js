import axios from "axios";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Profile() {
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
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className=" bg-light d-flex flex-column justify-content-center align-items-center h-100">
      {!isLoading && (
        <form className="w-50 px-5 view-profile-form ">
          <h1 className="p-3">Profile</h1>
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
              disabled
              value={user.userName}
            />
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
              disabled
              value={user.phoneNo}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="gender"
              name="gender"
              disabled
              value={user.gender}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="text"
              className="form-control"
              id="dob"
              name="dob"
              disabled
              value={new Date(user.dob).toISOString().split("T")[0]}
            />
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
              disabled
              value={user.address}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default Profile;
