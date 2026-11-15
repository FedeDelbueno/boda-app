import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaImage, FaPlay, FaTrash } from "react-icons/fa";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import { confirmAction, confirmDelete, notifyError, notifySuccess } from "../utils/swal";
import StatCard from "./StatCard";
import StorageCard from "./StorageCard";
import BatchesCard from "./BatchesCard";
import MediaLightbox from "./MediaLightbox";
import { canDisplayOriginal, guestLabel, isImage, isVideo } from "./mediaUtils";

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "fotos", label: "Fotos" },
  { key: "videos", label: "Videos" },
];

const PER_PAGE = 48;
// Los links firmados de las fotos duran 2 h: si el panel queda abierto
// más que esto, recargamos al volver a la pestaña.
const REFRESH_AFTER_MS = 90 * 60 * 1000;

const getJson = async (path) => {
  const res = await authFetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error("request_failed");
  return res.json();
};

export default function DrivePanel() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("todos");
  const [guest, setGuest] = useState("");
  const [guests, setGuests] = useState([]);

  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState("");
  const [batches, setBatches] = useState([]);
  const [sending, setSending] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const loadedAt = useRef(0);

  const loadPage = useCallback(
    async (pageNum, replace) => {
      const params = new URLSearchParams({ page: pageNum, per_page: PER_PAGE, type: filter });
      if (guest) params.set("guest", guest);
      const data = await getJson(`/api/media?${params}`);
      setItems((prev) => (replace ? data.data : [...prev, ...data.data.filter((d) => !prev.some((p) => p.id === d.id))]));
      setPage(data.current_page);
      setLastPage(data.last_page);
      setTotal(data.total);
      loadedAt.current = Date.now();
    },
    [filter, guest]
  );

  const loadSide = useCallback(async () => {
    const [s, b, g] = await Promise.allSettled([
      getJson("/api/media/storage-stats"),
      getJson("/api/media/batches"),
      getJson("/api/media/guests"),
    ]);
    if (s.status === "fulfilled") {
      setStats(s.value);
      setStatsError("");
    } else {
      setStatsError("No se pudo cargar el uso de disco del servidor.");
    }
    if (b.status === "fulfilled") setBatches(b.value);
    if (g.status === "fulfilled") setGuests(g.value);
  }, []);

  // Carga inicial y cada vez que cambia un filtro.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    loadPage(1, true)
      .catch(() => !cancelled && setError("No se pudieron cargar los archivos."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [loadPage]);

  useEffect(() => {
    loadSide();
  }, [loadSide]);

  // Mientras un lote se está armando, refrescamos seguido; si no, cada minuto.
  const processing = batches.some((b) => b.status === "processing");
  useEffect(() => {
    const id = setInterval(loadSide, processing || sending ? 8000 : 60000);
    return () => clearInterval(id);
  }, [loadSide, processing, sending]);

  // Cuando termina un lote, los archivos enviados desaparecen de la grilla.
  const wasProcessing = useRef(false);
  useEffect(() => {
    if (wasProcessing.current && !processing) {
      setSending(false);
      loadPage(1, true).catch(() => {});
    }
    wasProcessing.current = processing;
  }, [processing, loadPage]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && Date.now() - loadedAt.current > REFRESH_AFTER_MS) {
        loadPage(1, true).catch(() => {});
        loadSide();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [loadPage, loadSide]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      await loadPage(page + 1, false);
    } catch {
      notifyError("No se pudieron cargar más archivos.");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleDelete = async (m) => {
    const ok = await confirmDelete({
      title: isVideo(m) ? "¿Borrar este video?" : "¿Borrar esta foto?",
      text: "Se va a eliminar del servidor y ya no va a estar disponible. No se puede deshacer.",
    });
    if (!ok) return;
    try {
      const res = await authFetch(`${API_BASE_URL}/api/media/${m.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("request_failed");
      const next = items.filter((item) => item.id !== m.id);
      setItems(next);
      if (lightbox != null) setLightbox(next.length ? Math.min(lightbox, next.length - 1) : null);
      setTotal((t) => t - 1);
      loadSide();
    } catch {
      notifyError("No se pudo borrar el archivo.");
    }
  };

  const handleSendNow = async () => {
    const ok = await confirmAction({
      title: "¿Enviar lote ahora?",
      text:
        "Se arma un zip con todas las fotos y videos que hay en el servidor, se sube a la nube y les llega un mail con el link (vale 30 días). Después se borran del servidor para liberar espacio.",
      confirmText: "Sí, enviar",
    });
    if (!ok) return;
    setSending(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/media/batches`, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "No se pudo iniciar el envío.");
      notifySuccess("Se está armando el lote. Cuando termine les llega el mail y lo ven en esta lista.");
      setTimeout(async () => {
        await loadSide();
        setSending(false);
        loadPage(1, true).catch(() => {});
      }, 3000);
    } catch (err) {
      setSending(false);
      notifyError(err.message);
    }
  };

  const canSend = (stats?.photo_count || 0) + (stats?.video_count || 0) > 0 && !processing;

  return (
    <div>
      <StorageCard stats={stats} error={statsError} />

      <div className="flex flex-wrap gap-4 mb-8">
        <StatCard value={stats ? stats.photo_count : "–"} label="Fotos" accent="#B0813F" />
        <StatCard value={stats ? stats.video_count : "–"} label="Videos" accent="#8B6530" />
        <StatCard value={guests.length} label="Invitados" accent="#8B6530" />
        <StatCard value={stats ? stats.archived_count : "–"} label="Ya enviados" accent="#7c9072" />
      </div>

      <BatchesCard batches={batches} onSendNow={handleSendNow} sending={sending || processing} canSend={canSend} />

      <div className="flex flex-wrap items-center gap-3 mb-6">
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

        <select
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          className="font-body text-base rounded-full px-4 py-2.5"
          style={{
            border: "1.5px solid rgba(199,160,99,0.4)",
            background: "rgba(32,48,42,0.6)",
            color: "#F6F1E7",
            fontWeight: 700,
            maxWidth: "100%",
          }}
          aria-label="Filtrar por invitado"
        >
          <option value="">Todos los invitados</option>
          {guests.map((g) => (
            <option key={g.name} value={g.name}>
              {guestLabel(g.name)} ({g.total})
            </option>
          ))}
        </select>

        {!loading && (
          <span className="font-body" style={{ color: "rgba(246,241,231,0.75)", fontSize: 15 }}>
            {total} {total === 1 ? "archivo" : "archivos"}
          </span>
        )}
      </div>

      {loading ? (
        <p className="font-body font-semibold text-xl" style={{ color: "#F6F1E7" }}>Cargando archivos…</p>
      ) : error ? (
        <p className="font-body font-semibold text-xl" style={{ color: "#e08a7d" }}>{error}</p>
      ) : items.length === 0 ? (
        <p className="font-body font-semibold text-xl text-center py-12" style={{ color: "#F6F1E7" }}>
          {stats?.archived_count
            ? "No hay archivos nuevos en el servidor. Los anteriores ya les llegaron por mail."
            : "Todavía no hay archivos en esta categoría."}
        </p>
      ) : (
        <>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(150px, 46%), 1fr))" }}>
            {items.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min((i % PER_PAGE) * 0.02, 0.3), ease: "easeOut" }}
                className="card-gold overflow-hidden"
                style={{ padding: 0 }}
              >
                <button
                  onClick={() => setLightbox(i)}
                  className="block w-full"
                  style={{ position: "relative", aspectRatio: "1 / 1", background: "#20302A", border: "none", padding: 0, cursor: "zoom-in" }}
                  aria-label={`Ver ${m.original_filename}`}
                >
                  <Thumb m={m} />
                  {isVideo(m) && (
                    <span
                      className="flex items-center justify-center"
                      style={{
                        position: "absolute",
                        inset: 0,
                        margin: "auto",
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: "rgba(32,48,42,0.7)",
                        color: "#F6F1E7",
                      }}
                    >
                      <FaPlay size={14} style={{ marginLeft: 3 }} />
                    </span>
                  )}
                </button>
                <div className="flex items-center justify-between gap-1 px-2.5 py-2">
                  <span className="font-body font-semibold truncate" style={{ color: "#20302A", fontSize: 14.5 }} title={guestLabel(m.guest_name)}>
                    {guestLabel(m.guest_name)}
                  </span>
                  <button
                    onClick={() => handleDelete(m)}
                    aria-label="Borrar archivo"
                    style={{ border: "none", background: "transparent", color: "#a13b2e", cursor: "pointer", padding: 4, flexShrink: 0 }}
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {page < lastPage && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="btn-ghost-gold"
                style={{ padding: "12px 28px", fontSize: 17, minHeight: "auto" }}
              >
                {loadingMore ? "Cargando…" : `Cargar más (${total - items.length} restantes)`}
              </button>
            </div>
          )}
        </>
      )}

      <MediaLightbox
        items={items}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={(i) => {
          setLightbox(i);
          // Al llegar al final de lo cargado, traemos la página siguiente.
          if (i >= items.length - 3 && page < lastPage && !loadingMore) loadMore();
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}

function Thumb({ m }) {
  const [failed, setFailed] = useState(false);
  const src = m.thumb_url || (isImage(m) && canDisplayOriginal(m) ? m.url : null);

  if (!src || failed) {
    return (
      <span className="w-full h-full flex items-center justify-center">
        <FaImage className="text-3xl" style={{ color: "#C7A063" }} />
      </span>
    );
  }
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
