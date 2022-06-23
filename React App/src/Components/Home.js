import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="row m-0 home-page">
        <div className="col-md-6 text-container">
          <p className="heading">
            Find Your Home and Get Your New Life Started
          </p>
          <p className="title">
            Buy or rent comfortable and beautiful
            <br />
            houses in many places
          </p>
          <div className="button-container">
            <Link to="/registration">
              <button className="section-front-btn">Sign Up</button>
            </Link>
            <Link to="/about">
              <button className="section-front-btn">Know More</button>
            </Link>
          </div>
        </div>
        <div className="col-md-6 image-container">
          <img src="/images/homepage-banner.png" className="image" />
        </div>
      </div>
      <div className="row m-0 home-content">
        <div className="col-md-5 image-container">
          <img src="/images/home-content-img1.jfif" className="image" />
        </div>
        <div className="col-md-7 text-container">
          <p className="heading">Simple Step, Big Move</p>
          <p className="content">
            Look for a house like you are looking for a mate, check the price,
            check the location and check if the house suits you. Use our
            application to find the home you want with just three simple steps.
          </p>
          <div className="row m-0 box-container">
            <div className="col-md-4 box-wrapper">
              <div className="box active">
                <p className="icon">
                  <i className="fa-solid fa-house-chimney"></i>
                </p>
                <p className="box-text">Searching for House</p>
              </div>
            </div>
            <div className="col-md-4 box-wrapper">
              <div className="box">
                <p className="icon">
                  <i className="fa-solid fa-list-check"></i>
                </p>
                <p className="box-text">Choose the Options</p>
              </div>
            </div>
            <div className="col-md-4 box-wrapper">
              <div className="box">
                <p className="icon">
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                </p>
                <p className="box-text">Pay and Book</p>
              </div>
            </div>
          </div>
          <Link to="/login">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
      </div>

      <div className="row m-0 footer-home">
        <div className="col-md-6 footer-heading">
          <h3>HRMS</h3>
          <p className="footer-title">
            Look for a house like you are looking for a mate, check the price,
            check the location and check if the house suits you.
          </p>
          <p className="icon">
            <span>
              <a href="https://www.facebook.com/" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </span>
            <span>
              <a href="https://twitter.com/" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </span>
            <span>
              <a href="https://www.linkedin.com/" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </span>
            <span>
              <a href="https://www.instagram.com/" target="_blank">
                <i className="fa-brands fa-instagram-square"></i>
              </a>
            </span>
          </p>
        </div>
        <div className="col-md-2 footer-service">
          <h5>Service</h5>
          <p>Provide houses</p>
          <p>Furnished houses</p>
          <p>Reasonable houses</p>
        </div>
        <div className="col-md-2 footer-industry">
          <h5>Industries</h5>
          <p>Public Sector</p>
          <p>Smart Houses</p>
          <p>Smart Offices</p>
        </div>
        <div className="col-md-2 footer-company">
          <h5>Company</h5>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Join Us</p>
        </div>
        <hr className="hr-line"></hr>
        <p className="year">
          All rights reserved by HRMS &copy; 2022
        </p>
      </div>
    </>
  );
}

export default Home;
