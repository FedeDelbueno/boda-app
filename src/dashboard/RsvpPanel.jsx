import { useEffect, useMemo, useState } from "react";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import { downloadCsv } from "../utils/csv";
import StatCard from "./StatCard";

const RESTRICCION_LABELS = {
  sin_restricciones: "Sin restricciones",
  vegetariano: "Vegetariano/a",
  vegano: "Vegano/a",
  celiaco: "Celíaco/a (sin gluten)",
  lactosa: "Intolerante a la lactosa",
  diabetico: "Diabético/a",
  otros: "Otros",
};

export default function RsvpPanel() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/api/rsvp`);
        if (!res.ok) throw new Error("request_failed");
        const data = await res.json();
        if (!cancelled) setRsvps(data);
      } catch {
        if (!cancelled) setError("No se pudieron cargar las confirmaciones.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const confirmados = useMemo(() => rsvps.filter((r) => r.asistencia === "si"), [rsvps]);
  const noVan = useMemo(() => rsvps.filter((r) => r.asistencia === "no"), [rsvps]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rsvps;
    return rsvps.filter((r) => r.nombre_apellido.toLowerCase().includes(q));
  }, [rsvps, search]);

  const handleExport = () => {
    downloadCsv(
      "confirmaciones-boda.csv",
      rsvps,
      [
        { label: "Nombre y apellido", value: (r) => r.nombre_apellido },
        { label: "Asistencia", value: (r) => (r.asistencia === "si" ? "Sí" : "No") },
        { label: "Restricción", value: (r) => RESTRICCION_LABELS[r.restriccion] || r.restriccion || "" },
        { label: "Detalle", value: (r) => r.restriccion_otro || "" },
        { label: "Fecha", value: (r) => new Date(r.created_at).toLocaleString("es-AR") },
      ]
    );
  };

  if (loading) {
    return <p className="font-body font-semibold text-xl" style={{ color: "#F6F1E7" }}>Cargando confirmaciones…</p>;
  }

  if (error) {
    return <p className="font-body font-semibold text-xl" style={{ color: "#e08a7d" }}>{error}</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <StatCard value={confirmados.length} label="Confirmados" accent="#8B6530" />
        <StatCard value={noVan.length} label="No van" accent="#a13b2e" />
        <StatCard value={rsvps.length} label="Total respuestas" accent="#B0813F" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <input
          type="text"
          placeholder="Buscar por nombre…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-body font-medium"
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            border: "1.5px solid rgba(199,160,99,0.4)",
            background: "rgba(246,241,231,0.08)",
            fontSize: 18,
            color: "#F6F1E7",
            minWidth: 260,
          }}
        />
        <button onClick={handleExport} className="btn-gold" style={{ padding: "12px 26px", fontSize: 16, minHeight: "auto" }}>
          Exportar CSV
        </button>
      </div>

      <div className="card-gold overflow-x-auto">
        <table className="w-full font-body text-left" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid rgba(176,129,63,0.35)" }}>
              {["Nombre", "Asistencia", "Restricción", "Detalle", "Fecha"].map((h) => (
                <th key={h} className="px-4 py-4 text-base font-bold uppercase" style={{ color: "#6b4423", letterSpacing: "0.06em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid rgba(176,129,63,0.15)" }}>
                <td className="px-4 py-4 text-lg font-semibold" style={{ color: "#20302A" }}>{r.nombre_apellido}</td>
                <td className="px-4 py-4">
                  <span
                    className="px-3 py-1.5 rounded-full text-base font-bold"
                    style={{
                      background: r.asistencia === "si" ? "rgba(139,101,48,0.15)" : "rgba(161,59,46,0.12)",
                      color: r.asistencia === "si" ? "#8B6530" : "#a13b2e",
                    }}
                  >
                    {r.asistencia === "si" ? "Sí" : "No"}
                  </span>
                </td>
                <td className="px-4 py-4 text-lg font-medium" style={{ color: "#3a3a35" }}>{RESTRICCION_LABELS[r.restriccion] || r.restriccion || "—"}</td>
                <td className="px-4 py-4 text-lg font-medium" style={{ color: "#3a3a35" }}>{r.restriccion_otro || "—"}</td>
                <td className="px-4 py-4 text-base font-medium" style={{ color: "#6b6b62" }}>
                  {new Date(r.created_at).toLocaleString("es-AR")}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-lg font-semibold" style={{ color: "#8B6530" }}>
                  No hay respuestas que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
