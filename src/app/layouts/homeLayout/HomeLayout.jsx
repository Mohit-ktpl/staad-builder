import LeftBarPanel from "./LeftBarPanel";
import MenuBar from "./MenuBar.jsx";
import Topbar from "./Topbar.jsx";
import Footer from "./Footer.jsx";
import UpgradeBanner from "./UpgradeBanner";
import { Outlet } from "react-router-dom";
import MobileWarning from "../../../components/MobileWarning";
// import MobileWarning from "../components/MobileWarning.jsx";

export default function HomeLayout({ children }) {
  const TOPBAR_HEIGHT = "64px";

  return (
    <div className="h-screen bg-[#1E1E1E] text-white">
      {/* MOBILE VIEW BLOCKER */}
      <div className="block lg:hidden">
        <MobileWarning />
      </div>
      {/* Topbar */}
      <div className="h-[64px]">
        <Topbar />
      </div>

      {/* Body */}
      <div
        className="flex"
        style={{ height: `calc(100vh - ${TOPBAR_HEIGHT})` }}
      >
        {/* Sidebar (starts below topbar) */}
        <LeftBarPanel />
        <div className="w-full">
          {/* Menu header */}
          <div className="flex-1 overflow-y-auto px-6 w-full py-4">
            <MenuBar />
          </div>

          {/* upgrade poster */}
          {/* <div className="flex-1 overflow-y-auto px-6 py-4">
            <UpgradeBanner />
          </div> */}

          {/* Main content */}
          <main className="flex-1 overflow-y-auto px-6 py-4">
            <Outlet />
          </main>

          {/* Footer */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
