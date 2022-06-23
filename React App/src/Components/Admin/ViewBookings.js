import axios from "axios";
import { useEffect, useState } from "react";

function ViewBookings() {
  const [bookings, setBookings] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios(process.env.REACT_APP_API_URL + "/Bookings")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setBookings(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="row m-0">
        {!isLoading &&
          bookings.map((d, i) => {
            return (
              <div key={"bookings-item-" + (i + 1)} className="card col-md-4 view-booking">
                <div className="booking">
                  <img
                    src={"/images/house-"+(i+1)+".jpg"}
                    className="card-img-top image-container"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Bookings Detail</h5>
                    <p className="card-text m-0">Booking Id : {d.bookingId}</p>
                    <p className="card-text m-0">User Id : {d.userId}</p>
                    <p className="card-text m-0">
                      Amount : <b>{d.amount}</b>
                    </p>
                    <p className="card-text m-0">Occupation : {d.occupation}</p>
                    <p className="card-text m-0">
                      National Id : {d.nationalId}
                    </p>
                    <p className="card-text m-0">
                      Duration : {d.duration} Month
                    </p>
                    <p className="card-text m-0">House Id : {d.houseId}</p>
                    <p className="card-text m-0">Payment Id : {d.paymentId}</p>
                    <p className="card-text m-0">Order Id : {d.orderId}</p>
                    <p className="card-text m-0">
                      Booking Date : {d.bookingDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ViewBookings;
