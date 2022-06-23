import axios from "axios";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import HouseDetail from "./HouseDetail";
import RoleCheck from "./RoleCheck";

function MyHouses() {
  RoleCheck();
  const [houses, setHouses] = useState([]);
  const [deleteHouse, setDeleteHouse] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies();
  useEffect(() => {
    var userdata = JSON.parse(Base64.decode(cookies.userinfo));

    axios(
      process.env.REACT_APP_API_URL +
        "/Houses/searchByUserId?userId=" +
        userdata.userId
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setHouses(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
        if (error.response.status === 400) {
          // alert(error.response.data.message);
        }
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
    <div className="myhouse">
      {!isLoading &&
        houses.length > 0 &&
        houses.map((d, i) => {
          return (
            <HouseDetail
              key={"house-" + (i + 1)}
              delete={handleDelete}
              data={d}
              i={i+1}
            />
          );
        })}
      {!isLoading && houses.length == 0 && (
        <h4 className="text-center text-secondary">
          Currently there are no houses added! <br />
          Please add first then visit again in this section.
        </h4>
      )}
    </div>
  );
}

export default MyHouses;
