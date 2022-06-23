import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import RoleCheck from "./RoleCheck";
function HouseUpdate() {
  RoleCheck();
  let { houseId } = useParams();
  let history = useHistory();
  const [house, setHouse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios(
      process.env.REACT_APP_API_URL +
        "/Houses/searchByHouseId?houseId=" +
        houseId
    )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setHouse(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    var houseno = e.target.houseno.value;
    var locality = e.target.locality.value;
    var city = e.target.city.value;
    var address = e.target.address.value;
    var mobile = e.target.mobile.value;
    var rent = e.target.rent.value;
    var description = e.target.description.value;
    var status = e.target.status.value;

    if (houseno === "" || houseno === null) {
      document.getElementById("housenoHelp").innerHTML =
        "House number can not be empty!";
      clearMessage();
      return;
    }
    if (locality === "" || locality === null) {
      document.getElementById("localitylHelp").innerHTML =
        "Locality can not be empty!";
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
    if (rent === "" || rent === null) {
      document.getElementById("rentHelp").innerHTML = "Rent can not be empty!";
      clearMessage();
      return;
    }

    if (address === "" || address === null) {
      document.getElementById("addressHelp").innerHTML =
        "Address can not be empty!";
      clearMessage();
      return;
    }

    if (city === "" || city === null) {
      document.getElementById("cityHelp").innerHTML = "Please select a city!";
      clearMessage();
      return;
    }
    if (status === "" || status === null) {
      document.getElementById("statusHelp").innerHTML = "Please select status!";
      clearMessage();
      return;
    }
    axios(process.env.REACT_APP_API_URL + "/Houses/updatedetails", {
      method: "PUT",
      data: {
        houseId: houseId,
        houseNo: houseno,
        locality: locality,
        rent: rent,
        address: address,
        description: description,
        phoneNo: mobile,
        status: status,
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
      document.getElementById("mobileHelp").innerHTML = "";
      document.getElementById("statusHelp").innerHTML = "";
    }, 3000);
  }

  return (
    <div className="update-house">
      {!isLoading && (
        <form className="update-house-form" onSubmit={handleSubmit}>
      <h2 className="pb-3">Update Houses</h2>
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
              defaultValue={house.houseNo}
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
              defaultValue={house.locality}
            />
            <div id="localityHelp" className="form-text text-danger"></div>
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <select
              name="city"
              className="form-select"
              aria-label="Default select example"
              defaultValue={house.city}
            >
              <option defaultValue="">Select....</option>
              <option value="bhopal">Bhopal</option>
              <option value="bangalore">Bangalore</option>
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
              defaultValue={house.address}
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
              defaultValue={house.phoneNo}
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
              defaultValue={house.description}
            />
            <div id="descriptionHelp" className="form-text text-danger"></div>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              aria-label="Default select example"
              defaultValue={house.status}
              disabled={house.status === "occupied"}
            >
              <option value="">Select....</option>
              <option value="available">Available</option>
              <option value="notavailable">Not Available</option>
              {house.status === "occupied" && (
                <option value="occupied">Occupied</option>
              )}
            </select>
            <div id="statusHelp" className="form-text text-danger"></div>
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
              defaultValue={house.rent}
            />
            <div id="rentHelp" className="form-text text-danger"></div>
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Edit
          </button>
        </form>
      )}
    </div>
  );
}

export default HouseUpdate;
