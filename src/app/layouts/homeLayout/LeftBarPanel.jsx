import { NavLink } from "react-router-dom";
import {
  Home,
  Pencil,
  LayoutGrid,
  Trash2,
  Layers,
  HelpCircle,
  Settings,
} from "lucide-react";

const navTop = [
  { label: "Home", icon: Home, path: "/home", isActive: true },
  { label: "My files", icon: Pencil, path: "/home/files" },
  { label: "Projects", icon: LayoutGrid, path: "/home/projects" },
];

const navBottom = [
  { label: "Trash", icon: Trash2, path: "/trash" },
  { label: "Updates", icon: Layers, path: "/updates" },
  { label: "Help & Feedback", icon: HelpCircle, path: "/help" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const NavItem = ({ label, icon: Icon, path }) => (
  <NavLink
    to={path}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
       transition-colors
       ${isActive ? "bg-[#4A4A4A]" : "hover:bg-[#3A3A3A]"}`
    }
  >
    <Icon size={20} className="text-white" />
    <span className="text-white text-[16px]">{label}</span>
  </NavLink>
);

export default function LeftBarPanel() {
  return (
    <aside className="w-[250px] h-full bg-[#2C2C2C] border-r border-[#3E3E3E] flex flex-col justify-between px-3 py-4">
      {/* Top section */}
      <div className="mt-2 space-y-2">
        {navTop.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>

      {/* Bottom section */}
      <div className="space-y-2 pt-4 border-t border-[#3E3E3E]">
        {navBottom.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </aside>
  );
}
