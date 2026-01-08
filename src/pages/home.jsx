import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Link to="/plantel-superior">
        <div className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-800">
            Plantel Superior
          </h2>
          <p className="text-gray-500 mt-2">
            Gestión del plantel, jugadores y asistencias
          </p>
        </div>
      </Link>
    </div>
  );
}
