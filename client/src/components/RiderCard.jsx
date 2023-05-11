import React from "react";

function RiderCard({ rideInfo }) {
  return (
    <div className="h-96 w-full p-6">
      <h1 className="font-2xl font-bold">Ride Profile</h1>
      <h1 className="text-3xl font-bold">Price: {rideInfo.price}</h1>
      <h1 className="text-3xl font-bold">Ride type: {rideInfo.tier}</h1>

      <div>Ride ID: {rideInfo._id}</div>
      <div>Rider wallet Address: {rideInfo.riderWalletId}</div>
      <div>
        {rideInfo.from} to {rideInfo.to}
      </div>
    </div>
  );
}

export default RiderCard;
