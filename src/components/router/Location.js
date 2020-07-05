import React from "react";
import { useLocation } from "react-router-dom";

const Location = () => {
  const location = useLocation();
  // const history = useHistory();
  // const match = useRouteMatch("write-the-url-you-want-to-match-here");
console.log(location);
  return "";
}

export default Location;