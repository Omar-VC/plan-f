import React from "react";
import PerformanceCard from "./PerformanceCard";

export default function PerformanceSection({ rendimiento }) {
  if (!rendimiento) {
    return (
      <p className="text-gray-500">
        No hay datos de rendimiento cargados para este jugador.
      </p>
    );
  }

  // Función para convertir tiempo "min:seg" a segundos
  const parseTime = (val) => {
    if (typeof val === "string" && val.includes(":")) {
      const [min, sec] = val.split(":").map(Number);
      return min * 60 + sec;
    }
    return Number(val);
  };

  // Calcular media de jugador (forma física global)
  const calcularMedia = (rend) => {
    const metrics = [
      {
        tipo: "valor",
        ini: Number(rend.velocidad.inicial),
        act: Number(rend.velocidad.actual),
        obj: Number(rend.velocidad.objetivo),
      },
      {
        tipo: "tiempo",
        ini: parseTime(rend.resistencia.inicial),
        act: parseTime(rend.resistencia.actual),
        obj: parseTime(rend.resistencia.objetivo),
      },
      {
        tipo: "valor",
        ini: Number(rend.fuerzaInferior.inicial),
        act: Number(rend.fuerzaInferior.actual),
        obj: Number(rend.fuerzaInferior.objetivo),
      },
      {
        tipo: "valor",
        ini: Number(rend.fuerzaSuperior.inicial),
        act: Number(rend.fuerzaSuperior.actual),
        obj: Number(rend.fuerzaSuperior.objetivo),
      },
    ];

    const scores = metrics.map((m) => {
      if (m.tipo === "tiempo") {
        return ((m.ini - m.act) / (m.ini - m.obj)) * 100;
      }
      return ((m.act - m.ini) / (m.obj - m.ini)) * 100;
    });

    const media = scores.reduce((a, b) => a + b, 0) / scores.length;
    return media.toFixed(1);
  };

  // Clasificación cualitativa según la media
  const clasificarMedia = (media) => {
    const valor = Number(media);
    if (valor < 40) return { label: "Mal", color: "text-red-600" };
    if (valor < 70) return { label: "Bien", color: "text-yellow-600" };
    return { label: "Muy bien", color: "text-green-600" };
  };

  const mediaJugador = calcularMedia(rendimiento);
  const estadoJugador = clasificarMedia(mediaJugador);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Rendimiento físico</h2>

      {/* Media global del jugador */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-lg font-bold text-gray-700">
          Forma física global:{" "}
          <span className="text-blue-600">{mediaJugador}%</span>
        </p>
        <p className={`text-md font-semibold ${estadoJugador.color}`}>
          Estado: {estadoJugador.label}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceCard
          title="Velocidad (km/h)"
          inicial={rendimiento.velocidad.inicial}
          actual={rendimiento.velocidad.actual}
          objetivo={rendimiento.velocidad.objetivo}
          tipo="valor"
        />

        <PerformanceCard
          title="Resistencia (min:seg)"
          inicial={rendimiento.resistencia.inicial}
          actual={rendimiento.resistencia.actual}
          objetivo={rendimiento.resistencia.objetivo}
          tipo="tiempo" // menor es mejor
        />

        <PerformanceCard
          title="Fuerza tren inferior (salto cm)"
          inicial={rendimiento.fuerzaInferior.inicial}
          actual={rendimiento.fuerzaInferior.actual}
          objetivo={rendimiento.fuerzaInferior.objetivo}
          tipo="valor"
        />

        <PerformanceCard
          title="Fuerza tren superior (press banca kg)"
          inicial={rendimiento.fuerzaSuperior.inicial}
          actual={rendimiento.fuerzaSuperior.actual}
          objetivo={rendimiento.fuerzaSuperior.objetivo}
          tipo="valor"
        />
      </div>
    </div>
  );
}
