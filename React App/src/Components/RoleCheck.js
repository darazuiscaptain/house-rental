import { Base64 } from "js-base64";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function RoleCheck() {
  const [cookie, setCookie] = useCookies();
  let history = useHistory();

  var url = window.location.href;

  // window.location.href = "/user";

  // console.log(cookie.userinfo != null);

  if (cookie.userinfo != null) {
    var userdata = JSON.parse(Base64.decode(cookie.userinfo));
    console.log(userdata);
    if (userdata.role === "user" && !url.includes("/user")) {
      history.push("/user");
      return;
    } else if (userdata.role === "owner" && !url.includes("/owner")) {
      history.push("/owner");
      return;
    }
    return;
  }

  if(cookie.is_admin != null && cookie.is_admin === true ){
      if(!url.includes("/admin")){
        history.push("/admin");
        return;
      }
      return;
  }

  return;
}

export default RoleCheck;
