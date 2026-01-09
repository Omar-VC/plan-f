// utils/attendanceUtils.js

// Convierte "2026-01-15" → { year: "2026", month: "01" }
export function getYearMonth(dateString) {
  const [year, month] = dateString.split("-");
  return { year, month };
}

// Agrupa asistencias por año y mes a partir de un array
export function groupAttendanceByMonth(attendanceHistory = []) {
  const grouped = {};

  attendanceHistory.forEach(({ date, status }) => {
    const { year, month } = getYearMonth(date);
    const key = `${year}-${month}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push({ date, status });
  });

  return grouped;
}

// Cuenta asistencias presentes en un mes
export function countPresent(attendanceList = []) {
  return attendanceList.filter((a) => a.status === "present").length;
}

// Calcula porcentaje mensual
export function calculateMonthlyPercentage(presentCount, totalTrainings) {
  if (totalTrainings === 0) return 0;
  return Math.round((presentCount / totalTrainings) * 100);
}

// Devuelve resumen mensual listo para UI
export function getMonthlySummary(attendanceHistory = [], totalTrainings = 8) {
  const grouped = groupAttendanceByMonth(attendanceHistory);
  const summary = {};

  Object.entries(grouped).forEach(([monthKey, records]) => {
    const presentCount = countPresent(records);
    summary[monthKey] = {
      present: presentCount,
      total: records.length, // usamos cantidad real de registros en ese mes
      percentage: calculateMonthlyPercentage(presentCount, records.length),
    };
  });

  return summary;
}
