import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { WalletContext } from "../context/WalletContext";

import axios from "axios";

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { setWalletConnected } = useContext(WalletContext);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/profile", {
          withCredentials: true,
        })
        .then((response) => {
          const userData = response.data;
          setUserInfo(userData);
        });
    } catch (error) {
      console.error(error.response.data);
    }
  }, []);

  function logout() {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const [walletConnectButtonText, setwalletConnectButtonText] = useState(
    "Connect your wallet"
  );

  const [walletConnectError, setWalletConnectError] = useState("");

  function connectWallet() {
    console.log("button clicked");
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setwalletConnectButtonText(result[0]);
          setWalletConnected(true);
        });
    } else {
      setWalletConnectError("Install Metamask.");
      setwalletConnectButtonText(walletConnectError);
    }
  }

  return (
    <nav class="bg-white px-2 sm:px-4 py-2.5  fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" class="flex items-center">
          <span class="self-center text-xl font-bold whitespace-nowrap ">
            {/* <img src="src/assets/logo.svg" alt="logo" className="w-6 h-6" /> */}
            <h1>BLOCK-RIDE</h1>
          </span>
        </a>
        <div class="flex md:order-2">
          {userInfo ? (
            <div className="flex gap-4 items-center ">
              <img
                alt="driver"
                src="src/assets/driver.svg"
                className="h-6 w-6"
              />
              <button
                type="button"
                class="text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                <Link to="/">
                  Hello, <b>{userInfo.firstName}</b>
                </Link>
              </button>

              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            >
              <Link to="/register">Register or Login</Link>
            </button>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <button
            onClick={connectWallet}
            class=" flex items-center gap-3 py-2 pl-3 pr-4 text-white bg-black disabled:bg-gray-400 hover:bg-gray-800 rounded md:bg-black md:text-white md:px-4"
            disabled={!userInfo ? true : false}
          >
            <img
              src="src/assets/metamask-icon.svg"
              alt="connect your metamask wallet"
              className="w-4 h-4"
            />
            {walletConnectButtonText}
          </button>
          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ">
            <li></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
