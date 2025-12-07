"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const path = usePathname();

  // Protect dashboard routes
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
    },
    {
      name: "Reminders",
      icon: <Bell size={20} />,
      href: "/reminders",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      href: "/settings",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } bg-white shadow-lg border-r transition-all duration-300 flex flex-col`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-blue-600">
            {open ? "DueBird" : "DB"}
          </span>

          <button onClick={() => setOpen(!open)}>
            <Menu size={20} />
          </button>
        </div>

        {/* MENU LIST */}
        <div className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 mx-2 rounded-lg text-gray-700 cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition ${
                path === item.href ? "bg-blue-100 text-blue-600 font-semibold" : ""
              }`}
            >
              {item.icon}
              {open && <span>{item.name}</span>}
            </Link>
          ))}
        </div>

        {/* LOGOUT BUTTON */}
        <div className="border-t p-4">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full p-2 rounded-lg transition"
          >
            <LogOut size={20} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
