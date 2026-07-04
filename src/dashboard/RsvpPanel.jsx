import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { FaTrash } from "react-icons/fa";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import { downloadExcel } from "../utils/excel";
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

const RestriccionBadge = ({ value }) => {
  const neutral = !value || value === "sin_restricciones";
  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-bold inline-block"
      style={{
        background: neutral ? "rgba(58,58,53,0.07)" : "rgba(176,129,63,0.16)",
        color: neutral ? "#6b6b62" : "#8B6530",
      }}
    >
      {RESTRICCION_LABELS[value] || value || "—"}
    </span>
  );
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

const Avatar = ({ name }) => (
  <span
    className="flex items-center justify-center font-serif font-bold shrink-0"
    style={{
      width: 40,
      height: 40,
      fontSize: 15,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #D9B675, #8B6530)",
      color: "#20302A",
      boxShadow: "0 2px 8px rgba(139,101,48,0.4)",
    }}
  >
    {getInitials(name)}
  </span>
);

export default function RsvpPanel() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

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
    downloadExcel(
      "confirmaciones-boda.xlsx",
      rsvps,
      [
        { label: "Nombre y apellido", value: (r) => r.nombre_apellido },
        { label: "Asistencia", value: (r) => (r.asistencia === "si" ? "Sí" : "No") },
        { label: "Restricción", value: (r) => RESTRICCION_LABELS[r.restriccion] || r.restriccion || "" },
        { label: "Detalle", value: (r) => r.restriccion_otro || "" },
        { label: "Fecha", value: (r) => new Date(r.created_at).toLocaleString("es-AR") },
      ],
      "Confirmaciones"
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
          Exportar Excel
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
              style={{ boxShadow: `inset 4px 0 0 0 ${r.asistencia === "si" ? "#8B6530" : "#a13b2e"}` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={r.nombre_apellido} />
                  <span className="font-serif font-bold text-xl" style={{ color: "#20302A" }}>{r.nombre_apellido}</span>
                </div>
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
                <div className="flex justify-between items-center gap-3">
                  <span className="font-body font-bold text-sm uppercase" style={{ color: "#8B6530", letterSpacing: "0.06em" }}>Restricción</span>
                  <RestriccionBadge value={r.restriccion} />
                </div>
                {r.restriccion_otro && (
                  <div className="flex justify-between gap-3">
                    <span className="font-body font-bold text-sm uppercase" style={{ color: "#8B6530", letterSpacing: "0.06em" }}>Detalle</span>
                    <span className="font-body font-bold text-base text-right" style={{ color: "#2a2a26" }}>{r.restriccion_otro}</span>
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
        <div className="card-gold overflow-x-auto p-3">
          <table className="w-full font-body text-left" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
            <thead>
              <tr>
                {["Nombre", "Asistencia", "Restricción", "Detalle", "Fecha", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 pb-3 text-sm font-bold uppercase"
                    style={{ color: "#6b4423", letterSpacing: "0.08em", borderBottom: "2px solid rgba(176,129,63,0.35)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const accent = r.asistencia === "si" ? "#8B6530" : "#a13b2e";
                const isHovered = hoveredId === r.id;
                const bg = isHovered ? "rgba(176,129,63,0.1)" : i % 2 === 0 ? "#ffffff" : "rgba(250,246,238,0.75)";
                return (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3), ease: "easeOut" }}
                    whileHover={{ y: -2 }}
                    onHoverStart={() => setHoveredId(r.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    style={{ cursor: "default" }}
                  >
                    <td
                      className="px-4 py-3.5 transition-colors duration-200"
                      style={{ background: bg, borderTopLeftRadius: 14, borderBottomLeftRadius: 14, boxShadow: `inset 4px 0 0 0 ${accent}` }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar name={r.nombre_apellido} />
                        <span className="font-serif font-bold text-xl" style={{ color: "#20302A" }}>{r.nombre_apellido}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 transition-colors duration-200" style={{ background: bg }}>
                      <AsistenciaBadge value={r.asistencia} />
                    </td>
                    <td className="px-4 py-3.5 transition-colors duration-200" style={{ background: bg }}>
                      <RestriccionBadge value={r.restriccion} />
                    </td>
                    <td
                      className="px-4 py-3.5 text-base font-semibold italic transition-colors duration-200 max-w-[200px] truncate"
                      style={{ background: bg, color: "#6b6b62" }}
                      title={r.restriccion_otro || ""}
                    >
                      {r.restriccion_otro || "—"}
                    </td>
                    <td className="px-4 py-3.5 transition-colors duration-200" style={{ background: bg }}>
                      <FechaHora value={r.created_at} />
                    </td>
                    <td
                      className="px-4 py-3.5 text-right transition-colors duration-200"
                      style={{ background: bg, borderTopRightRadius: 14, borderBottomRightRadius: 14 }}
                    >
                      <motion.button
                        onClick={() => handleDelete(r.id)}
                        aria-label="Borrar confirmación"
                        className="flex items-center justify-center ml-auto"
                        style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "rgba(161,59,46,0.12)", color: "#a13b2e", cursor: "pointer" }}
                        whileHover={{ scale: 1.14, backgroundColor: "rgba(161,59,46,0.22)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash size={13} />
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
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
