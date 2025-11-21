import React from "react";
import LeftPanel from "./leftPanel";
import RightPanel from "./RightPanel";
import TopToolbar from "./TopToolbar";
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
