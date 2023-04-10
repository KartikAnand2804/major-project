import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WalletContext } from "../context/WalletContext";

function DriverDashboard() {
  const { walletConnected, walletId } = useContext(WalletContext);
  const [driverLocationCoords, setDriverLocationCoords] = useState([]);
  const [driverLocationName, setDriverLocationName] = useState("");
  const [allRides, setAllRides] = useState(null);
  const [acceptedRideId, setAcceptedRideId] = useState("");
  const [isRideAccepted, setIsRideAccepted] = useState(false);
  const eth_logo = "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024";

  const testLocation = [28.461, 77.4969];

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
    console.log(acceptedRideId);
    const response = await axios.post(
      "http://localhost:5000/update-driver-wallet-id",
      { id: acceptedRideId, driverWalletId: walletId }
    );
    const data = response.data;
    if (data) setIsRideAccepted(true);
  }

  function completeTrip() {
    setIsRideAccepted(false);
  }

  //   async function getLocationOfDriver() {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/reverse?lat=${driverLocationCoords[0]}&lon=${driverLocationCoords[1]}&format=json`
  //     );
  //     setDriverLocationName(response.data.display_name);
  //   }

  return (
    <div className="mt-16 justify-center item-center p-12 w-full h-full">
      <div className="border rounded-xl h-96 w-96 p-8 bg-black text-white w-max">
        <h1 className="font-sans text-2xl mb-4"> Dashboard </h1>
        <div className="border-b-2 border-slate-600 mb-4"></div>
        <div>
          {/* <button onClick={getLocationOfDriver}> Click </button> */}
        </div>
        {!isRideAccepted ? (
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
                        ? isRideAccepted
                          ? "Accepted"
                          : "Accept"
                        : "Please connect wallet to accept ride."}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              className="rounded-xl border px-4 py-1 hover:bg-white hover:text-black"
              onClick={completeTrip}
            >
              Complete trip.
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;
