import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { setUserInfo } = useContext(UserContext);

  const [redirect, setRedirect] = useState(false);

  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setLoginFormData({ ...loginFormData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:5000/login",
      loginFormData,
      { withCredentials: true }
    );

    if (response.status === 200) {
      alert("Login Successful.");
      const userInfo = response.data;
      setRedirect(true);
      setUserInfo(userInfo);
    } else {
      alert("Invalid Credentials");
    }
  }
  if (redirect) return <Navigate to={"/"} />;

  return (
    <div className="p-16 mt-12">
      <h1 className="text-center text-2xl font-bold  mb-10">Login.</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="johndoe@email.com"
            value={loginFormData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={loginFormData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>

      <p className="text-center font-bold mt-6">
        Not a user?{" "}
        <Link to="/register" className="text-blue-600">
          Register Here.
        </Link>
      </p>
    </div>
  );
}

export default Login;
