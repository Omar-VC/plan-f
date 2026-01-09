// src/components/EditPerformanceForm.jsx
import React, { useState } from "react";

export default function EditPerformanceForm({ player, onSave, onClose }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // guarda en contexto o estado
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Editar rendimiento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Velocidad */}
        <div>
          <h3 className="font-medium mb-2">Velocidad (tiempo en 30 m)</h3>
          
          <label className="block text-sm">Inicial</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              step="0.01"
              value={formData.velocidad.inicial}
              onChange={(e) => handleChange("velocidad", "inicial", e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="ej: 4.8"
            />
            <span className="text-gray-600">s</span>
          </div>

          <label className="block text-sm mt-2">Actual</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              step="0.01"
              value={formData.velocidad.actual}
              onChange={(e) => handleChange("velocidad", "actual", e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="ej: 4.5"
            />
            <span className="text-gray-600">s</span>
          </div>

          <label className="block text-sm mt-2">Objetivo</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              step="0.01"
              value={formData.velocidad.objetivo}
              onChange={(e) => handleChange("velocidad", "objetivo", e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="ej: 4.2"
            />
            <span className="text-gray-600">s</span>
          </div>
        </div>

        {/* Resistencia */}
        <div>
          <h3 className="font-medium mb-2">Resistencia (min:seg)</h3>
          <label className="block text-sm">Inicial</label>
          <input
            type="text"
            value={formData.resistencia.inicial}
            onChange={(e) => handleChange("resistencia", "inicial", e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="ej: 9:30"
          />
          <label className="block text-sm mt-2">Actual</label>
          <input
            type="text"
            value={formData.resistencia.actual}
            onChange={(e) => handleChange("resistencia", "actual", e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="ej: 8:45"
          />
          <label className="block text-sm mt-2">Objetivo</label>
          <input
            type="text"
            value={formData.resistencia.objetivo}
            onChange={(e) => handleChange("resistencia", "objetivo", e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="ej: 8:00"
          />
        </div>

        {/* Fuerza Inferior */}
        <div>
          <h3 className="font-medium mb-2">Fuerza tren inferior (salto cm)</h3>
          <label className="block text-sm">Inicial</label>
          <input
            type="number"
            value={formData.fuerzaInferior.inicial}
            onChange={(e) => handleChange("fuerzaInferior", "inicial", e.target.value)}
            className="border rounded p-2 w-full"
          />
          <label className="block text-sm mt-2">Actual</label>
          <input
            type="number"
            value={formData.fuerzaInferior.actual}
            onChange={(e) => handleChange("fuerzaInferior", "actual", e.target.value)}
            className="border rounded p-2 w-full"
          />
          <label className="block text-sm mt-2">Objetivo</label>
          <input
            type="number"
            value={formData.fuerzaInferior.objetivo}
            onChange={(e) => handleChange("fuerzaInferior", "objetivo", e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Fuerza Superior */}
        <div>
          <h3 className="font-medium mb-2">Fuerza tren superior (press banca kg)</h3>
          <label className="block text-sm">Inicial</label>
          <input
            type="number"
            value={formData.fuerzaSuperior.inicial}
            onChange={(e) => handleChange("fuerzaSuperior", "inicial", e.target.value)}
            className="border rounded p-2 w-full"
          />
          <label className="block text-sm mt-2">Actual</label>
          <input
            type="number"
            value={formData.fuerzaSuperior.actual}
            onChange={(e) => handleChange("fuerzaSuperior", "actual", e.target.value)}
            className="border rounded p-2 w-full"
          />
          <label className="block text-sm mt-2">Objetivo</label>
          <input
            type="number"
            value={formData.fuerzaSuperior.objetivo}
            onChange={(e) => handleChange("fuerzaSuperior", "objetivo", e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Guardar
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
