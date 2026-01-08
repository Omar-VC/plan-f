import React from "react";
import { ClipboardDocumentCheckIcon, UserGroupIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();

  const items = [
    { path: "/plantel-superior/asistencias", label: "Asistencias", icon: ClipboardDocumentCheckIcon },
    { path: "/plantel-superior/jugadores", label: "Jugadores", icon: UserGroupIcon },
    { path: "/plantel-superior/plan", label: "Plan", icon: CalendarIcon }, // 👈 futura sección
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
      {items.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-xs ${
              active ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <item.icon className="h-6 w-6 mb-1" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
