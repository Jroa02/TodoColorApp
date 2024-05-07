import { useLocation } from "react-router-dom";
import { Cards } from "./../components/Cards";

import "./MainPage.css";

export const MainPage = () => {
  const loacation = useLocation();
  const { user } = loacation.state;
  return (
    <div className="MainPage">
      <Cards user={user} />
    </div>
  );
};
