import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SignInPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#1d1f23] min-w-screen flex flex-col items-center justify-center px-4">
      {/* Logo + Title */}
      <div className="flex gap-4 items-center mb-8">
        <img src="/logo.svg" alt="Staad Builder Logo" className="w-12 h-12 " />
        <h1 className="text-2xl font-semibold text-white">Staad Builder</h1>
      </div>

      {/* Card */}
      <div className="bg-[#2a2c31] w-full max-w-md rounded-2xl p-10 shadow-xl">
        <h2 className="text-white text-xl mb-4">Sign in to Staad Builder</h2>
        {/* Google Button */}
        <button className="w-full border border-gray-500 rounded-lg py-3 flex items-center justify-center gap-3 text-gray-200 hover:bg-gray-700 transition">
          <img src="/google-logo.svg" alt="Google logo" className="w-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-600"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="flex-1 h-[1px] bg-gray-600"></div>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="EMAIL"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg mb-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="PASSWORD"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Link
          to="/auth/reset-password"
          className="text-blue-400 hover:underline flex justify-end"
        >
          Reset Password?
        </Link>

        {/* Continue Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6">
          Log in
        </button>

        {/* Sign In Link */}
        <p className="text-gray-400 text-sm text-center mt-6">
          No Account?{" "}
          <Link to="/auth/sign-up" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
