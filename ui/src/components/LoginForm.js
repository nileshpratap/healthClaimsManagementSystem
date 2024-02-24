import React from "react";

const LoginPage = ({ user }) => {
  console.log(user);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-blue-200 p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{user} Login</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700 mt-4">
          Please{" "}
          <a
            href={`/${user.toLowerCase()}/register`}
            className="text-black font-bold underline"
          >
            register
          </a>{" "}
          if you are new here.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
