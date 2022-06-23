import axios from "axios";
import { useEffect, useState } from "react";

function ViewHouses() {
  const [house, setHouse] = useState();
  const [deleteHouse, setDeleteHouse] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios(process.env.REACT_APP_API_URL + "/Houses")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setHouse(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteHouse]);

  function handleDelete(id) {
    console.log(id);
    if (window.confirm("Are you sure, wanted to delete this house?") == false) {
      return;
    }

    axios(process.env.REACT_APP_API_URL + "/Houses/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        alert(response.data.message);
        if (response.status === 200) {
          setDeleteHouse(deleteHouse + 1);
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
  }
  
  return (
    <>
      <div className="row m-0">
        {!isLoading &&
          house.map((d, i) => {
            return (
              <div key={"house-item-" + (i + 1)} className="card admin-house col-md-3">
                <img
                  src={"/images/house-"+(i+1)+".jpg"}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">House Detail</h5>
                  <p className="card-text m-0">
                    House Id : {d.houseId}
                  </p>
                  <p className="card-text m-0">
                    User Id : {d.userId}
                  </p>
                  <p className="card-text m-0">
                    Address : {d.houseNo}, {d.locality}, {d.address}, {d.city}
                  </p>
                  <p className="card-text m-0">
                    Rent : <b>{d.rent}</b>
                  </p>
                  <p className="card-text m-0">
                      National Id : {d.nationalId}
                  </p>
                  <p className="card-text m-0">
                    Description : {d.description}
                  </p>
                  <p className="card-text m-0">
                    Phone Number : {d.phoneNo}
                  </p>
                  <p className="card-text m-0">
                    Post Date : {d.postDate}
                  </p>
                  <p className="card-text">
                    Status : {d.status}
                  </p>
                  {/* <button
                    className="btn btn-danger"
                    onClick={()=>{
                        handleDelete(d.houseId)
                    }}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ViewHouses;
