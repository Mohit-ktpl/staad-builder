import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpPage from "../features/auth/components/sign-up";
import SignInPage from "../features/auth/components/sign-in";
import ResetPasswordPage from "../features/auth/components/reset-password";
import SSOCallbackPage from "../features/auth/components/sso-callback";
import AppLayout from "./layout/AppLayout";
import VerifyEmail from "../features/auth/components/verify-email";
import ProjectPage from "../features/project/file.jsx";
import { ProjectPageWrapper } from "../features/project/new-file.jsx";

import "../App.css";

export default function AppRouter() {
  return (
    // <div className="min-h-screen min-w-screen">
    <>
      <Router>
        <Routes>
          <Route path="/project" element={<AppLayout />}>
            {/* Add this line: It helps React Router resolve the parent path correctly */}
            <Route index element={<ProjectPage />} />
            <Route path=":projectId" element={<ProjectPage />} />
            <Route
              path=":projectId/phase/:phaseId"
              element={<ProjectPageWrapper />}
            />
          </Route>
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/sso-callback" element={<SSOCallbackPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>
      </Router>
      {/* </div> */}
    </>
  );
}
