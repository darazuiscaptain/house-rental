import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { NavLink, Route, Switch, Link } from "react-router-dom";

function Header() {
  const [cookie, setCookie, removeCookie] = useCookies();
  let history = useHistory();
  function handleLogout() {
    removeCookie("userinfo", { path: "/" });
    removeCookie("is_admin", { path: "/" });
    history.push("/");
  }
  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg  header-container p-3">
        <div className="container-fluid">
          <Link className="navbar-brand main-logo" to="/">
            HRMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <Switch>
                <Route exact path={["/", "/about", "/contact"]}>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      aria-current="page"
                      exact to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      to="/contact"
                    >
                      Contact
                    </NavLink>
                  </li>
                </Route>
                <Route path="/owner">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      aria-current="page"
                      exact to="/owner"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      to="/owner/addhouse"
                    >
                      Add Houses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      to="/owner/myhouse"
                    >
                      My Houses
                    </NavLink>
                  </li>
                </Route>
                <Route path="/user">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      aria-current="page"
                      exact to="/user"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      to="/user/houses"
                    >
                      Book House
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link header-links"
                      activeClassName="active"
                      to="/user/mybookings"
                    >
                      My Bookings
                    </NavLink>
                  </li>
                </Route>
              </Switch>
            </ul>
          </div>
          <Switch>
            <Route exact path="/">
              <Link to="/login">
                <button className="header-login-btn">Login</button>
              </Link>
              {/* <Link to="/registration">SIGNUP</Link> */}
            </Route>
            <Route path={["/owner", "/user", "/admin"]}>
              <a href="#" onClick={handleLogout} className="logout-btn">
                Logout
              </a>
            </Route>
          </Switch>
        </div>
      </nav>
    </div>
  );
}

export default Header;
