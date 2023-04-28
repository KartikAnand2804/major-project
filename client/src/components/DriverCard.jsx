import React, { useContext, useState } from "react";
import { RideContext } from "../context/RideContext";
import axios from "axios";

function DriverCard({ distance }) {
  const eth_logo = "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024";
  const {
    acceptedRideId,
    loc,
    dest,
    rideInfo,
    setRideInfo,
    isPaymentComplete,
    setIsPaymentComplete,
  } = useContext(RideContext);

  //   async function checkStatus() {
  //     const response = await axios.post(
  //       "http://localhost:5000/get-ride-details",
  //       { id: acceptedRideId }
  //     );
  //     setRideInfo(response.data);
  //     console.log(rideInfo);
  //     if(rideInfo.status === 'completed'){

  //     }
  //   }

  //   if (isPaymentComplete) {
  //     alert("Your payment has been completed.");
  //     window.location.reload(false);
  //   }
  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-6">Details</h1>
      {/* <button
        className="w-full text-white bg-black mb-4 py-2 rounded-xl"
        onClick={checkStatus}
      >
        refresh
      </button> */}

      <h1 className="text-2xl text-center font-bold mb-6 text-slate-500">
        Ride ID: {acceptedRideId}
      </h1>
      <div className="flex gap-4 justify-start mb-4 overflow-hidden">
        <p className="text-lg font-semibold">Driver Name</p>
        <h1 className="text-xl text-slate-700">
          {/* {rideInfo.driverWalletId
            ? rideInfo.driverWalletId
            : "driver's wallet ID"} */}
          Driver ID
        </h1>
      </div>
      <div className="flex gap-4 justify-start items-center mb-4">
        <p className="text-xl font-semibold">Price</p>
        <img className="h-8 w-8" src={eth_logo} alt="eth logo" />
      </div>

      <div className="flex gap-4 justify-start mb-4">
        <p className="text-sm font-semibold">
          <p className="text-slate-500">{loc}</p> to{" "}
          <p className="text-slate-500">{dest}</p>
        </p>
      </div>

      <div className="flex gap-4 justify-start mb-4">
        <h1 className="text-xl font-bold">{distance} km.</h1>
      </div>
    </div>
  );
}

export default DriverCard;
