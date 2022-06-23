import { Link, Route, Switch } from "react-router-dom";
import RoleCheck from "../RoleCheck";
import AdminDashboard from "./AdminDashboard";
import ViewBookings from "./ViewBookings";
import ViewHouses from "./ViewHouses";
import ViewUsers from "./ViewUsers";

function AdminHomePage() {
  RoleCheck();
  return (
    <div className="row m-0" style={{ minHeight: "92vh" }}>
      <div className="col-md-3 admintab">
        <div className="admintab-wrapper">
          <Link to="/admin">
            <button className="adimintab-btn">Dashboard</button>
          </Link>
          <Link to="/admin/houses">
            <button className="adimintab-btn">Houses</button>
          </Link>
          <Link to="/admin/tenants">
            <button className="adimintab-btn">Tenants</button>
          </Link>
          <Link to="/admin/owner">
            <button className="adimintab-btn">House Owner</button>
          </Link>
          <Link to="/admin/bookings">
            <button className="adimintab-btn">Bookings</button>
          </Link>
        </div>
      </div>
      <div className="col-md-9 adminpage">
        <Switch>
          <Route exact path="/admin">
            <AdminDashboard />
          </Route>
          <Route path="/admin/houses">
            <ViewHouses />
          </Route>
          <Route path="/admin/tenants">
            <ViewUsers role={"user"} />
          </Route>
          <Route path="/admin/owner">
            <ViewUsers role={"owner"} />
          </Route>
          <Route path="/admin/bookings">
            <ViewBookings />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminHomePage;
