import {
  Home,
  LayoutGrid,
  List,
  ChevronDown,
  Search,
  Download,
  Plus,
} from "lucide-react";

export default function MenuBar() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#477BB9] text-white">
          <Home size={18} />
          <span className="font-medium">Home</span>
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg bg-[#2F2F2F] overflow-hidden">
          <button className="p-3 hover:bg-[#3A3A3A]">
            <LayoutGrid size={18} className="text-white" />
          </button>
          <button className="p-3 hover:bg-[#3A3A3A]">
            <List size={18} className="text-white" />
          </button>
        </div>

        {/* Sort by */}
        <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#2F2F2F] text-white hover:bg-[#3A3A3A]">
          <span>Sort by</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-[420px] pl-10 pr-4 py-3 rounded-lg bg-[#2F2F2F] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
        </div>

        {/* Import */}
        <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-400 text-white hover:bg-[#2F2F2F]">
          <Download size={18} />
          <span>Import</span>
        </button>

        {/* Create */}
        <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#256AFF] text-white hover:bg-[#1D4ED8]">
          <Plus size={18} />
          <span>Create</span>
        </button>
      </div>
    </div>
  );
}
