import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RoleCheck from "./RoleCheck";

function ShowHouseDetail() {
  RoleCheck();
  const [house, setHouse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let { houseId } = useParams();
  useEffect(() => {
    axios(
      process.env.REACT_APP_API_URL +
        "/Houses/searchByHouseId?houseId=" +
        houseId
    )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setHouse(response.data);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      {!isLoading && (
        <div className="row m-0 house-detail">
          <div className="col-md-6 image-container ">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/images/carousel1.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel2.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel3.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-6 text-container">
            <h3>House Details </h3>
            <table>
              <tbody>
                <tr>
                  <td>Address</td>
                  <td> &nbsp;&nbsp;&nbsp;: &nbsp; &nbsp;&nbsp;&nbsp;</td>
                  <td>
                    {house.houseNo}, {house.address}
                  </td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>&nbsp;&nbsp; : </td>
                  <td>{house.locality}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>&nbsp;&nbsp; : </td>
                  <td>{house.city}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>&nbsp;&nbsp; : </td>
                  <td>{house.description}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>&nbsp;&nbsp; : </td>
                  <td>{house.status}</td>
                </tr>
                <tr>
                  <td>Owner Contact</td>
                  <td>&nbsp;&nbsp; : </td>
                  <td>{house.phoneNo}</td>
                </tr>
                <tr>
                  <td>Rent</td>
                  <td>&nbsp;&nbsp; : </td>
                  <td className="fs-5">
                    <b>{house.rent}</b>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td className="py-4">
                    {house.status === "occupied" ||
                    house.status === "notavailable" ? (
                      <span className="text-danger fw-bold">
                        {house.status.toUpperCase()}
                      </span>
                    ) : (
                      <Link to={"/user/book/" + house.houseId}>
                        <button className=" btn">Book&nbsp;Now</button>
                      </Link>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowHouseDetail;
