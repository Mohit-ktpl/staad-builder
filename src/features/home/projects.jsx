import { div } from "framer-motion/client";
import UpgradeBanner from "../../app/layouts/homeLayout/UpgradeBanner";
const projects = Array.from({ length: 12 });

export default function HomeProjects() {
  return (
    <div className="max-h-[70vh] overflow-y-scroll scrollbar-hide">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <UpgradeBanner />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
        {projects.map((_, index) => (
          <div
            key={index}
            className=" rounded-xl p-4 hover:bg-[#343434] hover:cursor-pointer transition"
          >
            {/* Thumbnail */}
            <div className="h-[185px]  bg-white rounded-lg mb-2" />

            {/* Title */}
            <h3 className="text-sm font-medium">KTPL – Staad Model</h3>

            {/* Meta */}
            <p className="text-xs text-gray-400 mt-1">Edited 2 hrs ago</p>
          </div>
        ))}
      </div>
    </div>
  );
}
