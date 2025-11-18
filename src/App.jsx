// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

// export default function App() {
//   return (
//     <header>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./features/auth/components/sign-up";
import SignInPage from "./features/auth/components/sign-in";
import ResetPasswordPage from "./features/auth/components/reset-password";
import SSOCallbackPage from "./features/auth/components/sso-callback";
import "./App.css";
export default function App() {
  return (
    <div className="min-h-screen min-w-screen">
      <Router>
        <Routes>
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/sso-callback" element={<SSOCallbackPage />} />
        </Routes>
      </Router>
    </div>
  );
}
