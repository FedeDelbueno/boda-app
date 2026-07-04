import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { FaTrash } from "react-icons/fa";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import { downloadCsv } from "../utils/csv";
import { confirmDelete, notifyError } from "../utils/swal";
import StatCard from "./StatCard";
import FechaHora from "./FechaHora";

const AsistenciaBadge = ({ value }) => (
  <span
    className="px-3 py-1.5 rounded-full text-base font-bold"
    style={{
      background: value === "si" ? "rgba(139,101,48,0.15)" : "rgba(161,59,46,0.12)",
      color: value === "si" ? "#8B6530" : "#a13b2e",
    }}
  >
    {value === "si" ? "Sí" : "No"}
  </span>
);

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

  const handleDelete = async (id) => {
    const ok = await confirmDelete({
      title: "¿Borrar esta confirmación?",
      text: "Se va a eliminar esta respuesta de RSVP. No se puede deshacer.",
    });
    if (!ok) return;
    try {
      const res = await authFetch(`${API_BASE_URL}/api/rsvp/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("request_failed");
      setRsvps((prev) => prev.filter((r) => r.id !== id));
    } catch {
      notifyError("No se pudo borrar la confirmación.");
    }
  };

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
          className="font-body font-medium input-gold w-full sm:w-auto sm:min-w-[260px]"
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            border: "1.5px solid rgba(199,160,99,0.4)",
            background: "rgba(246,241,231,0.08)",
            fontSize: 18,
            color: "#F6F1E7",
          }}
        />
        <motion.button
          onClick={handleExport}
          className="btn-gold"
          style={{ padding: "12px 26px", fontSize: 16, minHeight: "auto" }}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          Exportar CSV
        </motion.button>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-4">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              className="card-gold p-5 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4), ease: "easeOut" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-serif font-bold text-xl" style={{ color: "#20302A" }}>{r.nombre_apellido}</span>
                <div className="flex items-center gap-2">
                  <AsistenciaBadge value={r.asistencia} />
                  <button
                    onClick={() => handleDelete(r.id)}
                    aria-label="Borrar confirmación"
                    className="flex items-center justify-center"
                    style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(161,59,46,0.12)", color: "#a13b2e", cursor: "pointer" }}
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5" style={{ borderTop: "1px solid rgba(176,129,63,0.15)", paddingTop: 10 }}>
                <div className="flex justify-between gap-3">
                  <span className="font-body font-bold text-sm uppercase" style={{ color: "#8B6530", letterSpacing: "0.06em" }}>Restricción</span>
                  <span className="font-body font-semibold text-base text-right" style={{ color: "#3a3a35" }}>{RESTRICCION_LABELS[r.restriccion] || r.restriccion || "—"}</span>
                </div>
                {r.restriccion_otro && (
                  <div className="flex justify-between gap-3">
                    <span className="font-body font-bold text-sm uppercase" style={{ color: "#8B6530", letterSpacing: "0.06em" }}>Detalle</span>
                    <span className="font-body font-semibold text-base text-right" style={{ color: "#3a3a35" }}>{r.restriccion_otro}</span>
                  </div>
                )}
              </div>
              <div style={{ borderTop: "1px solid rgba(176,129,63,0.15)", paddingTop: 10 }}>
                <FechaHora value={r.created_at} />
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="card-gold px-4 py-8 text-center text-lg font-semibold" style={{ color: "#8B6530" }}>
              No hay respuestas que coincidan.
            </p>
          )}
        </div>
      ) : (
        <div className="card-gold overflow-x-auto">
          <table className="w-full font-body text-left" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(176,129,63,0.35)" }}>
                {["Nombre", "Asistencia", "Restricción", "Detalle", "Fecha", ""].map((h) => (
                  <th key={h} className="px-4 py-4 text-base font-bold uppercase" style={{ color: "#6b4423", letterSpacing: "0.06em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <motion.tr
                  key={r.id}
                  style={{ borderBottom: "1px solid rgba(176,129,63,0.15)" }}
                  whileHover={{ backgroundColor: "rgba(176,129,63,0.07)" }}
                  transition={{ duration: 0.15 }}
                >
                  <td className="px-4 py-4 text-lg font-semibold" style={{ color: "#20302A" }}>{r.nombre_apellido}</td>
                  <td className="px-4 py-4">
                    <AsistenciaBadge value={r.asistencia} />
                  </td>
                  <td className="px-4 py-4 text-lg font-medium" style={{ color: "#3a3a35" }}>{RESTRICCION_LABELS[r.restriccion] || r.restriccion || "—"}</td>
                  <td className="px-4 py-4 text-lg font-medium" style={{ color: "#3a3a35" }}>{r.restriccion_otro || "—"}</td>
                  <td className="px-4 py-4">
                    <FechaHora value={r.created_at} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      aria-label="Borrar confirmación"
                      className="flex items-center justify-center"
                      style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(161,59,46,0.12)", color: "#a13b2e", cursor: "pointer" }}
                    >
                      <FaTrash size={13} />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-lg font-semibold" style={{ color: "#8B6530" }}>
                    No hay respuestas que coincidan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
