// utils/attendanceUtils.js

// Convierte "2026-01-15" → { year: "2026", month: "01" }
export function getYearMonth(dateString) {
  const [year, month] = dateString.split("-");
  return { year, month };
}

// Agrupa asistencias por año y mes
export function groupAttendanceByMonth(attendance = {}) {
  const grouped = {};

  Object.entries(attendance).forEach(([date, status]) => {
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
  return attendanceList.filter(a => a.status === "present").length;
}

// Calcula porcentaje mensual
export function calculateMonthlyPercentage(
  presentCount,
  totalTrainings = 8
) {
  if (totalTrainings === 0) return 0;
  return Math.round((presentCount / totalTrainings) * 100);
}

// Devuelve resumen mensual listo para UI
export function getMonthlySummary(attendance = {}, totalTrainings = 8) {
  const grouped = groupAttendanceByMonth(attendance);
  const summary = {};

  Object.entries(grouped).forEach(([monthKey, records]) => {
    const presentCount = countPresent(records);
    summary[monthKey] = {
      present: presentCount,
      total: totalTrainings,
      percentage: calculateMonthlyPercentage(
        presentCount,
        totalTrainings
      )
    };
  });

  return summary;
}
