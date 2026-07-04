import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaImage, FaTrash, FaVideo } from "react-icons/fa";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import { confirmDelete, notifyError } from "../utils/swal";
import StatCard from "./StatCard";
import StorageCard from "./StorageCard";
import TiltCard from "../components/TiltCard";

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "fotos", label: "Fotos" },
  { key: "videos", label: "Videos" },
];

const isVideo = (m) => (m.mime_type || "").startsWith("video/");
const isImage = (m) => (m.mime_type || "").startsWith("image/");

const formatSize = (bytes) => {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
};

export default function DrivePanel() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("todos");
  const [zipping, setZipping] = useState(false);
  const [zipError, setZipError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/api/media`);
        if (!res.ok) throw new Error("request_failed");
        const data = await res.json();
        if (!cancelled) setMedia(data);
      } catch {
        if (!cancelled) setError("No se pudieron cargar los archivos.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "fotos") return media.filter(isImage);
    if (filter === "videos") return media.filter(isVideo);
    return media;
  }, [media, filter]);

  const handleDelete = async (id, m) => {
    const ok = await confirmDelete({
      title: isVideo(m) ? "¿Borrar este video?" : "¿Borrar esta foto?",
      text: "Se va a eliminar del servidor y ya no va a estar disponible para nadie. No se puede deshacer.",
    });
    if (!ok) return;
    try {
      const res = await authFetch(`${API_BASE_URL}/api/media/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("request_failed");
      setMedia((prev) => prev.filter((item) => item.id !== id));
    } catch {
      notifyError("No se pudo borrar el archivo.");
    }
  };

  const handleDownloadAll = async () => {
    setZipError("");
    setZipping(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/media/download-all`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "No se pudo generar el zip");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "fotos-boda.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setZipError(err.message || "No se pudo generar el zip");
    } finally {
      setZipping(false);
    }
  };

  if (loading) {
    return <p className="font-body font-semibold text-xl" style={{ color: "#F6F1E7" }}>Cargando archivos…</p>;
  }

  if (error) {
    return <p className="font-body font-semibold text-xl" style={{ color: "#e08a7d" }}>{error}</p>;
  }

  return (
    <div>
      <StorageCard />

      <div className="flex flex-wrap gap-4 mb-8">
        <StatCard value={media.length} label="Archivos subidos" accent="#B0813F" />
        <StatCard value={media.filter(isImage).length} label="Fotos" accent="#8B6530" />
        <StatCard value={media.filter(isVideo).length} label="Videos" accent="#8B6530" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="font-body text-base px-5 py-2.5 rounded-full"
              style={{
                border: "1.5px solid rgba(199,160,99,0.4)",
                background: filter === f.key ? "linear-gradient(135deg, #C7A063, #B0813F)" : "rgba(246,241,231,0.06)",
                color: filter === f.key ? "#20302A" : "#F6F1E7",
                fontWeight: 700,
                flexShrink: 0,
              }}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col items-end gap-1">
          <motion.button
            onClick={handleDownloadAll}
            disabled={zipping || media.length === 0}
            className="btn-gold flex items-center gap-2"
            style={{ padding: "12px 26px", fontSize: 16, minHeight: "auto", opacity: zipping || media.length === 0 ? 0.6 : 1 }}
            whileHover={zipping || media.length === 0 ? {} : { y: -2, scale: 1.03 }}
            whileTap={zipping || media.length === 0 ? {} : { scale: 0.96 }}
          >
            <FaDownload />
            {zipping ? "Generando zip…" : "Descargar todo (.zip)"}
          </motion.button>
          {zipError && (
            <span className="font-body font-semibold text-base" style={{ color: "#e08a7d" }}>{zipError}</span>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="font-body font-semibold text-xl text-center py-12" style={{ color: "#F6F1E7" }}>
          Todavía no hay archivos en esta categoría.
        </p>
      ) : (
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(170px, 100%), 1fr))" }}>
          {filtered.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4), ease: "easeOut" }}
            >
              <TiltCard className="card-gold card-gold-interactive overflow-hidden flex flex-col" maxTilt={6}>
                <div style={{ position: "relative", aspectRatio: "4 / 3", background: "#20302A", overflow: "hidden" }} className="flex items-center justify-center">
                  {isImage(m) ? (
                    <img src={m.url} alt={m.original_filename} className="w-full h-full object-cover" loading="lazy" />
                  ) : isVideo(m) ? (
                    <video src={m.url} controls preload="metadata" className="w-full h-full object-cover" />
                  ) : (
                    <FaImage className="text-4xl" style={{ color: "#C7A063" }} />
                  )}
                  <button
                    onClick={() => handleDelete(m.id, m)}
                    aria-label="Borrar archivo"
                    className="flex items-center justify-center"
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "none",
                      background: "rgba(32,48,42,0.75)",
                      color: "#e08a7d",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
                <div className="p-3 flex flex-col gap-1.5">
                  <span className="font-body font-semibold text-base truncate" style={{ color: "#20302A" }} title={m.original_filename}>
                    {m.original_filename}
                  </span>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-body font-medium text-sm flex items-center gap-1" style={{ color: "#6b4423" }}>
                      {isVideo(m) ? <FaVideo /> : <FaImage />}
                      {m.guest_name || "Anónimo"} {m.size_bytes ? `· ${formatSize(m.size_bytes)}` : ""}
                    </span>
                    <motion.a
                      href={m.url}
                      download
                      className="font-body text-base flex items-center gap-1"
                      style={{ color: "#B0813F", fontWeight: 700 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDownload className="text-sm" /> Bajar
                    </motion.a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
