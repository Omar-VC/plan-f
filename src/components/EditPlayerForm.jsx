import { useState } from "react";
import { usePlayers } from "../context/PlayersContext";

export default function EditPlayerForm({ player, onClose }) {
  const { updatePlayer } = usePlayers();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: player.nombre,
    apellido: player.apellido,
    edad: player.edad,
    posicion: player.posicion,
    lesionActual: player.lesionActual || "",
    dni: player.dni || "", // 👈 nuevo campo
    foto: player.foto || "", // 👈 nuevo campo
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await updatePlayer(player.id, form);

    setLoading(false);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow space-y-3"
    >
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="edad"
        type="number"
        value={form.edad}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="dni"
        value={form.dni}
        onChange={handleChange}
        placeholder="DNI"
        className="w-full p-2 border rounded"
        required
      />

      <select
        name="posicion"
        value={form.posicion}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Forward</option>
        <option>Back</option>
      </select>
      <input
        name="lesionActual"
        value={form.lesionActual}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="foto"
        value={form.foto}
        onChange={handleChange}
        placeholder="Nombre del archivo de la foto (ej: juan.png)"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
