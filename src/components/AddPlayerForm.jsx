import { useState } from "react";
import { usePlayers } from "../context/PlayersContext";

export default function AddPlayerForm({ onClose }) {
  const { addPlayer } = usePlayers();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    posicion: "Forward",
    lesionActual: "",
    foto: "",
    dni: "", // 👈 nuevo campo
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👇 al crear el jugador, inicializamos rendimiento con la estructura completa
    addPlayer({
      ...form,
      rendimiento: {
        velocidad: { inicial: 0, actual: 0, objetivo: 0 },
        resistencia: { inicial: "0:00", actual: "0:00", objetivo: "0:00" }, // formato min:seg
        fuerzaInferior: { inicial: 0, actual: 0, objetivo: 0 },
        fuerzaSuperior: { inicial: 0, actual: 0, objetivo: 0 },
      },
    });

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-3"
    >
      <input
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="apellido"
        placeholder="Apellido"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="edad"
        type="number"
        placeholder="Edad"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="dni"
        type="text"
        placeholder="DNI"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="posicion"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Forward</option>
        <option>Back</option>
      </select>
      <input
        name="lesionActual"
        placeholder="Lesión actual (opcional)"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* 👇 nuevo input para la foto */}
      <input
        name="foto"
        placeholder="Nombre del archivo de la foto (ej: juan.png)"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
      >
        Guardar jugador
      </button>
    </form>
  );
}
