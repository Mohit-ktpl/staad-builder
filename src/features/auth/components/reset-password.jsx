import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { EmailValidate } from "../utils/field-validations";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  // manage 6 digit verification code
  const [code, setCode] = useState(new Array(6).fill(""));
  const [isCodeSent, setIsCodeSent] = useState(false);
  // timer for resend code

  const RESEND_TIME = 10;
  const [resendTimer, setResendTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState("");
  const { signIn, isLoaded } = useSignIn();
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);

  const navigate = useNavigate();

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
      });

      setMessage("Code sent! Check your email and enter it below.");
      setIsCodeSent(true);
    } catch (err) {
      console.error(err);
      setMessage(
        err.errors?.[0]?.longMessage || "Failed to send code. Try again."
      );
    }
  };
  // handle code input change
  const handleChange = (element, index) => {
    if (!/^\d?$/.test(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  // Handle pasting the code
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text");
    const cleanData = pastedData.replace(/\D/g, "").slice(0, 6);

    if (!cleanData) return;

    // start fresh instead of using stale state
    const newCode = Array(6).fill("");

    cleanData.split("").forEach((char, index) => {
      newCode[index] = char;
    });

    setCode(newCode);

    // focus the last filled input
    const focusIndex = Math.min(cleanData.length - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // use this variable to send code to backend

  const finalCode = code.join("");

  // verifying the code
  const handleVerifyCode = async () => {
    if (!finalCode) {
      setMessage("Please enter the code sent to your email.");
      return;
    }

    navigate("/auth/new-password", { state: { email, finalCode } });
  };

  useEffect(() => {
    if (!isCodeSent) return;
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
    setCanResend(false);
    setResendTimer(RESEND_TIME);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCodeSent]);

  const handleResendCode = async () => {
    if (!canResend || !isLoaded) return;
    setIsCodeSent(false);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setMessage("New code sent! Check your email.");
      setIsCodeSent(true);
      setCode(Array(6).fill("")); // clear old OTP
      inputRefs.current[0]?.focus();

      // restart timer
      setCanResend(false);
      setResendTimer(RESEND_TIME);
    } catch (err) {
      console.error(err);
      setMessage(
        err.errors?.[0]?.longMessage || "Failed to resend code. Try again."
      );
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
          disabled={isCodeSent}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
        {/* If code is sent, show code input */}
        {isCodeSent && (
          <>
            {message && (
              <p
                className={`mt-4 text-center text-xs ${
                  message.includes("sent") ? "text-green-400" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
            <div className="flex flex-col items-center mt-2 justify-center">
              <div className="flex gap-2">
                {code.map((data, index) => (
                  <input
                    key={index}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl bg-[#3a3c40] text-gray-200 rounded-lg border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <div className="mt-3 text-sm text-gray-400 text-center">
          {canResend && (
            <button
              onClick={handleResendCode}
              className="w-full text-[#256AFF] hover:text-blue-700 transition  py-3 rounded-lg "
            >
              Resend code
            </button>
          )}
          {isCodeSent && resendTimer > 0 && (
            <span>Resend code in {resendTimer}s</span>
          )}
        </div>

        {/* Button changes depending on state */}
        <button
          className="w-full bg-[#256AFF] hover:bg-blue-700 transition text-white py-3 rounded-lg mt-6"
          onClick={isCodeSent ? handleVerifyCode : handleSendCode}
          disabled={!isLoaded}
        >
          {isCodeSent ? "Verify Code" : "Send Code"}
        </button>

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
