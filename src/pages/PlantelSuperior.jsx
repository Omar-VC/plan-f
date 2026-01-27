import { Link } from "react-router-dom";

export default function PlantelSuperior() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Plantel Superior
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        
        <Link to="/plantel-superior/jugadores">
          <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition flex items-start space-x-3">
            {/* Ícono rugby dentro de círculo */}
            <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-full">
              <img src="/rugby.png" alt="rugby icon" className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Lista de jugadores
              </h2>
              <p className="text-gray-500 mt-2">
                Ver y gestionar fichas individuales
              </p>
            </div>
          </div>
        </Link>

        <Link to="/plantel-superior/asistencias">
          <div className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition flex items-start space-x-3">
            {/* Ícono asistencia dentro de círculo */}
            <div className="h-12 w-12 flex items-center justify-center bg-green-100 rounded-full">
              <img src="/immigration.png" alt="asistencias icon" className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Asistencias
              </h2>
              <p className="text-gray-500 mt-2">
                Registrar asistencia diaria
              </p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
