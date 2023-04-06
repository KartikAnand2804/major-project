import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";

function Pricing(props) {
  const [ride, setRide] = useState("");
  const distance = props.distance;
  const basePrice = 1572;
  const eth_logo = "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024";

  const { walletConnected } = useContext(WalletContext);
  console.log(walletConnected);

  const cabs = {
    luxury: {
      name: "LUXURY",
      imgUrl: "src/assets/luxury.svg",
      multiplier: (distance / 10) * 2,
    },

    basic: {
      name: "BASIC",
      imgUrl: "src/assets/basic.svg",
      multiplier: (distance / 10) * 1.5,
    },

    economy: {
      name: "ECONOMY",
      imgUrl: "src/assets/economy.svg",
      multiplier: (distance / 10) * 1,
    },
  };

  function bookRide() {}
  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold">Pick your ride.</h1>
      <div className="mt-6">
        <button
          className="flex border hover:border-black focus:border-black focus:bg-black focus:text-white p-4 mb-3 w-full"
          onClick={() => {
            setRide("luxury");
          }}
        >
          <div className="items-center">
            <img
              className="h-10 w-8 mr-8"
              src={cabs.luxury.imgUrl}
              alt={cabs.luxury.name}
            />
          </div>
          <div className="mr-40">
            <h3 className="text-xl text-center font-semibold">
              {cabs.luxury.name}
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <img src={eth_logo} alt="eth-logo" className="h-10 w-8" />
            <h3>
              {((basePrice / 10 ** 5) * cabs.luxury.multiplier).toFixed(5)}
            </h3>
          </div>
        </button>
      </div>

      <div className="mt-6 w-full">
        <button
          className="flex border hover:border-black focus:border-black focus:bg-black focus:text-white p-4 mb-3 w-full"
          onClick={() => {
            setRide("basic");
          }}
        >
          <div className="items-center">
            <img
              className="h-10 w-8 mr-8"
              src={cabs.basic.imgUrl}
              alt={cabs.basic.name}
            />
          </div>
          <div className="mr-40">
            <h3 className="text-xl text-center font-semibold">
              {cabs.basic.name}
            </h3>
          </div>
          <div className="flex items-center gap-6 justify-end">
            <img src={eth_logo} alt="eth-logo" className="h-10 w-8" />
            <h3>
              {((basePrice / 10 ** 5) * cabs.basic.multiplier).toFixed(5)}
            </h3>
          </div>
        </button>
      </div>

      <div className="mt-6 w-full">
        <button
          className="flex border hover:border-black focus:border-black focus:bg-black focus:text-white p-4 mb-3 w-full "
          onClick={() => {
            setRide("economy");
          }}
        >
          <div className="items-center">
            <img
              className="h-10 w-8 mr-8"
              src={cabs.economy.imgUrl}
              alt={cabs.economy.name}
            />
          </div>
          <div className="mr-40">
            <h3 className="text-xl text-center font-semibold">
              {cabs.economy.name}
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <img src={eth_logo} alt="eth-logo" className="h-10 w-8" />
            <h3>
              {((basePrice / 10 ** 5) * cabs.economy.multiplier).toFixed(5)}
            </h3>
          </div>
        </button>
      </div>

      <button
        className="w-full border-black bg-black text-white p-6 disabled:bg-gray-400"
        disabled={walletConnected ? false : true}
        onClick={bookRide}
      >
        {walletConnected ? "Book Ride" : "Connect your wallet to book ride."}
      </button>
    </div>
  );
}

export default Pricing;
