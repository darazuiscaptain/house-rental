import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">
      <p className="heading">Choose your Home using HRMS</p>
      <p className="title">
        HRMS has been bringing buyers and sellers togeter since 2022 by
        connecting them with the simplest.
      </p>
      <div className="row m-0 box-container">
        <div className="col-md-4 box-wrapper">
          <div className="box">
            <div className="image-container image1">
              <p className="card-title">Buy a Home</p>
            </div>
            <div className="text-container">
              <p className="content">
                Find your place with an immersive photo experience and the most
                listings, including things you won't find anywhere else.
              </p>
              <Link to="/login">
                <button className="card-btn active">Search Home</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 box-wrapper">
          <div className="box">
            <div className="image-container image2">
              <p className="card-title">Buy a Home</p>
            </div>
            <div className="text-container">
              <p className="content">
                Find your place with an immersive photo experience and the most
                listings, including things you won't find anywhere else.
              </p>
              <Link to="/login">
                <button className="card-btn">Search Home</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 box-wrapper">
          <div className="box">
            <div className="image-container image3">
              <p className="card-title">Buy a Home</p>
            </div>
            <div className="text-container">
              <p className="content">
                Find your place with an immersive photo experience and the most
                listings, including things you won't find anywhere else.
              </p>
              <Link to="/login">
                <button className="card-btn">Search Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
