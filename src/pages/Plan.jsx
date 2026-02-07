import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { getDivisionLabel, isValidDivision } from "../utils/divisions";

export default function Plan() {
  const { plans, addPlan, updatePlan, deletePlan } = usePlan();
  const { division = "plantel-superior" } = useParams();

  const divisionPlans = useMemo(
    () => plans.filter((plan) => (plan.division || "plantel-superior") === division),
    [plans, division]
  );

  const [annualInputs, setAnnualInputs] = useState({});
  const [monthlyInputs, setMonthlyInputs] = useState({});
  const [weeklyInputs, setWeeklyInputs] = useState({});
  const [sessionInputs, setSessionInputs] = useState({});

  if (!isValidDivision(division)) {
    return <div className="p-6">División no válida.</div>;
  }

  const handleCreatePlan = async () => {
    await addPlan({
      seasonYear: new Date().getFullYear(),
      objectives: { annual: "", monthly: [] },
      weeklyPlans: [],
      division,
    });
  };

  const handleChangeAnnual = (planId, value) => {
    setAnnualInputs((s) => ({ ...s, [planId]: value }));
  };

  const handleSaveAnnual = async (planId) => {
    const value = annualInputs[planId] ?? "";
    const plan = divisionPlans.find((p) => p.id === planId);
    if (!plan) return;
    await updatePlan(planId, {
      objectives: { ...plan.objectives, annual: value },
    });
    setAnnualInputs((s) => ({ ...s, [planId]: "" }));
  };

  const handleChangeMonthlyInput = (planId, field, value) => {
    setMonthlyInputs((s) => ({
      ...s,
      [planId]: { ...(s[planId] || { month: "", objective: "" }), [field]: value },
    }));
  };

  const handleAddMonthlyObjective = async (planId) => {
    const input = monthlyInputs[planId] || { month: "", objective: "" };
    if (!input.month) return;

    const plan = divisionPlans.find((p) => p.id === planId);
    if (!plan) return;

    const updatedMonthly = [
      ...(plan.objectives?.monthly || []),
      { month: input.month, focus: input.objective || "", weeklyPlans: [] },
    ];

    await updatePlan(planId, {
      objectives: { ...plan.objectives, monthly: updatedMonthly },
    });

    setMonthlyInputs((s) => ({ ...s, [planId]: { month: "", objective: "" } }));
  };

  const handleDeleteMonthly = async (planId, monthIdx) => {
    const plan = divisionPlans.find((p) => p.id === planId);
    if (!plan) return;

    const updatedMonthly = (plan.objectives?.monthly || []).filter((_, i) => i !== monthIdx);
    await updatePlan(planId, { objectives: { ...plan.objectives, monthly: updatedMonthly } });
  };

  const keyWeek = (planId, monthIdx) => `${planId}_${monthIdx}`;
  const keySession = (planId, monthIdx, weekIdx) => `${planId}_${monthIdx}_${weekIdx}`;

  const handleChangeWeeklyInput = (planId, monthIdx, field, value) => {
    const key = keyWeek(planId, monthIdx);
    setWeeklyInputs((s) => ({
      ...s,
      [key]: { ...(s[key] || { week: "", objective: "" }), [field]: value },
    }));
  };

  const handleAddWeeklyToMonth = async (planId, monthIdx) => {
    const key = keyWeek(planId, monthIdx);
    const input = weeklyInputs[key] || { week: "", objective: "" };
    if (!input.week) return;

    const plan = divisionPlans.find((p) => p.id === planId);
    if (!plan) return;

    const monthly = plan.objectives?.monthly || [];
    const monthObj = monthly[monthIdx] || { weeklyPlans: [] };

    const updatedMonth = {
      ...monthObj,
      weeklyPlans: [
        ...(monthObj.weeklyPlans || []),
        { week: input.week, objective: input.objective || "", dailySessions: [] },
      ],
    };

    const updatedMonthly = monthly.map((m, i) => (i === monthIdx ? updatedMonth : m));

    await updatePlan(planId, {
      objectives: { ...plan.objectives, monthly: updatedMonthly },
    });

    setWeeklyInputs((s) => ({ ...s, [key]: { week: "", objective: "" } }));
  };

  const handleChangeSessionInput = (planId, monthIdx, weekIdx, field, value) => {
    const key = keySession(planId, monthIdx, weekIdx);
    setSessionInputs((s) => ({
      ...s,
      [key]: { ...(s[key] || { date: "", type: "", notes: "" }), [field]: value },
    }));
  };

  const handleAddSession = async (planId, monthIdx, weekIdx) => {
    const key = keySession(planId, monthIdx, weekIdx);
    const input = sessionInputs[key] || { date: "", type: "", notes: "" };
    if (!input.date || !input.type) return;

    const plan = divisionPlans.find((p) => p.id === planId);
    if (!plan) return;

    const updatedMonthly = (plan.objectives?.monthly || []).map((m, mi) => {
      if (mi !== monthIdx) return m;
      return {
        ...m,
        weeklyPlans: (m.weeklyPlans || []).map((w, wi) => {
          if (wi !== weekIdx) return w;
          return {
            ...w,
            dailySessions: [
              ...(w.dailySessions || []),
              { date: input.date, type: input.type, notes: input.notes || "" },
            ],
          };
        }),
      };
    });

    await updatePlan(planId, {
      objectives: { ...plan.objectives, monthly: updatedMonthly },
    });

    setSessionInputs((s) => ({ ...s, [key]: { date: "", type: "", notes: "" } }));
  };
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-1">Planificación</h1>
      <p className="text-gray-600 mb-6">{getDivisionLabel(division)}</p>

      <button
        onClick={handleCreatePlan}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Crear nueva temporada
      </button>

      {divisionPlans.length === 0 ? (
        <p className="text-gray-600">No hay planes cargados para esta división.</p>
      ) : (
        divisionPlans.map((plan) => (
          <div key={plan.id} className="bg-white p-4 rounded shadow mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Temporada {plan.seasonYear}</h2>
              <button
                onClick={() => deletePlan(plan.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Eliminar temporada
              </button>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Objetivo anual</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={annualInputs[plan.id] ?? plan.objectives?.annual ?? ""}
                  onChange={(e) => handleChangeAnnual(plan.id, e.target.value)}
                  placeholder="Objetivo anual"
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => handleSaveAnnual(plan.id)}
                  className="bg-green-600 text-white px-3 rounded"
                >
                  Guardar
                </button>
              </div>
            </div>

            <div className="mb-4 border p-3 rounded">
              <h4 className="font-semibold mb-2">Objetivos mensuales</h4>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Mes (ej: Marzo)"
                  value={monthlyInputs[plan.id]?.month ?? ""}
                  onChange={(e) => handleChangeMonthlyInput(plan.id, "month", e.target.value)}
                  className="border px-2 py-1 rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Objetivo mensual"
                  value={monthlyInputs[plan.id]?.objective ?? ""}
                  onChange={(e) =>
                    handleChangeMonthlyInput(plan.id, "objective", e.target.value)
                  }
                  className="border px-2 py-1 rounded w-2/3"
                />
                <button
                  onClick={() => handleAddMonthlyObjective(plan.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  + Agregar
                </button>
              </div>

              {plan.objectives?.monthly?.length > 0 ? (
                <ul className="space-y-3">
                  {plan.objectives.monthly.map((m, monthIdx) => (
                    <li key={monthIdx} className="border rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <p>
                          <strong>{m.month}:</strong> {m.focus}
                        </p>
                        <button
                          onClick={() => handleDeleteMonthly(plan.id, monthIdx)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Eliminar mes
                        </button>
                      </div>

                      <div className="mb-3">
                        <h5 className="font-semibold mb-1">Semanas</h5>

                        {m.weeklyPlans?.length > 0 ? (
                          <ul className="list-disc pl-6 mb-2">
                            {m.weeklyPlans.map((w, weekIdx) => (
                              <li key={weekIdx} className="mb-2">
                                <div>
                                  <strong>{w.week}:</strong> {w.objective}
                                </div>

                                <div className="mt-2 ml-4">
                                  <p className="text-sm font-medium mb-1">Sesiones</p>

                                  {w.dailySessions?.length > 0 ? (
                                    <ul className="list-disc pl-6 mb-2">
                                      {w.dailySessions.map((s, sessionIdx) => (
                                        <li key={sessionIdx} className="text-sm mb-1">
                                          <strong>{s.date}:</strong> {s.type} — {s.notes}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-xs text-gray-500 mb-2">
                                      No hay sesiones cargadas.
                                    </p>
                                  )}

                                  <div className="flex flex-col gap-2">
                                    <input
                                      type="date"
                                      value={
                                        sessionInputs[keySession(plan.id, monthIdx, weekIdx)]
                                          ?.date ?? ""
                                      }
                                      onChange={(e) =>
                                        handleChangeSessionInput(
                                          plan.id,
                                          monthIdx,
                                          weekIdx,
                                          "date",
                                          e.target.value
                                        )
                                      }
                                      className="border px-2 py-1 rounded"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Tipo de trabajo"
                                      value={
                                        sessionInputs[keySession(plan.id, monthIdx, weekIdx)]
                                          ?.type ?? ""
                                      }
                                      onChange={(e) =>
                                        handleChangeSessionInput(
                                          plan.id,
                                          monthIdx,
                                          weekIdx,
                                          "type",
                                          e.target.value
                                        )
                                      }
                                      className="border px-2 py-1 rounded"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Notas"
                                      value={
                                        sessionInputs[keySession(plan.id, monthIdx, weekIdx)]
                                          ?.notes ?? ""
                                      }
                                      onChange={(e) =>
                                        handleChangeSessionInput(
                                          plan.id,
                                          monthIdx,
                                          weekIdx,
                                          "notes",
                                          e.target.value
                                        )
                                      }
                                      className="border px-2 py-1 rounded"
                                    />
                                    <button
                                      onClick={() =>
                                        handleAddSession(plan.id, monthIdx, weekIdx)
                                      }
                                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                      ➕ Agregar sesión
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-gray-500 mb-2">No hay semanas cargadas.</p>
                        )}

                        <div className="flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Semana (ej: Semana 1)"
                            value={weeklyInputs[keyWeek(plan.id, monthIdx)]?.week ?? ""}
                            onChange={(e) =>
                              handleChangeWeeklyInput(
                                plan.id,
                                monthIdx,
                                "week",
                                e.target.value
                              )
                            }
                            className="border px-2 py-1 rounded w-1/3"
                          />
                          <input
                            type="text"
                            placeholder="Objetivo semanal"
                            value={weeklyInputs[keyWeek(plan.id, monthIdx)]?.objective ?? ""}
                            onChange={(e) =>
                              handleChangeWeeklyInput(
                                plan.id,
                                monthIdx,
                                "objective",
                                e.target.value
                              )
                            }
                            className="border px-2 py-1 rounded w-2/3"
                          />
                          <button
                            onClick={() => handleAddWeeklyToMonth(plan.id, monthIdx)}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            + Semana
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">No hay objetivos mensuales aún.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
