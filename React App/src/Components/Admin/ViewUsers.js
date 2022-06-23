import axios from "axios";
import { useEffect, useState } from "react";

function ViewUsers(props) {
  const [users, setUsers] = useState();
  const [deleteUsers, setDeleteUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios(process.env.REACT_APP_API_URL + "/Users/allusers")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setUsers(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteUsers]);

  function handleDelete(email) {
    console.log(email);
    if (window.confirm("Are you sure, wanted to delete this User?") == false) {
      return;
    }

    axios(process.env.REACT_APP_API_URL + "/Users/delete?email=" + email, {
      method: "DELETE",
    })
      .then((response) => {
        alert(response.data.message);
        if (response.status === 200) {
          setDeleteUsers(deleteUsers + 1);
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
      <div className="row m-0 ">
        {!isLoading &&
          users.map((d, i) => {
            return (
              d.role === props.role && (
                <div
                  key={"house-item-" + (i + 1)}
                  className="card col-md-3 view-user"
                >
                  <div className="user">
                    <img
                      src="/images/user.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">User Detail</h5>
                      <p className="card-text m-0">User Id : {d.userId}</p>

                      <p className="card-text m-0">User Name : {d.userName}</p>

                      <p className="card-text m-0">Email : {d.email}</p>

                      <p className="card-text m-0">
                        Mobile Number : {d.phoneNo}
                      </p>

                      <p className="card-text m-0">Address : {d.address}</p>

                      <p className="card-text m-0">Gender : {d.gender}</p>

                      <p className="card-text m-0">Date of Birth : {d.dob}</p>

                      <p className="card-text m-0">Password : {d.password}</p>

                      {/* <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(d.email);
                      }}
                    >
                      Delete
                    </button> */}
                    </div>
                  </div>
                </div>
              )
            );
          })}
      </div>
    </>
  );
}

export default ViewUsers;
