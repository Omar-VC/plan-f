export const DIVISION_OPTIONS = [
  { value: "plantel-superior", label: "Plantel Superior" },
  { value: "juveniles", label: "Juveniles" },
  { value: "infantiles", label: "Infantiles" },
];

export const CATEGORY_OPTIONS = [
  { value: "plantel-superior", label: "Plantel Superior" },
  { value: "m6", label: "M6" },
  { value: "m7", label: "M7" },
  { value: "m8", label: "M8" },
  { value: "m9", label: "M9" },
  { value: "m10", label: "M10" },
  { value: "m11", label: "M11" },
  { value: "m12", label: "M12" },
  { value: "m13", label: "M13" },
  { value: "m14", label: "M14" },
  { value: "m15", label: "M15" },
  { value: "m16", label: "M16" },
  { value: "m17", label: "M17" },
  { value: "m18", label: "M18" },
];

export function isValidDivision(division) {
  return DIVISION_OPTIONS.some((option) => option.value === division);
}

export function getDivisionLabel(division) {
  return DIVISION_OPTIONS.find((option) => option.value === division)?.label || "División";
}

export function getDivisionFromCategory(category) {
  if (category === "plantel-superior") return "plantel-superior";

  const number = Number(category?.replace("m", ""));
  if (Number.isNaN(number)) return "plantel-superior";

  if (number >= 6 && number <= 12) return "infantiles";
  if (number >= 13 && number <= 18) return "juveniles";

  return "plantel-superior";
}

export function getDefaultCategoryByDivision(division) {
  if (division === "infantiles") return "m12";
  if (division === "juveniles") return "m13";
  return "plantel-superior";
}
