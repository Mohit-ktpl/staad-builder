import React from "react";
import LeftPanel from "./LeftPanel.jsx";
import RightPanel from "./RightPanel.jsx";
import TopToolbar from "./TopToolbar.jsx";
import { Outlet } from "react-router-dom";
// import "./layout.css";
export default function AppLayout() {
  return (
    <div className="layout-container">
      <TopToolbar />

      <div className="layout-body">
        <LeftPanel />

        <main className="layout-main">
          <Outlet /> {/* child routes pages content */}
        </main>

        <RightPanel />
      </div>
    </div>
  );
}
