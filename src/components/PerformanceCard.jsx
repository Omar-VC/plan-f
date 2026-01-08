// src/components/PerformanceCard.jsx
import React from "react";

export default function PerformanceCard({ title, inicial, actual, objetivo, tipo }) {
  const parseValue = (val) => {
    if (typeof val === "string" && val.includes(":")) {
      const [min, sec] = val.split(":").map(Number);
      return min * 60 + sec; // convertir a segundos
    }
    return Number(val);
  };

  const ini = parseValue(inicial);
  const act = parseValue(actual);
  const obj = parseValue(objetivo);

  // cálculo de porcentaje de cambio
  let cambio = null;
  if (ini && act) {
    if (tipo === "tiempo") {
      // menor tiempo = mejora
      cambio = (((ini - act) / ini) * 100).toFixed(1);
    } else {
      cambio = (((act - ini) / ini) * 100).toFixed(1);
    }
  }

  // estado del actual
  let estado = "igual";
  if (tipo === "tiempo") {
    if (act < ini && act < obj) estado = "supero";
    else if (act < ini) estado = "progreso";
    else if (act > ini) estado = "decrecio";
  } else {
    if (act >= obj) estado = "supero";
    else if (act > ini) estado = "progreso";
    else if (act < ini) estado = "decrecio";
  }

  // color de la barra actual
  const colorActual =
    estado === "decrecio"
      ? "bg-red-500"
      : estado === "progreso"
      ? "bg-green-500"
      : estado === "supero"
      ? "bg-blue-500"
      : "bg-yellow-500";

  return (
    <div className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>

      <div className="grid grid-cols-3 gap-4 text-center">
        {/* Barra inicial */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Inicial</p>
          <div className="h-16 w-full bg-gray-400 rounded flex items-center justify-center text-white font-bold">
            {inicial}
          </div>
        </div>

        {/* Barra actual con porcentaje */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Actual</p>
          <div className={`h-16 w-full ${colorActual} rounded flex flex-col items-center justify-center text-white font-bold`}>
            <span>{actual}</span>
            {cambio !== null && (
              <span className="text-xs font-medium">
                {cambio > 0 ? `+${cambio}%` : `${cambio}%`}
              </span>
            )}
          </div>
        </div>

        {/* Barra objetivo */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Objetivo</p>
          <div className="h-16 w-full bg-blue-500 rounded flex items-center justify-center text-white font-bold">
            {objetivo}
          </div>
        </div>
      </div>
    </div>
  );
}
