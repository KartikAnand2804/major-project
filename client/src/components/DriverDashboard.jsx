import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WalletContext } from "../context/WalletContext";
import { RideContext } from "../context/RideContext";
import RiderCard from "./RiderCard";
import { UserContext } from "../context/UserContext";

function DriverDashboard() {
  const { walletConnected, walletId } = useContext(WalletContext);
  const { userInfo } = useContext(UserContext);
  const [driverLocationCoords, setDriverLocationCoords] = useState([]);
  const [driverLocationName, setDriverLocationName] = useState("");
  const [allRides, setAllRides] = useState(null);
  const { acceptedRideId, setAcceptedRideId, rideInfo, setRideInfo } =
    useContext(RideContext);
  const eth_logo = "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024";

  const testLocation = [28.461, 77.4969];

  console.log(userInfo.firstName);

  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setDriverLocationCoords([
  //         position.coords.latitude,
  //         position.coords.longitude,
  //       ]);
  //     });
  //   }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-rides")
      .then((response) => console.log(setAllRides(response.data)));
  }, []);

  async function acceptRide() {
    const response = await axios.post(
      "http://localhost:5000/update-driver-wallet-id",
      {
        id: acceptedRideId,
        driverWalletId: walletId,
        driverName: userInfo.firstName,
        carNumber: userInfo.carNumber,
      }
    );
    console.log(response.data);
    setRideInfo(response.data);
  }

  async function completeTrip() {
    const response = await axios.post("http://localhost:5000/complete-ride", {
      id: acceptedRideId,
      status: "completed",
    });
    console.log(response.data);
    setRideInfo(response.data);
    window.location.reload(false);
  }

  //   async function getLocationOfDriver() {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/reverse?lat=${driverLocationCoords[0]}&lon=${driverLocationCoords[1]}&format=json`
  //     );
  //     setDriverLocationName(response.data.display_name);
  //   }

  return (
    <div className="mt-16 justify-center item-center p-12 w-full h-full">
      <div className="border rounded-xl h-content p-8 bg-black text-white w-[900px]">
        <h1 className="font-sans text-2xl mb-4"> Dashboard </h1>
        <div className="border-b-2 border-slate-600 mb-4"></div>
        <div>
          {/* <button onClick={getLocationOfDriver}> Click </button> */}
        </div>
        {rideInfo?.status == "completed" || !rideInfo ? (
          <div>
            {allRides?.map((ride) => {
              return (
                <div key={ride._id} className="flex gap-4 mb-4 items-center ">
                  <div>{ride._id}</div>
                  <div className="flex gap-2 items-center">
                    <img className="h-8 w-8" src={eth_logo} alt="eth_logo" />
                    <h1 className="font-2xl font-bold">{ride.price}</h1>
                  </div>
                  <div className="border border-white"></div>
                  <div className="text-gray-400">
                    <p>
                      {ride.from} <b className="text-white ml-4 mr-4 "> to </b>
                      {ride.to}
                    </p>
                  </div>
                  <div>
                    <button
                      className="border rounded-xl px-4 py-1 hover:bg-white hover:text-black"
                      disabled={walletConnected ? false : true}
                      onClick={() => {
                        setAcceptedRideId(ride._id);
                        acceptRide();
                      }}
                    >
                      {walletConnected
                        ? "Accept"
                        : "Please connect wallet to accept ride."}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div>
              <RiderCard rideInfo={rideInfo} />
              <button
                className="rounded-xl text-2xl font-bold border-2 px-4 py-1 hover:bg-white hover:text-black"
                onClick={completeTrip}
              >
                Complete trip.
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;
