import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoleCheck from "./RoleCheck";

function ShowHouses() {
  RoleCheck();
  const [house, setHouse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios(process.env.REACT_APP_API_URL + "/Houses")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setHouse(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="row m-0 show-houses">
        {!isLoading &&
          house.map((d, i) => {
            return (
              <div key={"house-item-" + (i + 1)} className="col-md-4 item-box">
                <div className="item">
                  <div className="image-container">
                    <img
                      src={"/images/house-"+(i+1)+".jpg"}
                      className="image"
                      alt="..."
                    />
                    <div className="status-box">
                      <div className="icon">
                        <i className="fa-solid fa-circle-half-stroke"></i>
                      </div>
                      <div className="status">{d.status}</div>
                    </div>
                  </div>
                  <div className="content">
                  <p className="rent">
                      <b>Rs. {d.rent}</b> <span>/month</span>
                    </p>
                    <p className="address">
                      {d.locality}, {d.city}
                    </p>
                    
                    <Link
                      to={"/user/houses/" + d.houseId}
                    >
                      <button className="">
                      Show more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ShowHouses;
