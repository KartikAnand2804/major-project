import React, { useContext, useEffect } from "react";
import { RideContext } from "../context/RideContext";
import { UserContext } from "../context/UserContext";
import DriverDashboard from "./DriverDashboard";
import RiderDashboard from "./RiderDashboard";

function Home() {
  const { userInfo } = useContext(UserContext);

  if (userInfo?.typeOfUser === "rider") {
    return <RiderDashboard />;
  }
  if (userInfo?.typeOfUser === "driver") {
    return <DriverDashboard />;
  }
}

export default Home;
