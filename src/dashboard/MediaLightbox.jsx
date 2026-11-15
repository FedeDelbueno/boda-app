import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaDownload, FaTimes, FaTrash } from "react-icons/fa";
import { canDisplayOriginal, formatBytes, formatDate, guestLabel, isVideo } from "./mediaUtils";

const iconBtn = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "none",
  background: "rgba(32,48,42,0.7)",
  color: "#F6F1E7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

/** Vista ampliada: flechas/teclado/deslizar para pasar, Esc para cerrar. */
export default function MediaLightbox({ items, index, onClose, onIndex, onDelete }) {
  const m = index != null ? items[index] : null;
  const touchX = useRef(null);

  useEffect(() => {
    if (!m) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onIndex(index - 1);
      if (e.key === "ArrowRight" && index < items.length - 1) onIndex(index + 1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [m, index, items.length, onClose, onIndex]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx > 60 && index > 0) onIndex(index - 1);
    if (dx < -60 && index < items.length - 1) onIndex(index + 1);
  };

  return (
    <AnimatePresence>
      {m && (
        <motion.div
          className="fixed inset-0 flex flex-col"
          style={{ zIndex: 1000, background: "rgba(15,22,19,0.94)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <div className="font-body min-w-0" style={{ color: "#F6F1E7" }}>
              <div className="font-bold truncate" style={{ fontSize: 17 }}>{guestLabel(m.guest_name)}</div>
              <div className="truncate" style={{ fontSize: 13.5, opacity: 0.75 }}>
                {m.original_filename} · {formatBytes(m.size_bytes)} · {formatDate(m.created_at)} · {index + 1}/{items.length}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <a href={m.download_url} style={iconBtn} aria-label="Descargar original" title="Descargar original">
                <FaDownload />
              </a>
              <button style={{ ...iconBtn, color: "#e08a7d" }} onClick={() => onDelete(m)} aria-label="Borrar" title="Borrar">
                <FaTrash />
              </button>
              <button style={iconBtn} onClick={onClose} aria-label="Cerrar" title="Cerrar">
                <FaTimes />
              </button>
            </div>
          </div>

          <div
            className="flex-1 flex items-center justify-center relative px-2 pb-4"
            style={{ minHeight: 0 }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center" style={{ maxWidth: "100%", maxHeight: "100%" }}>
              {isVideo(m) ? (
                <video
                  key={m.id}
                  src={m.url}
                  poster={m.thumb_url || undefined}
                  controls
                  autoPlay
                  playsInline
                  style={{ maxWidth: "100%", maxHeight: "calc(100vh - 110px)", borderRadius: 8 }}
                />
              ) : canDisplayOriginal(m) ? (
                <img
                  key={m.id}
                  src={m.url}
                  alt={m.original_filename}
                  style={{ maxWidth: "100%", maxHeight: "calc(100vh - 110px)", objectFit: "contain", borderRadius: 8 }}
                />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  {m.thumb_url && (
                    <img src={m.thumb_url} alt="" style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: 8 }} />
                  )}
                  <p className="font-body text-center" style={{ color: "#F6F1E7", fontSize: 15, maxWidth: 340 }}>
                    Foto en formato HEIC (iPhone): este navegador no la muestra en calidad original. Descargala para verla completa.
                  </p>
                </div>
              )}
            </div>

            {index > 0 && (
              <button
                style={{ ...iconBtn, position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex(index - 1);
                }}
                aria-label="Anterior"
              >
                <FaChevronLeft />
              </button>
            )}
            {index < items.length - 1 && (
              <button
                style={{ ...iconBtn, position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex(index + 1);
                }}
                aria-label="Siguiente"
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
