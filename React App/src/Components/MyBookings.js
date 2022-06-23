import axios from "axios";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import RoleCheck from "./RoleCheck";

function MyBookings() {
  RoleCheck();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    var userdata = JSON.parse(Base64.decode(cookies.userinfo));

    axios(
      process.env.REACT_APP_API_URL +
        "/Bookings/byUserId?userId=" +
        userdata.userId
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setBookings(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
        if (error.response.status === 400) {
          // alert(error.response.data.message);
        }
      });
  }, []);

  return (
    <div className="row m-0 mybooking">
      {!isLoading &&
        bookings.length > 0 &&
        bookings.map((d, i) => {
          return (
            <div className="card-container" key={"booking-item-"+i}>
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4 image-container">
                    <img
                      src={"/images/house-"+(i+1)+".jpg"}
                      className="img-fluid image "
                      alt="..."
                    />
                  </div>
                  <div className="text-container col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Bookings Detail</h5>
                      <p className="card-text mb-1">Rent : {d.amount}</p>
                      <p>Duration : {d.duration} Month</p>
                      <p className="card-text date">
                        Booked on {new Date(d.bookingDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {!isLoading && bookings.length == 0 && (
        <h4 className="text-center text-secondary">
          Currently there are no bookings! <br />
          Please book from the book house section then visit again in this
          section.
        </h4>
      )}
    </div>
  );
}

export default MyBookings;
