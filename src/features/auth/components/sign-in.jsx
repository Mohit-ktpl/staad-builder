import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailValidate, PasswordValidate } from "../utils/field-validations";
import { useUser, useSignIn, useClerk } from "@clerk/clerk-react";

export default function SignInPage() {
  // store signIn credentials
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { signIn, isLoaded } = useSignIn();
  const { setActive } = useClerk();

  //--------------- If the user is already signed in, redirect to dashboard------------------
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      navigate("/project", { replace: true });
    }
  }, [isSignedIn, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // email validation
  const handleEmailValid = () => {
    const emailErrors = EmailValidate(signInData.email);
    setErrors({ ...errors, email: emailErrors.email });

    return Object.keys(emailErrors).length === 0;
  };

  // password validation

  const handlePasswordValid = () => {
    const passwordErrors = PasswordValidate(signInData.password);
    setErrors({ ...errors, password: passwordErrors.password });
    return Object.keys(passwordErrors).length === 0;
  };

  // google sign-in

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso-callback",
        redirectUrlComplete: "/project",
      });
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  };

  // submit handler

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleEmailValid() || !handlePasswordValid()) return;
    if (!isLoaded) return;

    try {
      //const identifier = signInData.email
      const result = await signIn.create({
        identifier: signInData.email,
        password: signInData.password,
      });

      if (result.status === "complete") {
        // activate session

        await setActive({ session: result.createdSessionId });
        navigate("/project", { replace: true });
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        email: err.errors?.[0]?.message || "Sign in failed. Please try again.",
      }));
    }
  };

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
        <button
          onClick={handleGoogleSignIn}
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

        {/* Email Input */}
        <input
          type="email"
          name="email"
          value={signInData.email}
          onChange={handleChange}
          onBlur={handleEmailValid}
          placeholder="EMAIL"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}

        {/* Password input */}

        <input
          type="password"
          name="password"
          value={signInData.password}
          onChange={handleChange}
          onBlur={handlePasswordValid}
          placeholder="PASSWORD"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg mt-4 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}

        <Link
          to="/auth/reset-password"
          className="text-blue-400 hover:underline flex justify-end"
        >
          Reset Password?
        </Link>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
        >
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
