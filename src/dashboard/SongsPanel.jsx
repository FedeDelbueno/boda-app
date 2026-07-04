import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { FaMusic } from "react-icons/fa";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import { downloadExcel } from "../utils/excel";
import StatCard from "./StatCard";
import FechaHora from "./FechaHora";

const MusicIcon = () => (
  <span
    className="flex items-center justify-center shrink-0"
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #D9B675, #8B6530)",
      color: "#20302A",
      boxShadow: "0 2px 8px rgba(139,101,48,0.4)",
    }}
  >
    <FaMusic size={14} />
  </span>
);

export default function SongsPanel() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/api/songs`);
        if (!res.ok) throw new Error("request_failed");
        const data = await res.json();
        if (!cancelled) setSongs(data);
      } catch {
        if (!cancelled) setError("No se pudieron cargar las canciones.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return songs;
    return songs.filter(
      (s) => s.tema_interprete.toLowerCase().includes(q) || s.nombre.toLowerCase().includes(q)
    );
  }, [songs, search]);

  const handleExport = () => {
    downloadExcel(
      "canciones-boda.xlsx",
      songs,
      [
        { label: "Tema / intérprete", value: (s) => s.tema_interprete },
        { label: "Sugerida por", value: (s) => s.nombre },
        { label: "Fecha", value: (s) => new Date(s.created_at).toLocaleString("es-AR") },
      ],
      "Canciones"
    );
  };

  if (loading) {
    return <p className="font-body font-semibold text-xl" style={{ color: "#F6F1E7" }}>Cargando canciones…</p>;
  }

  if (error) {
    return <p className="font-body font-semibold text-xl" style={{ color: "#e08a7d" }}>{error}</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <StatCard value={songs.length} label="Canciones sugeridas" accent="#B0813F" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <input
          type="text"
          placeholder="Buscar por tema, intérprete o quién la pidió…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-body font-medium input-gold w-full sm:w-auto sm:min-w-[340px]"
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
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              className="card-gold p-5 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4), ease: "easeOut" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <MusicIcon />
                <span className="font-serif font-bold text-xl" style={{ color: "#20302A" }}>{s.tema_interprete}</span>
              </div>
              <div className="flex justify-between gap-3" style={{ borderTop: "1px solid rgba(176,129,63,0.15)", paddingTop: 10 }}>
                <span className="font-body font-bold text-sm uppercase" style={{ color: "#8B6530", letterSpacing: "0.06em" }}>Sugerida por</span>
                <span className="font-body font-bold text-base text-right" style={{ color: "#2a2a26" }}>{s.nombre}</span>
              </div>
              <div style={{ borderTop: "1px solid rgba(176,129,63,0.15)", paddingTop: 10 }}>
                <FechaHora value={s.created_at} />
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="card-gold px-4 py-8 text-center text-lg font-semibold" style={{ color: "#8B6530" }}>
              No hay canciones que coincidan.
            </p>
          )}
        </div>
      ) : (
        <div className="card-gold overflow-x-auto p-3">
          <table className="w-full font-body text-left" style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
            <thead>
              <tr>
                {["Tema / intérprete", "Sugerida por", "Fecha"].map((h) => (
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
              {filtered.map((s, i) => {
                const isHovered = hoveredId === s.id;
                const bg = isHovered ? "rgba(176,129,63,0.1)" : i % 2 === 0 ? "#ffffff" : "rgba(250,246,238,0.75)";
                return (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3), ease: "easeOut" }}
                    whileHover={{ y: -2 }}
                    onHoverStart={() => setHoveredId(s.id)}
                    onHoverEnd={() => setHoveredId(null)}
                  >
                    <td
                      className="px-4 py-3.5 transition-colors duration-200"
                      style={{ background: bg, borderTopLeftRadius: 14, borderBottomLeftRadius: 14, boxShadow: "inset 4px 0 0 0 #B0813F" }}
                    >
                      <div className="flex items-center gap-3">
                        <MusicIcon />
                        <span className="font-serif font-bold text-xl" style={{ color: "#20302A" }}>{s.tema_interprete}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-lg font-semibold transition-colors duration-200" style={{ background: bg, color: "#2a2a26" }}>
                      {s.nombre}
                    </td>
                    <td
                      className="px-4 py-3.5 transition-colors duration-200"
                      style={{ background: bg, borderTopRightRadius: 14, borderBottomRightRadius: 14 }}
                    >
                      <FechaHora value={s.created_at} />
                    </td>
                  </motion.tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-lg font-semibold" style={{ color: "#8B6530" }}>
                    No hay canciones que coincidan.
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
