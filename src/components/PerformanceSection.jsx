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

  // Función segura para convertir valores a número
  const safeNumber = (val) => {
    if (val === null || val === "" || val === undefined) return NaN;
    return Number(val);
  };

  // Función para convertir tiempo "min:seg" a segundos
  const parseTime = (val) => {
    if (typeof val === "string" && val.includes(":")) {
      const [min, sec] = val.split(":").map(Number);
      return min * 60 + sec;
    }
    return safeNumber(val);
  };

  // Calcular media de jugador (forma física global)
  const calcularMedia = (rend) => {
    const metrics = [
      {
        tipo: "tiempo",
        ini: safeNumber(rend.velocidad.inicial),
        act: safeNumber(rend.velocidad.actual),
        obj: safeNumber(rend.velocidad.objetivo),
      },
      {
        tipo: "tiempo",
        ini: parseTime(rend.resistencia.inicial),
        act: parseTime(rend.resistencia.actual),
        obj: parseTime(rend.resistencia.objetivo),
      },
      {
        tipo: "valor",
        ini: safeNumber(rend.fuerzaInferior.inicial),
        act: safeNumber(rend.fuerzaInferior.actual),
        obj: safeNumber(rend.fuerzaInferior.objetivo),
      },
      {
        tipo: "valor",
        ini: safeNumber(rend.fuerzaSuperior.inicial),
        act: safeNumber(rend.fuerzaSuperior.actual),
        obj: safeNumber(rend.fuerzaSuperior.objetivo),
      },
    ];

    const scores = metrics.map((m) => {
      if ([m.ini, m.act, m.obj].some((v) => Number.isNaN(v))) return NaN;
      if (m.tipo === "tiempo") {
        if (m.ini === m.obj) return NaN;
        return ((m.ini - m.act) / (m.ini - m.obj)) * 100;
      }
      if (m.tipo === "valor") {
        if (m.obj === m.ini) return NaN;
        return ((m.act - m.ini) / (m.obj - m.ini)) * 100;
      }
      return NaN;
    });

    const validScores = scores.filter((s) => !Number.isNaN(s));
    const media = validScores.length
      ? validScores.reduce((a, b) => a + b, 0) / validScores.length
      : 0;

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
          title="Velocidad (tiempo en 30 m)"
          inicial={rendimiento.velocidad.inicial}
          actual={rendimiento.velocidad.actual}
          objetivo={rendimiento.velocidad.objetivo}
          tipo="tiempo"
        />

        <PerformanceCard
          title="Resistencia (min:seg)"
          inicial={rendimiento.resistencia.inicial}
          actual={rendimiento.resistencia.actual}
          objetivo={rendimiento.resistencia.objetivo}
          tipo="tiempo"
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
