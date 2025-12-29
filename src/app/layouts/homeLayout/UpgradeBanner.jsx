import { Zap } from "lucide-react";

export default function UpgradeBanner() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-5 rounded-xl bg-[#383838]">
      {/* Left content */}
      <div className="flex items-start gap-4">
        <div className="mt-1">
          <Zap size={22} className="text-[#0C8CE9] fill-[#0C8CE9]" />
        </div>

        <div>
          <h3 className="text-white text-lg font-medium">
            Upgrade your workspace
          </h3>
          <p className="text-sm text-gray-300">
            Unlock all the features on Staad Builder
          </p>
        </div>
      </div>

      {/* CTA */}
      <button className="px-6 py-3 rounded-lg bg-[#0C8CE9] text-white font-medium hover:bg-[#0F7FCB] transition">
        Upgrades
      </button>
    </div>
  );
}
