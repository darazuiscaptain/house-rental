import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import RoleCheck from "./RoleCheck";
import UpdateDetail from "./UpdateDetail";

function UserHomePage() {
  RoleCheck();
  return (
    <div className="ownerpage">
      <div className="row m-0 p-0">
        <div className="col-md-3 text-center d-flex flex-column px-3 pt-5 ">
          <Link to="/user/profile">
            <button
              className="btn py-1 py-0 my-3 mx-2 w-75"
              type="button"
            >
              View Profile
            </button>
          </Link>
          <Link to="/user/updatedetail">
            <button
              className="btn py-1 py-0 my-3 mx-2 w-75"
              type="button"
            >
              Update Details
            </button>
          </Link>
          <Link to="/user/changepassword">
            <button
              className="btn py-1 py-0 my-3 mx-2 w-75"
              type="button"
            >
              Change Password
            </button>
          </Link>
        </div>
        <div className="col-md-9 p-0 ownertab">
          <Switch>
            <Route exact path="/user">
              <div
                className="tab-pane fade show ownerImage active w-100 h-100"
                id="v-pills-image"
                role="tabpanel"
                aria-labelledby="v-pills-image-tab"
              >
                <p>
                  Welcome to HRMS
                </p>
              </div>
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/user/updatedetail">
              <UpdateDetail />
            </Route>
            <Route path="/user/changepassword">
              <ChangePassword />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
