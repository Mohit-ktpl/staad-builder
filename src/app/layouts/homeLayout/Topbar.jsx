import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="absolute top-0 w-full h-140px bg-[#2C2C2C] border-b border-[#525151] py-4 px-5">
      {/* logo and profile */}
      <div className="flex  items-center justify-between">
        {/* logo */}

        <div className="flex w-[196px] items-center gap-2 relative">
          <img
            src="../logo.svg"
            alt="Logo"
            className="w-7 h-7 object-contain"
          />
          <h2 className={`text-lg text-white`}>Staad Builder</h2>
        </div>

        {/* profile */}
        <div className="flex w-[250px] " onClick={() => setMenuOpen(!menuOpen)}>
          <div className="p-[2px] flex items-center gap-2  rounded-full">
            <img
              src="https://randomuser.me/api/portraits/men/36.jpg"
              alt="User"
              className="w-[35px] h-[35px] rounded-full"
            />
            <div className="flex flex-col top-0 left-12">
              <div className="flex items-center gap-2">
                <h2 className={`text-lg text-white text-nowrap`}>
                  Mohit Sharma
                </h2>

                <ChevronDown
                  size={20}
                  className={`transition transition-transform text-white ${
                    menuOpen ? "rotate-180 " : ""
                  }`}
                />
              </div>
              {/* subscription */}

              <div className="h-4 w-10 bg-[#353F56]  rounded-[4px] flex items-center justify-center">
                <span className="text-[9px] text-[#84ABFF] "> Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
