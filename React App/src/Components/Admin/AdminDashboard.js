import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [houses, setHouses] = useState();
  const [tenants, setTenants] = useState();
  const [owners, setOwners] = useState();
  const [bookings, setBookings] = useState();
  const [payments, setPayments] = useState();
  useEffect(() => {
    axios
      .all([
        axios.get(process.env.REACT_APP_API_URL + "/Houses"),
        axios.get(process.env.REACT_APP_API_URL + "/Logins"),
        axios.get(process.env.REACT_APP_API_URL + "/Bookings"),
      ])
      .then(([response1, response2, response3]) => {
        setHouses(response1.data.length);
        var t = 0,
          o = 0,
          p = 0;
        response2.data.map((d) => {
          if (d.role === "user") {
            t++;
          } else if (d.role === "owner") {
            o++;
          }
        });
        setTenants(t);
        setOwners(o);
        response3.data.map((d) => {
          p += d.amount;
        });
        setPayments(p);
        setBookings(response3.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="row m-0">
      <div className="col">
        <div className="admin-dashboard">
          <div className="admin-total px-3 pb-5">
            <p className="text-end pt-3">
              <i className="fa-solid fa-house-chimney fa-xl"></i>
            </p>
            <p className="mb-1">{houses}</p>
            <p>Total Houses</p>
          </div>
          <div className="d-flex pt-2 pb-3 justify-content-end align-items-center">
            <Link to="/admin/houses">
              <p className="text-end px-3 m-0 view-list">
                View List <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="admin-dashboard">
          <div className="admin-total px-3 pb-5">
            <p className="text-end pt-3">
              <i className="fa-solid fa-house-chimney fa-xl"></i>
            </p>
            <p className="mb-1">{tenants}</p>
            <p>Total Tenants</p>
          </div>
          <div className="d-flex pt-2 pb-3 justify-content-end align-items-center">
            <Link to="/admin/tenants">
              {" "}
              <p className="text-end px-3 m-0 view-list">
                View List <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="admin-dashboard">
          <div className="admin-total px-3 pb-5">
            <p className="text-end pt-3">
              <i className="fa-solid fa-house-chimney fa-xl"></i>
            </p>
            <p className="mb-1">{owners}</p>
            <p>Total House Owner</p>
          </div>
          <div className="d-flex pt-2 pb-3 justify-content-end align-items-center">
            <Link to="/admin/owner">
              <p className="text-end px-3 m-0 view-list">
                View List <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="admin-dashboard">
          <div className="admin-total px-3 pb-5">
            <p className="text-end pt-3">
              <i className="fa-solid fa-house-chimney fa-xl"></i>
            </p>
            <p className="mb-1">{bookings}</p>
            <p>Total Bookings</p>
          </div>
          <div className="d-flex pt-2 pb-3 justify-content-end align-items-center">
            <Link to="/admin/bookings">
              <p className="text-end px-3 m-0 view-list">
                View List &nbsp;
                <i className="fa-solid fa-circle-arrow-right"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="admin-dashboard">
          <div className="admin-total px-3 pb-5">
            <p className="text-end pt-3">
              <i className="fa-solid fa-house-chimney fa-xl"></i>
            </p>
            <p className="mb-1">Rs. {payments}</p>
            <p>Total Payments </p>
          </div>
          <div className="d-flex h-auto pt-2 pb-3 justify-content-end align-items-center">
            <p className="text-end px-3 m-0 view-list">Payments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
