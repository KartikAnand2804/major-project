import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    carNumber: "",
    typeOfUser: "",
  });

  function handleChange(e) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/register", formData).then((res) => {
        console.log(res.status, typeof res.status);
        if (res.status === 200) {
          alert("Registration successful.");
          //   return redirect("http://127.0.0.1:5173/login");
        } else alert("Registration failed. Please try again in sometime.");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-12 mt-20">
      <h1 className="text-center font-bold text-4xl mb-11">
        Register yourself here.
      </h1>
      <form onSubmit={handleSubmit}>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label
            for="email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label
            for="password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_repeat_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="firstName"
              id="firstName"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label
              for="firstName"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label
              for="lastName"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>

          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="carNumber"
              id="carNumber"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.carNumber}
              onChange={handleChange}
              required
            />
            <label
              for="carNumber"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              If you're signing up as driver. Please specify the Car Number.
            </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="phoneNumber"
              id="phoneNumber"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label
              for="phoneNumber"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <fieldset>
              <h1 className="mb-2">What are you signing up as?</h1>
              <div className="flex flex-row gap-6">
                <div class="flex items-center mb-4">
                  <input
                    id="type-option-1"
                    type="radio"
                    name="typeOfUser"
                    value="driver"
                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    onChange={handleChange}
                  />
                  <label
                    for="type-option-1"
                    class="block ml-2 text-sm font-medium text-gray-900"
                  >
                    Driver
                  </label>
                </div>

                <div class="flex items-center mb-4">
                  <input
                    id="type-option-2"
                    type="radio"
                    name="typeOfUser"
                    value="rider"
                    class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                    onChange={handleChange}
                  />
                  <label
                    for="type-option-2"
                    class="block ml-2 text-sm font-medium text-gray-900 "
                  >
                    Rider
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <p className="mt-6 text-center font-bold">
        Already a member?{" "}
        <Link to="/login" className="text-blue-600">
          Login Here
        </Link>
      </p>
    </div>
  );
}

export default Register;
