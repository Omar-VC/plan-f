import React, { useState } from "react";
import { usePlayers } from "../context/PlayersContext";

export default function EditPerformanceForm({ player, onClose }) {
  const { updatePlayer } = usePlayers();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(
    player.rendimiento || {
      velocidad: { inicial: "", actual: "", objetivo: "" },
      resistencia: { inicial: "", actual: "", objetivo: "" },
      fuerzaInferior: { inicial: "", actual: "", objetivo: "" },
      fuerzaSuperior: { inicial: "", actual: "", objetivo: "" },
    }
  );

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePlayer(player.id, { rendimiento: formData });
      onClose();
    } catch (error) {
      console.error("Error al actualizar rendimiento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Editar rendimiento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Velocidad */}
        <div>
          <h3 className="font-semibold mb-2">Velocidad (tiempo en 30m)</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Inicial"
              value={formData.velocidad.inicial}
              onChange={(e) => handleChange("velocidad", "inicial", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Actual"
              value={formData.velocidad.actual}
              onChange={(e) => handleChange("velocidad", "actual", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Objetivo"
              value={formData.velocidad.objetivo}
              onChange={(e) => handleChange("velocidad", "objetivo", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Resistencia */}
        <div>
          <h3 className="font-semibold mb-2">Resistencia (min:seg)</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Inicial"
              value={formData.resistencia.inicial}
              onChange={(e) => handleChange("resistencia", "inicial", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Actual"
              value={formData.resistencia.actual}
              onChange={(e) => handleChange("resistencia", "actual", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Objetivo"
              value={formData.resistencia.objetivo}
              onChange={(e) => handleChange("resistencia", "objetivo", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Fuerza tren inferior */}
        <div>
          <h3 className="font-semibold mb-2">Fuerza tren inferior (salto cm)</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Inicial"
              value={formData.fuerzaInferior.inicial}
              onChange={(e) => handleChange("fuerzaInferior", "inicial", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Actual"
              value={formData.fuerzaInferior.actual}
              onChange={(e) => handleChange("fuerzaInferior", "actual", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Objetivo"
              value={formData.fuerzaInferior.objetivo}
              onChange={(e) => handleChange("fuerzaInferior", "objetivo", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Fuerza tren superior */}
        <div>
          <h3 className="font-semibold mb-2">Fuerza tren superior (press banca kg)</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Inicial"
              value={formData.fuerzaSuperior.inicial}
              onChange={(e) => handleChange("fuerzaSuperior", "inicial", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Actual"
              value={formData.fuerzaSuperior.actual}
              onChange={(e) => handleChange("fuerzaSuperior", "actual", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Objetivo"
              value={formData.fuerzaSuperior.objetivo}
              onChange={(e) => handleChange("fuerzaSuperior", "objetivo", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
