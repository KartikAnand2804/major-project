import React, { useState, useContext, useEffect } from "react";
import { RideContext } from "../context/RideContext";
import { ethers } from "ethers";
import RenderMap from "./RenderMap";
import Pricing from "./Pricing";
import axios from "axios";
import { WalletContext } from "../context/WalletContext";

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
  const [price, setPrice] = useState(null);
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

  async function getDistance() {
    getLocationLatLong();
    getDestinationLatLong();

    const accessToken = import.meta.env.VITE_DISTANCE_MATRIX_ACCESS_TOKEN;
    const response = await axios.get(
      `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${location}&destinations=${destination}&key=${accessToken}`
    );
    const data = response.data;
    console.log(data);
    const distance = data.rows[0].elements[0].distance.value;
    setDistance(distance / 1000);
  }

  const { walletId } = useContext(WalletContext);
  const params = {
    from: walletId,
    to: driverWalletId,
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  };

  async function sendEth() {
    console.log(walletId, driverWalletId);
    const response = await ethereum.request({
      method: "eth_sendTransaction",
      params: [params],
    });
    console.log(response.data);
    window.location.reload(false);
  }

  async function checkStatus() {
    const response = await axios.post(
      "http://localhost:5000/get-ride-details",
      { id: acceptedRideId }
    );
    setDriverWalletId(response.data.driverWalletId);
    setPrice(response.data.price);
    setStatus(response.data.status);

    console.log(walletId, driverWalletId, price, status);
  }

  if (driverWalletId && status) {
    sendEth();
  }

  return (
    <div className="mt-[80px]">
      <div className="mb-8 flex gap-4 justify-center items-center">
        <button
          className="font-gray-800 font-bold text-3xl p-4 hover:border"
          onClick={checkStatus}
        >
          {driverWalletId && status
            ? "Your trip is completed"
            : driverWalletId
            ? "Your ride has been accepted by the driver"
            : walletId
            ? "waiting for a driver to accept your ride."
            : "Click to check status of your Ride."}
        </button>
      </div>
      <div className="grid grid-cols-3 h-full">
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
              onClick={getDistance}
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
    </div>
  );
}

export default RiderDashboard;
