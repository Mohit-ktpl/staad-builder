import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import {
  EmailValidate,
  PasswordValidate,
  NameValidate,
} from "../utils/field-validations";

export default function SignUpPage() {
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isPassword, setIsPassword] = useState(false);

  const { isLoaded, signUp } = useSignUp();
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // name validation

  const handleNameValid = () => {
    const nameErrors = NameValidate(signUpData.fullname);
    setErrors({ ...errors, fullname: nameErrors.fullname });
    return Object.keys(nameErrors).length === 0;
  };

  // email validation
  const handleEmailValid = () => {
    const emailErrors = EmailValidate(signUpData.email);
    setErrors({ ...errors, email: emailErrors.email });
    if (Object.keys(emailErrors).length === 0) {
      setIsPassword(true);
    }
    return Object.keys(emailErrors).length === 0;
  };

  // password validation

  const handlePasswordValid = () => {
    const passwordErrors = PasswordValidate(signUpData.password);
    setErrors({ ...errors, password: passwordErrors.password });
    return Object.keys(passwordErrors).length === 0;
  };

  // creating user account on clerk

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(handleEmailValid());

    if (!handleEmailValid() || !handlePasswordValid()) return;
    if (!isLoaded) return;

    console.log("passing data to clerk", signUpData);

    // generate payload to create user on clerk
    const payload = {
      firstName: signUpData.fullname.split(" ")[0] || "",
      lastName: signUpData.fullname.split(" ").slice(1).join(" ") || "",
      emailAddress: signUpData.email,
      password: signUpData.password,
    };

    await signUp.create(payload);

    // email verification

    if (payload.emailAddress) {
      const result = await signUp.prepareEmailAddressVerification({
        strategy: "email_link",
        redirectUrl: "http://localhost:5173/auth/verify-email",
      });
      console.log("result from clerk", result);
    }
    window.location.href = `/auth/verify-email?email=${payload.emailAddress}`;
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      await signUp?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso-callback",
        redirectUrlComplete: "/project",
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center px-4">
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
          {/* Name Label */}
          <label className="text-gray-400 text-sm mb-2 block">NAME</label>

          {/* Name Input */}
          <input
            type="text"
            name="fullname"
            value={signUpData.fullname}
            onChange={handleChange}
            onBlur={handleNameValid}
            placeholder="Enter your fullname"
            className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1 mb-2">{errors.fullname}</p>
          )}
          {/* Email Label */}
          <label className="text-gray-400 text-sm mb-2 mt-2 block">EMAIL</label>

          {/* Email Input */}
          <input
            type="email"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
            onBlur={handleEmailValid}
            placeholder="Enter your email"
            className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}

          {/* only enter password input if user has continued with email */}
          {isPassword && (
            <>
              <label className="text-gray-400 text-sm my-2 block">
                PASSWORD
              </label>

              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleChange}
                onBlur={handlePasswordValid}
                placeholder="Enter 8 digit Password including numbers and letters"
                className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </>
          )}
          {/* Continue Button */}
          <div className="">
            <button
              type={isPassword === true ? "submit" : "button"}
              onClick={() => handleEmailValid()}
              className="w-full bg-blue-600! hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
            >
              {isPassword === true
                ? "Create an Account"
                : "Continue with email"}
            </button>
          </div>
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
