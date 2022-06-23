import axios from "axios";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import RoleCheck from "./RoleCheck";

function BookHouse() {
  RoleCheck();
  const history = useHistory();
  const [house, setHouse] = useState();
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookies] = useCookies();
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

  var userdata = JSON.parse(Base64.decode(cookies.userinfo));

  function capturePayment(orderdetails, bookingdetail) {
    console.log("check");
    console.log(orderdetails);
    var options = {
      key: orderdetails.razorpayKey, // Enter the Key ID generated from the Dashboard
      amount: orderdetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: orderdetails.currency,
      name: "HRMS",
      description: "Rent Payment",
      image: "",
      order_id: orderdetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);

        axios(process.env.REACT_APP_API_URL + "/Bookings", {
          method: "POST",
          data: {
            userId: userdata.userId,
            occupation: bookingdetail.occupation.value,
            nationalId: bookingdetail.nationalid.value,
            houseId: houseId,
            duration: bookingdetail.duration.value,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount: house.rent * duration,
            bookingDate: new Date().toISOString(),
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              alert(res.data.message);
              history.push("/user/mybookings");
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
      },
      prefill: {
        name: userdata.username,
        email: userdata.email,
        contact: userdata.phoneNo,
      },
      notes: {
        address: "HRMS Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });

    rzp1.open();
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (house.status === "occupied") {
      alert("Sorry! the House is already booked. You cannot book now.");
      return;
    }

    var occupation = e.target.occupation.value;
    var nationalid = e.target.nationalid.value;
    if (occupation === "" || occupation === null) {
      document.getElementById("occupationHelp").innerHTML =
        "Occupation can not be empty!";
      clearMessage();
      return;
    }
    if (nationalid === "" || nationalid === null) {
      document.getElementById("nationalIdHelp").innerHTML =
        "National Id can not be empty!";
      clearMessage();
      return;
    }

    axios(process.env.REACT_APP_API_URL + "/Payment/createorder", {
      method: "POST",
      data: {
        amount: house.rent * duration * 100,
        currency: "INR",
      },
    })
      .then((response) => {
        console.log(response.data);
        capturePayment(response.data, e.target);
      })
      .catch((error) => {
        // console.log(error);
        alert(error.response.data.message);
      });
  }

  function clearMessage() {
    setTimeout(() => {
      document.getElementById("occupationHelp").innerHTML = "";
      document.getElementById("nationalIdHelp").innerHTML = "";
    }, 3000);
  }
  function handleChange(e) {
    console.log(e.target.value);
    setDuration(e.target.value);
  }
  return (
    <div className=" pay-now ">
      {!isLoading && (
        <div className="pay-now-container">
          <form className=" pay-now-form " onSubmit={handleSubmit}>
            <h2>Confirm Details</h2>
            <div id="error-message" className="form-text text-danger"></div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                aria-describedby="addressHelp"
                name="address"
                disabled
                value={
                  house.houseNo +
                  ", " +
                  house.locality +
                  ", " +
                  house.address +
                  ", " +
                  house.city
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rent" className="form-label">
                Rent Per Month
              </label>
              <input
                type="number"
                className="form-control"
                id="rent"
                name="rent"
                disabled
                value={house.rent}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="occupation" className="form-label">
                Occupation
              </label>
              <input
                type="text"
                className="form-control"
                id="occupation"
                name="occupation"
                placeholder="Occupation"
              />
              <div id="occupationHelp" className="form-text text-danger"></div>
            </div>

            <div className="mb-3">
              <label htmlFor="nationalId" className="form-label">
                National Id
              </label>
              <input
                type="text"
                className="form-control"
                id="nationalId"
                name="nationalid"
                placeholder="National Id"
              />
              <div id="nationalIdHelp" className="form-text text-danger"></div>
            </div>

            <div className="mb-3">
              <label className="form-label">Duration</label>
              <select
                name="duration"
                className="form-select"
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option value="1">1 Month</option>
                <option value="3">3 Month</option>
                <option value="6">6 Month</option>
                <option value="9">9 Month</option>
                <option value="12">12 Month</option>
              </select>
            </div>

            <div className="d-flex align-items-center justify-content-between fs-3">
              <button type="submit" className="btn btn-success mt-3">
                Pay Now
              </button>

              <div className="d-inline-block">
                <b>Total Pay : {house.rent * duration}</b>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookHouse;
