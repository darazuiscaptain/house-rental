import axios from "axios";
import { Base64 } from "js-base64";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import RoleCheck from "./RoleCheck";

function AddHouse() {
  RoleCheck();
  const [cookies, setCookie] = useCookies();
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    var houseno = e.target.houseno.value;
    var locality = e.target.locality.value;
    var city = e.target.city.value;
    var address = e.target.address.value;
    var mobile = e.target.mobile.value;
    var rent = e.target.rent.value;
    var description = e.target.description.value;
    var nationalid = e.target.nationalid.value;

    if (houseno === "" || houseno === null) {
      document.getElementById("housenoHelp").innerHTML =
        "House number can not be empty!";
      clearMessage();
      return;
    }
    if (locality === "" || locality === null) {
      document.getElementById("localityHelp").innerHTML =
        "Locality can not be empty!";
      clearMessage();
      return;
    }
    if (city === "" || city === null) {
      document.getElementById("cityHelp").innerHTML = "Please select a city!";
      clearMessage();
      return;
    }
    if (address === "" || address === null) {
      document.getElementById("addressHelp").innerHTML =
        "Address can not be empty!";
      clearMessage();
      return;
    }
    if (mobile === "" || mobile === null) {
      document.getElementById("mobileHelp").innerHTML =
        "Mobile number can not be empty!";
      clearMessage();
      return;
    }
    if (description === "" || description === null) {
      document.getElementById("descriptionHelp").innerHTML =
        "Please add house description!";
      clearMessage();
      return;
    }
    if (nationalid === "" || nationalid === null) {
      document.getElementById("nationalidHelp").innerHTML =
        "National Id can not be empty!";
      clearMessage();
      return;
    }
    if (rent === "" || rent === null) {
      document.getElementById("rentHelp").innerHTML = "Rent can not be empty!";
      clearMessage();
      return;
    }

    var userdata = JSON.parse(Base64.decode(cookies.userinfo));
    axios(process.env.REACT_APP_API_URL + "/Houses/add", {
      method: "POST",
      data: {
        userId: userdata.userId,
        houseNo: houseno,
        locality: locality,
        city: city,
        rent: rent,
        address: address,
        description: description,
        nationalId: nationalid,
        phoneNo: mobile,
        status: "available",
        postDate: new Date().toISOString(),
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert(response.data.message);
          history.push("/owner/myhouse");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
          console.log(error.response);
          return;
        }
        console.log(error.response);
        alert("Something went wrong! Error communicating to server.");
      });
  }
  function clearMessage() {
    setTimeout(() => {
      document.getElementById("housenoHelp").innerHTML = "";
      document.getElementById("localityHelp").innerHTML = "";
      document.getElementById("cityHelp").innerHTML = "";
      document.getElementById("rentHelp").innerHTML = "";
      document.getElementById("addressHelp").innerHTML = "";
      document.getElementById("descriptionHelp").innerHTML = "";
      document.getElementById("nationalidHelp").innerHTML = "";
      document.getElementById("mobileHelp").innerHTML = "";
    }, 3000);
  }

  return (
    <div className=" add-house">
      <div className="add-house-container">
        <form className="add-house-form" onSubmit={handleSubmit}>
          <div className="w-100 pb-4">
            <h2 className="pb-3">Add Houses</h2>
            <div id="error-message" className="form-text text-danger"></div>
            <div className="mb-3">
              <label htmlFor="houseno" className="form-label">
                House Number
              </label>
              <input
                type="text"
                className="form-control"
                id="houseno"
                aria-describedby="housenoHelp"
                name="houseno"
                placeholder="House Number"
              />
              <div id="housenoHelp" className="form-text text-danger"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="locality" className="form-label">
                Locality
              </label>
              <input
                type="text"
                className="form-control"
                id="locality"
                aria-describedby="localityHelp"
                name="locality"
                placeholder="Locality"
              />
              <div id="localityHelp" className="form-text text-danger"></div>
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <select
                name="city"
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Select....</option>
                <option value="bhopal">Bhopal</option>
                <option value="bangalore">Bangalore</option>
                <option value="kolkata">Kolkata</option>
                <option value="mumbai">Mumbai</option>
                <option value="pune">Pune</option>
                <option value="jablpur">Jablpur</option>
                <option value="lucknow">Lucknow</option>
                <option value="patna">Patna</option>
                <option value="kochi">Kochi</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="indore">Indore</option>
                <option value="sivan">Sivan</option>
              </select>
              <div id="cityHelp" className="form-text text-danger"></div>
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
                placeholder="Address"
              />
              <div id="addressHelp" className="form-text text-danger"></div>
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
                placeholder="Mobile Number"
              />
              <div id="mobileHelp" className="form-text text-danger"></div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
              />
              <div id="descriptionHelp" className="form-text text-danger"></div>
            </div>

            <div className="mb-3">
              <label htmlFor="nationalid" className="form-label">
                National Id
              </label>
              <input
                type="text"
                className="form-control"
                id="nationalid"
                name="nationalid"
                placeholder="National Id"
              />
              <div id="nationalidHelp" className="form-text text-danger"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="rent" className="form-label">
                Rent
              </label>
              <input
                type="number"
                className="form-control"
                id="rent"
                name="rent"
                placeholder="Rent"
              />
              <div id="rentHelp" className="form-text text-danger"></div>
            </div>
          </div>

          <button type="submit" className="add-house-btn">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHouse;
