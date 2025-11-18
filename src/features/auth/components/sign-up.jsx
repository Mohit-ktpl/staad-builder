import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { EmailValidate } from "../utils/field-validations";

export default function SignUpPage() {
  const [signUpData, setSignUpData] = useState({
    email: "",
  });

  const { isLoaded, signUp } = useSignUp();

  // Handle input changes
  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {
    EmailValidate(signUpData.email);
  };

  const handleSubmit = () => {
    console.log("form data submitted");
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      await signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso-callback",
        redirectUrlComplete: "/auth/reset-password",
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#1d1f23] min-w-screen flex flex-col items-center justify-center px-4">
      {/* Logo + Title */}
      <div className="flex gap-4 items-center mb-8">
        <img src="/logo.svg" alt="Staad Builder Logo" className="w-12 h-12 " />
        <h1 className="text-2xl font-semibold text-white">Staad Builder</h1>
      </div>

      {/* Card */}
      <div className="bg-[#2a2c31] w-full max-w-md rounded-2xl p-10 shadow-xl">
        <h2 className="text-white text-xl mb-4">Welcome to Staad Builder</h2>
        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border border-gray-500 rounded-lg py-3 flex items-center justify-center gap-3 text-gray-200 hover:bg-gray-700 transition"
        >
          <img src="/google-logo.svg" alt="Google logo" className="w-5" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-gray-600"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="flex-1 h-[1px] bg-gray-600"></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Label */}
          <label className="text-gray-400 text-sm mb-2 block">EMAIL</label>

          {/* Email Input */}
          <input
            type="email"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
            className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
          >
            Continue with email
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
