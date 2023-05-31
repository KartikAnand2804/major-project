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
  } else {
    return (
      <div className="h-screen w-screen p-6 items-center justify-center flex flex-col gap-8 font-mono bg-gray-200">
        <div className="">
          <h1 className="text-6xl text-black font-extrabold font-mono">
            Peer to Peer Ride service using blockchain.
          </h1>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <a href="/report">
            <button className="text-white bg-black p-4 hover:bg-gray-800 rounded-lg">
              View Report
            </button>
          </a>
          <a href="/research-paper">
            <button className="text-white bg-black p-4 hover:bg-gray-800 rounded-lg">
              View Paper
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
