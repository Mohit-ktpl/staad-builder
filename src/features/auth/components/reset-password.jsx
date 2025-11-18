import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen  min-w-screen flex flex-col items-center justify-center px-4">
      {/* Logo + Title */}
      <div className="flex gap-4 items-center mb-8">
        <img src="/logo.svg" alt="Staad Builder Logo" className="w-12 h-12 " />
        <h1 className="text-2xl font-semibold text-white">Staad Builder</h1>
      </div>

      {/* Card */}
      <div className="bg-[#2a2c31] w-full max-w-md rounded-2xl p-10 shadow-xl">
        <h2 className="text-white text-xl mb-4">
          Enter your email to reset password
        </h2>

        {/* Email Label */}
        <label className="text-gray-400 text-sm mb-2 block">EMAIL</label>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Reset Button */}
        <button className="w-full bg-[#256AFF] hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6">
          Reset password
        </button>

        {/* cancel button */}

        <Link to="/auth/sign-in" className="flex justify-center mt-2">
          Cancel
        </Link>
      </div>
    </div>
  );
}
