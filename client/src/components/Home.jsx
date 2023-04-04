import React, { useState } from "react";
import RenderMap from "./RenderMap";
import Pricing from "./Pricing";
import axios from "axios";

function Home() {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");

  function handleChangeInLocation(e) {
    setLocation(e.target.value);
  }

  function handleChangeInDestination(e) {
    setDestination(e.target.value);
  }

  // const options = {
  //   method: "GET",
  //   url: "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
  //   params: { address: location, language: "en" },
  //   headers: {
  //     "X-RapidAPI-Key": "f9ad5b8b5fmshf0e6bf267eb11cep138d14jsnadbc213edcd2",
  //     "X-RapidAPI-Host": "google-maps-geocoding.p.rapidapi.com",
  //   },
  // };

  // function handleClick() {
  //   axios
  //     .request(options)
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));
  // }

  return (
    <div className="flex mt-[80px] grid grid-cols-3 h-full">
      <div className="border-r-2 w-full p-6">
        <h1 className="font-black text-2xl mb-6">Where do you want to go.</h1>
        <div class="mb-6">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 text-xl"
          >
            From:
          </label>
          <input
            onChange={handleChangeInLocation}
            placeholder="Enter pickup location"
            type="text"
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </div>

        <div class="mb-6">
          <label
            for="base-input"
            class="block mb-2 text-sm font-medium text-gray-900 text-xl"
          >
            To:
          </label>
          <input
            onChange={handleChangeInDestination}
            placeholder="Enter drop location"
            type="text"
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />
        </div>

        <div className="mb-6">
          <button
            className="w-full p-4 border bg-black text-white rounded-xl"
            // onClick={handleClick}
          >
            Check.
          </button>
        </div>
      </div>
      <div className="border-r-2 w-full">
        <RenderMap />
      </div>
      <div className="w-full">
        <Pricing />
      </div>
    </div>
  );
}

export default Home;
