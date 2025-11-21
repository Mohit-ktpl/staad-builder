import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useSignIn } from "@clerk/clerk-react";
import { PasswordValidate } from "../utils/field-validations";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { signIn, isLoaded } = useSignIn();
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // newPassword validation

  const handleNewPasswordValid = () => {
    const passwordErrors = PasswordValidate(newPasswordData.newPassword);
    setErrors({ ...errors, newPassword: passwordErrors.password });
    return Object.keys(passwordErrors).length === 0;
  };

  // confirmPassword validation

  const handleConfirmPasswordValid = () => {
    let valid = false;
    if (newPasswordData.newPassword === newPasswordData.confirmPassword) {
      valid = true;
    } else {
      setErrors({ ...errors, confirmPassword: "Password don't match" });
    }
    return valid;
  };

  const handleReset = async () => {
    if (!handleConfirmPasswordValid() || !handleNewPasswordValid() || !isLoaded)
      return;

    try {
      await signIn.resetPassword({
        password: newPasswordData.newPassword,
      });

      setMessage("Password changed successfuly");
      navigate("/auth/sign-in");
    } catch (err) {
      console.error(err);
      setMessage("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center px-4">
      {/* Logo + Title */}
      <div className="flex gap-4 items-center mb-8">
        <img src="/logo.svg" alt="Staad Builder Logo" className="w-12 h-12 " />
        <h1 className="text-2xl font-semibold text-white">Staad Builder</h1>
      </div>

      {/* Card */}
      <div className="bg-[#2a2c31] w-full max-w-md rounded-2xl p-10 shadow-xl">
        <h2 className="text-white text-xl mb-4">Enter your new password</h2>

        {/*--------------- new password field------------- */}

        <label className="text-gray-400 text-sm my-2 block">NEW PASSWORD</label>

        <input
          type="password"
          name="newPassword"
          value={newPasswordData.newPassword}
          onChange={handleChange}
          onBlur={handleNewPasswordValid}
          placeholder="Enter 8 digit Password including numbers and letters"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
        )}

        {/*--------------- confirm password field------------- */}

        <label className="text-gray-400 text-sm my-2 block">
          CONFIRM PASSWORD
        </label>

        <input
          type="password"
          name="confirmPassword"
          value={newPasswordData.confirmPassword}
          onChange={handleChange}
          onBlur={handleConfirmPasswordValid}
          placeholder="Repeat Password"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}

        <button
          className="w-full bg-[#256AFF] hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
          onClick={handleReset}
        >
          Change password
        </button>

        {message && (
          <p className="text-green-400 mt-4 text-center">{message}</p>
        )}

        <Link
          to="/auth/sign-in"
          className="flex justify-center mt-2 text-[#37A5FF] hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
