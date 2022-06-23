import Header from "./Components/Header";
import Home from "./Components/Home";
import React from "react";
import Contact from "./Components/Contact";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import OwnerHomePage from "./Components/OwnerHomePage";
import AddHouse from "./Components/AddHouse";
import MyHouses from "./Components/MyHouses";
import UserHomePage from "./Components/UserHomePage";
import HouseUpdate from "./Components/HouseUpdate";
import ShowHouses from "./Components/ShowHouses";
import ShowHouseDetail from "./Components/ShowHouseDetail";
import BookHouse from "./Components/BookHouse";
import MyBookings from "./Components/MyBookings";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminHomePage from "./Components/Admin/AdminHomePage";
import ResetPassword from "./Components/ResetPassword";

function App() {
  return (
    <div className="main-container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/resetpassword">
            <ResetPassword />
          </Route>
          <Route path="/owner/addhouse">
            <AddHouse />
          </Route>
          <Route path="/owner/myhouse">
            <MyHouses />
          </Route>
          <Route path="/owner/updatehouse/:houseId">
            <HouseUpdate />
          </Route>
          <Route path="/owner">
            <OwnerHomePage />
          </Route>
          <Route path="/user/houses/:houseId">
            <ShowHouseDetail/>
          </Route>
          <Route path="/user/houses">
            <ShowHouses/>
          </Route>
          <Route path="/user/book/:houseId">
            <BookHouse/>
          </Route>
          <Route path="/user/mybookings">
            <MyBookings/>
          </Route>
          <Route path="/user">
            <UserHomePage />
          </Route>
          <Route path="/adminlogin">
            <AdminLogin/>
          </Route>
          <Route path="/admin">
            <AdminHomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
