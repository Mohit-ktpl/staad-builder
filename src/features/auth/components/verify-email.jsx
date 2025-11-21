import { useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  const openGmailSmart = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isMobile = isAndroid || isIOS;

    // Gmail App deep links
    const gmailAppAndroid =
      "intent://com.google.android.gm/#Intent;scheme=android-app;end";
    const gmailAppIOS = "googlegmail://";

    // Web fallback
    const gmailWeb = "https://mail.google.com/mail/u/0/#inbox";

    if (isAndroid) {
      // Try Gmail Android app, fallback to web
      window.location.href = gmailAppAndroid;
      setTimeout(() => {
        window.location.href = gmailWeb;
      }, 500);
      return;
    }

    if (isIOS) {
      // Try Gmail iOS app, fallback to web
      window.location.href = gmailAppIOS;
      setTimeout(() => {
        window.location.href = gmailWeb;
      }, 500);
      return;
    }

    // Desktop → Gmail Web
    window.location.href = gmailWeb;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-white">
      {/* Top Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <img src="/logo.svg" alt="Staad Builder Logo" className="w-8 h-8" />
        <span className="text-xl font-semibold">Staad Builder</span>
      </div>

      {/* Center Graphic */}
      <div className="flex flex-col items-center">
        <img src="/illustration.svg" alt="Graphic" className="w-52 mb-8" />

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Check your email
        </h1>

        {/* Description */}
        <p className="text-center text-gray-300 max-w-md leading-relaxed">
          Click on the link we sent to{" "}
          <span className="font-semibold text-white">{email}</span> to finish
          your account setup.
        </p>

        {/* Button */}
        <button
          onClick={() => {
            openGmailSmart();
          }}
          className="mt-8 bg-white text-black w-64 h-12 rounded-xl shadow flex items-center justify-center gap-2 hover:bg-gray-200 transition"
        >
          <img src="/google-logo.svg" className="w-5 h-5" alt="Google Icon" />
          <span className=" text-white">Open Gmail</span>
        </button>

        {/* Footer Links */}
        <div className="mt-6 text-center text-gray-300 text-sm">
          <p>
            No email in your inbox or spam folder?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Let’s resend it.
            </a>
          </p>

          <p className="mt-2">
            Wrong address?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Log out
            </a>{" "}
            to sign in with a different email.
          </p>
        </div>
      </div>
    </div>
  );
}
