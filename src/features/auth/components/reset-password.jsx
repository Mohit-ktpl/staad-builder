import { useState } from "react";
import { Link } from "react-router-dom";
import { useClerk, useSignIn } from "@clerk/clerk-react";
import { EmailValidate } from "../utils/field-validations";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMessage] = useState("");
  const { signIn, isLoaded } = useSignIn();
  const [errors, setErrors] = useState({});

  const { client } = useClerk();

  // email validation
  const handleEmailValid = () => {
    const emailErrors = EmailValidate(email);
    setErrors({ ...errors, email: emailErrors.email });

    return Object.keys(emailErrors).length === 0;
  };
  const handleSendCode = async () => {
    if (!handleEmailValid() || !isLoaded) return;

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
        redirectUrl: "http://localhost:5173/auth/new-password", // optional for Clerk
      });

      setMessage("Code sent! Check your email.");
      setIsCodeSent(true);
    } catch (err) {
      console.error(err);
      setMessage("Failed to send code. Try again.");
    }
  };
  const handleVerifyCode = async () => {
    if (!code || !isLoaded) {
      setMessage("Please enter the code sent to your email.");
      return;
    }

    try {
      // Verify the reset password code
      await client.verifyResetPasswordToken({
        token: code, // the code from email
        emailAddress: email, // the email used to request reset
      });

      // On success, redirect to the password reset page
      navigate("/auth/new-password", { state: { email, code } });
    } catch (err) {
      console.error(err);
      setMessage("Invalid code. Please try again.");
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
        <h2 className="text-white text-xl mb-4">
          Enter your email to reset password
        </h2>

        <label className="text-gray-400 text-sm mb-2 block">EMAIL</label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-[#3a3c40] text-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onBlur={handleEmailValid}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
        {/* If code is sent, show code input */}
        {isCodeSent && (
          <input
            type="text"
            className="w-full bg-[#3a3c40] text-gray-200 mt-2 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        {/* Button changes depending on state */}
        <button
          className="w-full bg-[#256AFF] hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
          onClick={isCodeSent ? handleVerifyCode : handleSendCode}
        >
          {isCodeSent ? "Verify Code" : "Send Code"}
        </button>
        {/*   
        <button
          className="w-full bg-[#256AFF] hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
          onClick={handleReset}
        >
          Reset password
        </button>
*/}
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
// import { useState } from "react";
// import { useSignIn } from "@clerk/clerk-react";

// export default function ResetPassword() {
//   const { signIn, isLoaded } = useSignIn();
//   const [email, setEmail] = useState("");
//   const [sent, setSent] = useState(false);
//    const [message, setMessage] = useState("");

//   const requestReset = async () => {
//     if (!isLoaded) return;
//     try {
//       await signIn.create({
//         strategy: "reset_password_email", // MAGIC LINK
//         identifier: email,
//       });
//        setMessage("Password reset email sent! Check your inbox.");
//       setSent(true);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       {!sent ? (
//         <>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="text-white"
//           />
//           <button onClick={requestReset}>Send reset link</button>
//         </>
//       ) : (
//         <p>Check your email for the reset link!</p>
//       )}
//     </div>
//   );
// }
