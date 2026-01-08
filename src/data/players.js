// src/data/players.js
export const players = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    edad: 32,
    posicion: "Forward",
    attendance: {
      "2026-01-15": "present",
      "2026-01-18": "present",
      "2026-01-22": "absent",
    },
    rendimiento: {
      velocidad: { inicial: 25, actual: 28, objetivo: 30 },       // km/h
      resistencia: { inicial: "9:30", actual: "8:45", objetivo: "8:00" }, // min:seg
      fuerzaInferior: { inicial: 40, actual: 45, objetivo: 50 },  // cm salto vertical
      fuerzaSuperior: { inicial: 75, actual: 80, objetivo: 85 }   // kg press banca
    }
  },

  {
    id: 2,
    nombre: "Lucas",
    apellido: "Gómez",
    edad: 27,
    posicion: "Back",
    attendance: {
      "2026-01-10": "present",
      "2026-01-12": "present",
    },
    rendimiento: {
      velocidad: { inicial: 24, actual: 26, objetivo: 30 },
      resistencia: { inicial: "10:00", actual: "9:15", objetivo: "8:30" },
      fuerzaInferior: { inicial: 38, actual: 42, objetivo: 50 },
      fuerzaSuperior: { inicial: 70, actual: 76, objetivo: 85 }
    }
  },

  {
    id: 3,
    nombre: "Matías",
    apellido: "Rojas",
    edad: 35,
    posicion: "Forward",
    attendance: {
      "2026-01-08": "present",
      "2026-01-14": "absent",
    },
    rendimiento: {
      velocidad: { inicial: 26, actual: 29, objetivo: 31 },
      resistencia: { inicial: "9:45", actual: "9:00", objetivo: "8:20" },
      fuerzaInferior: { inicial: 42, actual: 48, objetivo: 52 },
      fuerzaSuperior: { inicial: 78, actual: 82, objetivo: 88 }
    }
  },
];
