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
import NewPasswordPage from "../features/auth/components/new-password.jsx";
import SSOCallbackPage from "../features/auth/components/sso-callback";
import AppLayout from "./layout/AppLayout";
import VerifyEmail from "../features/auth/components/verify-email";
import ProjectPage from "../features/project/file.jsx";
import { ProjectPageWrapper } from "../features/project/new-file.jsx";
import ProtectedRoute from "../features/auth/components/ProtectedRoutes.jsx";

import "../App.css";

export default function AppRouter() {
  return (
    // <div className="min-h-screen min-w-screen">
    <>
      <Router>
        <Routes>
          {/* protected routes */}
          <Route path="/project" element={<AppLayout />}>
            {/* Add this line: It helps React Router resolve the parent path correctly */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProjectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":projectId"
              element={
                <ProtectedRoute>
                  <ProjectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":projectId/phase/:phaseId"
              element={
                <ProtectedRoute>
                  <ProjectPageWrapper />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* public routes */}
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/sso-callback" element={<SSOCallbackPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/new-password" element={<NewPasswordPage />} />

          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>
      </Router>
      {/* </div> */}
    </>
  );
}
