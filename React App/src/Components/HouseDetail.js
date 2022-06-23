import { Link } from "react-router-dom";

function HouseDetail(props) {
  // var d = Date.parse(props.data.postDate);
  // var date = new Date(props.data.postDate);
  // console.log(date);
  // var postdate = (date.getDay()+1)+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
  return (
    <div className="housed">
      <div className="card housed-container">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={"/images/house-"+props.i+".jpg"}
              className="img-fluid image-container"
              alt="..."
            />
          </div>
          <div className="col-md-8 text-container">
            <div className="card-body">
              <h5 className="card-title">House Detail</h5>
              <p className="card-text mb-1">
                {props.data.houseNo}, {props.data.locality},{" "}
                {props.data.address}, {props.data.city}
              </p>
              <p className="card-text mb-1">Rent : {props.data.rent}</p>
              <p className="card-text mb-1 status">Status : {props.data.status}</p>
              <p className="card-text">
                <small className="text-muted">
                  Posted on {new Date(props.data.postDate).toLocaleString()}
                  {/* Posted on {postdate} */}
                </small>
              </p>
              <div className="card-footer">
                <Link to={"/owner/updatehouse/" + props.data.houseId}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => {
                    props.delete(props.data.houseId);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetail;

// new Date("2022-10-02T11:13:01").toUTCString()
