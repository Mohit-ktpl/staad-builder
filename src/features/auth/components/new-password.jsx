import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useClerk, useSignIn } from "@clerk/clerk-react";
import { PasswordValidate } from "../utils/field-validations";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation(); // to get the state passed in navigation route
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { signIn, isLoaded } = useSignIn();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();

  // access state objects

  const { email, finalCode } = location.state || {};

  // Redirect if required data is missing (e.g., user navigated directly)

  useEffect(() => {
    if (!email || !finalCode) {
      navigate("/auth/forgot-password", { replace: true }); // Optionally set a message here
    }
  }, [email, finalCode, navigate]);

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
    if (!email || !finalCode) {
      setMessage("Error: Reset context missing. Please restart the process.");
      return;
    }

    try {
      const password = newPasswordData.newPassword;
      const code = finalCode;
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result.status === "complete") {
        setMessage("Password changed successfully!");
        setTimeout(() => navigate("/auth/sign-in"), 1000);
      } else {
        // Should not happen if successful, but good practice
        console.log("Reset result status:", result.status);
      }
    } catch (err) {
      console.error(err);
      setMessage(
        err.errors?.[0]?.longMessage ||
          "Failed to reset password. The code might be invalid or expired."
      );
    }
  };
  // If the required data is not available, show a loading state or error message
  if (!email || !finalCode) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-[#1a1c21]">
               {" "}
        <p className="text-white">Loading or invalid link. Redirecting...</p>   
         {" "}
      </div>
    );
  }

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
          disabled={!isLoaded}
        >
          Change password
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successfully")
                ? "text-green-400"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
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
///////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSignIn } from "@clerk/clerk-react";
// // Assuming PasswordValidate exists
// // import { PasswordValidate } from "../utils/field-validations";

// export default function NewPasswordPage() {
//   const navigate = useNavigate();
//   const location = useLocation(); // to get the state passed in navigation route
//   const [newPasswordData, setNewPasswordData] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const { signIn, setActive, isLoaded } = useSignIn(); // Added setActive
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState(""); // Access state objects passed from ResetPasswordPage

//   const { email, finalCode } = location.state || {}; // Redirect if required data is missing (e.g., user navigated directly)

//   useEffect(() => {
//     if (!email || !code) {
//       navigate("/auth/forgot-password", { replace: true }); // Optionally set a message here
//     }
//   }, [email, code, navigate]); // Handle input changes

//   const handleChange = (e) => {
//     setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   }; // --- MOCK: Placeholder for Password Validation ---

//   const handleNewPasswordValid = () => {
//     // const passwordErrors = PasswordValidate(newPasswordData.newPassword);
//     // setErrors({ ...errors, newPassword: passwordErrors.password });
//     // return Object.keys(passwordErrors).length === 0;

//     if (newPasswordData.newPassword.length < 8) {
//       setErrors({
//         ...errors,
//         newPassword: "Password must be at least 8 characters.",
//       });
//       return false;
//     }
//     setErrors({ ...errors, newPassword: "" });
//     return true;
//   };
//   const handleConfirmPasswordValid = () => {
//     let valid = false;
//     if (newPasswordData.newPassword === newPasswordData.confirmPassword) {
//       valid = true;
//     } else {
//       setErrors({ ...errors, confirmPassword: "Passwords don't match" });
//     }
//     return valid;
//   }; // ----------------------------------------------- // FINAL STEP: Reset Password
//   const handleReset = async () => {
//     if (!handleConfirmPasswordValid() || !handleNewPasswordValid() || !isLoaded)
//       return;
//     if (!email || !code) {
//       setMessage("Error: Reset context missing. Please restart the process.");
//       return;
//     }

//     try {
//       const password = newPasswordData.newPassword; // CRITICAL FIX: We re-submit the email as the identifier to link this // attempt with the one initiated on the previous page.
//       const result = await signIn.attemptFirstFactor({
//         strategy: "reset_password_email_code",
//         // identifier: email, // <-- THIS IS THE KEY FIX
//         code,
//         password,
//       });
//       if (result.status === "complete") {
//         // Automatically sign the user in after a successful reset
//         await setActive({ session: result.createdSessionId });
//         setMessage("Password changed successfully!");
//         setTimeout(() => navigate("/auth/sign-in"), 1000);
//       } else {
//         // Should not happen if successful, but good practice
//         console.log("Reset result status:", result.status);
//       }
//     } catch (err) {
//       console.error("Error resetting password:", err); // Catch errors like 'invalid code' or 'password failed requirements'
//       setMessage(
//         err.errors?.[0]?.longMessage ||
//           "Failed to reset password. The code might be invalid or expired."
//       );
//     }
//   }; // If the required data is not available, show a loading state or error message
//   if (!email || !code) {
//     return (
//       <div className="min-h-screen min-w-screen flex items-center justify-center bg-[#1a1c21]">
//                {" "}
//         <p className="text-white">Loading or invalid link. Redirecting...</p>
//          {" "}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen min-w-screen flex flex-col items-center justify-center px-4 bg-[#1a1c21]">
//             {/* Logo + Title */}     {" "}
//       <div className="flex gap-4 items-center mb-8">
//                {" "}
//         <img src="/logo.svg" alt="Staad Builder Logo" className="w-12 h-12 " />
//              {" "}
//         <h1 className="text-2xl font-semibold text-white">Staad Builder</h1>
//          {" "}
//       </div>
//             {/* Card */}     {" "}
//       <div className="bg-[#2a2c31] w-full max-w-md rounded-2xl p-10 shadow-xl">
//                {" "}
//         <h2 className="text-white text-xl mb-4">
//                     Set New Password for:{" "}
//           <span className="text-[#37A5FF] font-semibold">{email}</span>       {" "}
//         </h2>
//                 {/*--------------- new password field------------- */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleReset();
//           }}
//         >
//                    {" "}
//           <label className="text-gray-400 text-sm my-2 block">
//             NEW PASSWORD
//           </label>
//                    {" "}
//           <input
//             type="password"
//             name="newPassword"
//             value={newPasswordData.newPassword}
//             onChange={handleChange}
//             onBlur={handleNewPasswordValid}
//             placeholder="Enter 8 digit Password including numbers and letters"
//             className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//                    {" "}
//           {errors.newPassword && (
//             <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
//           )}
//                     {/*--------------- confirm password field------------- */}
//                  {" "}
//           <label className="text-gray-400 text-sm my-2 block">
//                         CONFIRM PASSWORD          {" "}
//           </label>
//                    {" "}
//           <input
//             type="password"
//             name="confirmPassword"
//             value={newPasswordData.confirmPassword}
//             onChange={handleChange}
//             onBlur={handleConfirmPasswordValid}
//             placeholder="Repeat Password"
//             className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//                    {" "}
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.confirmPassword}
//             </p>
//           )}
//                    {" "}
//           <button
//             type="submit"
//             className="w-full bg-[#256AFF] hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
//             disabled={!isLoaded}
//           >
//                         Change password          {" "}
//           </button>
//         </form>
//                {" "}
//         {message && (
//           <p
//             className={`mt-4 text-center ${
//               message.includes("successfully")
//                 ? "text-green-400"
//                 : "text-red-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//                {" "}
//         <Link
//           to="/auth/sign-in"
//           className="flex justify-center mt-2 text-[#37A5FF] hover:text-white"
//         >
//                     Cancel        {" "}
//         </Link>
//              {" "}
//       </div>
//          {" "}
//     </div>
//   );
// }
