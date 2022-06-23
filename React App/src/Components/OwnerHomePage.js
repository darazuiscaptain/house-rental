import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import RoleCheck from "./RoleCheck";
import UpdateDetail from "./UpdateDetail";

function OwnerHomePage() {
  RoleCheck();
  return (
    <div className="ownerpage">
      <div className="row m-0 p-0">
        <div className="col-md-3 d-flex flex-column text-center px-3 pt-5">
          <Link to="/owner/profile">
          <button
              className="btn py-1 py-0 my-3 mx-2 w-75"
              type="button"
            >   View Profile
            </button>
          </Link>
          <Link to="/owner/updatedetail">
          <button
              className="btn py-1 py-0 my-3 mx-2 w-75"
              type="button"
            >   Update Details
            </button>
          </Link>
          <Link to="/owner/changepassword">
          <button
              className="btn py-1 py-0 my-3 mx-2 w-75"
              type="button"
            >  Change Password
            </button>
          </Link>
        </div>
        <div className="col-md-9 ownertab p-0">
          <Switch>
            <Route exact path="/owner">
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
            <Route path="/owner/profile">
              <Profile />
            </Route>
            <Route path="/owner/updatedetail">
              <UpdateDetail />
            </Route>
            <Route path="/owner/changepassword">
              <ChangePassword />
            </Route>
            
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default OwnerHomePage;
