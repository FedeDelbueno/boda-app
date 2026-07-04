import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import StatCard from "./StatCard";
import FechaHora from "./FechaHora";

export default function SongsPanel() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

      <input
        type="text"
        placeholder="Buscar por tema, intérprete o quién la pidió…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="font-body font-medium mb-5 input-gold w-full sm:w-auto sm:min-w-[340px]"
        style={{
          padding: "12px 18px",
          borderRadius: 12,
          border: "1.5px solid rgba(199,160,99,0.4)",
          background: "rgba(246,241,231,0.08)",
          fontSize: 18,
          color: "#F6F1E7",
        }}
      />

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
              <span className="font-serif font-bold text-xl" style={{ color: "#20302A" }}>{s.tema_interprete}</span>
              <div className="flex justify-between gap-3" style={{ borderTop: "1px solid rgba(176,129,63,0.15)", paddingTop: 10 }}>
                <span className="font-body font-bold text-sm uppercase" style={{ color: "#8B6530", letterSpacing: "0.06em" }}>Sugerida por</span>
                <span className="font-body font-semibold text-base text-right" style={{ color: "#3a3a35" }}>{s.nombre}</span>
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
        <div className="card-gold overflow-x-auto">
          <table className="w-full font-body text-left" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(176,129,63,0.35)" }}>
                {["Tema / intérprete", "Sugerida por", "Fecha"].map((h) => (
                  <th key={h} className="px-4 py-4 text-base font-bold uppercase" style={{ color: "#6b4423", letterSpacing: "0.06em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <motion.tr
                  key={s.id}
                  style={{ borderBottom: "1px solid rgba(176,129,63,0.15)" }}
                  whileHover={{ backgroundColor: "rgba(176,129,63,0.07)" }}
                  transition={{ duration: 0.15 }}
                >
                  <td className="px-4 py-4 text-lg font-semibold" style={{ color: "#20302A" }}>{s.tema_interprete}</td>
                  <td className="px-4 py-4 text-lg font-medium" style={{ color: "#3a3a35" }}>{s.nombre}</td>
                  <td className="px-4 py-4">
                    <FechaHora value={s.created_at} />
                  </td>
                </motion.tr>
              ))}
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
