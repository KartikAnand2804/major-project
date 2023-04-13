import React, { useState, useContext, useEffect } from "react";
import { RideContext } from "../context/RideContext";
import ether from "ethers";
import RenderMap from "./RenderMap";
import Pricing from "./Pricing";
import axios from "axios";

function RiderDashboard() {
  const fetchCoordinatesAPI =
    "https://nominatim.openstreetmap.org/search?format=json&q=";

  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [locationLat, setLocationLat] = useState(null);
  const [locationLon, setLocationLon] = useState(null);

  const [destinationLat, setDestinationLat] = useState(null);
  const [destinationLon, setDestinationLon] = useState(null);

  const [distance, setDistance] = useState("");

  const [status, setStatus] = useState(null);
  const [driverWalletId, setDriverWalletId] = useState(null);
  // const [rideInfo, setRideInfo] = useState(null);
  const { setLoc, setDest, acceptedRideId } = useContext(RideContext);

  async function handleChangeInLocation(e) {
    setLocation(e.target.value);
    setLoc(e.target.value);
  }

  async function handleChangeInDestination(e) {
    setDestination(e.target.value);
    setDest(e.target.value);
  }

  async function getLocationLatLong() {
    const response = await axios.get(`${fetchCoordinatesAPI}${location}`);
    const data = response.data[0];
    setLocationLat(Number(data.lat));
    setLocationLon(Number(data.lon));
  }

  async function getDestinationLatLong() {
    const response = await axios.get(`${fetchCoordinatesAPI}${destination}`);
    const data = response.data[0];
    setDestinationLat(Number(data.lat));
    setDestinationLon(Number(data.lon));
  }

  async function handleClick() {
    getLocationLatLong();
    getDestinationLatLong();

    const accessToken = "l6llyyn9fX4JZJ4cEMsdkFKEv6mbf";
    const response = await axios.get(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${location}&destinations=${destination}&key=${accessToken}`
    );
    const data = response.data;
    console.log(data);
    const distance = data.rows[0].elements[0].distance.value;
    setDistance(distance / 1000);
  }

  function sendEth() {}

  const interval = 60000;
  const timeout = 5000;
  setInterval(async () => {
    const response = await axios.post(
      "http://localhost:5000/get-ride-details",
      { id: acceptedRideId }
    );
    setDriverWalletId(response.data.driverWalletId);
    setStatus(response.data.status);
    if (driverWalletId && status) {
      setTimeout(() => {
        window.location.reload(false);
      }, timeout);
    }
  }, interval);

  if (driverWalletId) {
    alert(`Ride accepted. You are riding with ${driverWalletId}`);
  }

  if (status === "completed") {
    alert(
      `Your trip is completed. Thank you for riding with us. Please pay the rider at ${driverWalletId}`
    );
  }

  return (
    <div className="mt-[80px] grid grid-cols-3 h-full">
      <div className="border-r-2 w-full p-6">
        <h1 className="font-black text-2xl mb-6">Where do you want to go.</h1>
        <div className="mb-6">
          <label
            for="base-input"
            className="block mb-2 font-medium text-gray-900 text-xl"
          >
            From:
          </label>
          <input
            onChange={handleChangeInLocation}
            placeholder="Enter pickup location"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </div>

        <div className="mb-6">
          <label
            for="base-input"
            className="block mb-2 font-medium text-gray-900 text-xl"
          >
            To:
          </label>
          <input
            onChange={handleChangeInDestination}
            placeholder="Enter drop location"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </div>

        <div className="mb-6">
          <button
            className="w-full p-4 border bg-black text-white rounded-xl"
            onClick={handleClick}
          >
            Check.
          </button>
        </div>
      </div>
      <div className="border-r-2 w-full">
        <RenderMap
          lat={locationLat}
          lon={locationLon}
          destLat={destinationLat}
          destLon={destinationLon}
        />
      </div>
      <div className="w-full">
        <Pricing distance={distance} />
      </div>
    </div>
  );
}

export default RiderDashboard;
