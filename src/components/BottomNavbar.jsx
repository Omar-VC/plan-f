import { ClipboardDocumentCheckIcon, UserGroupIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useParams } from "react-router-dom";
import { isValidDivision } from "../utils/divisions";

export default function BottomNavbar() {
  const location = useLocation();
  const { division = "plantel-superior" } = useParams();

  if (location.pathname === "/") {
    return null;
  }

  const currentDivision = isValidDivision(division) ? division : "plantel-superior";

  const items = [
    {
      path: `/${currentDivision}/asistencias`,
      label: "Asistencias",
      icon: ClipboardDocumentCheckIcon,
    },
    { path: `/${currentDivision}/jugadores`, label: "Jugadores", icon: UserGroupIcon },
    { path: `/${currentDivision}/plan`, label: "Plan", icon: CalendarIcon },
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
