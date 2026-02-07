import { Link } from "react-router-dom";
import { DIVISION_OPTIONS } from "../utils/divisions";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Divisiones</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {DIVISION_OPTIONS.map((division) => (
          <Link key={division.value} to={`/${division.value}`}>
            <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition">
              <h2 className="text-xl font-bold text-gray-800">{division.label}</h2>
              <p className="text-gray-500 mt-2">Gestión del plantel, jugadores y asistencias</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
