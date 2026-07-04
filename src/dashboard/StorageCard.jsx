import { useEffect, useState } from "react";
import { FaServer } from "react-icons/fa";
import { authFetch } from "../auth/authService";
import { API_BASE_URL } from "../config";
import TiltCard from "../components/TiltCard";

const formatGB = (bytes) => (bytes / 1024 ** 3).toFixed(1);

export default function StorageCard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/api/media/storage-stats`);
        if (!res.ok) throw new Error("request_failed");
        const data = await res.json();
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setError("No se pudo cargar el uso de disco del servidor.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="font-body font-semibold text-base mb-6" style={{ color: "#e08a7d" }}>
        {error}
      </p>
    );
  }

  if (!stats) return null;

  const pct = stats.disk_used_percent;
  const barColor = pct >= 90 ? "#c0392b" : pct >= 75 ? "#B0813F" : "#7c9072";

  return (
    <TiltCard className="card-gold mb-6" style={{ padding: "20px 24px" }} maxTilt={3}>
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <span
          className="font-body font-bold flex items-center gap-2"
          style={{ color: "#20302A", fontSize: 15 }}
        >
          <FaServer /> Espacio en el servidor (droplet DigitalOcean)
        </span>
        <span className="font-body font-semibold" style={{ color: "#6b4423", fontSize: 14 }}>
          {formatGB(stats.disk_used_bytes)} GB de {formatGB(stats.disk_total_bytes)} GB · {pct}%
        </span>
      </div>

      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: "rgba(176,129,63,0.15)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(pct, 100)}%`,
            background: barColor,
            borderRadius: 999,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
        <span className="font-body" style={{ color: "#6b4423", fontSize: 13 }}>
          {formatGB(stats.media_bytes)} GB en fotos/videos subidos ({stats.photo_count} fotos ·{" "}
          {stats.video_count} videos)
        </span>
        {pct >= 80 && (
          <span className="font-body font-bold" style={{ color: "#c0392b", fontSize: 13 }}>
            ⚠ Queda poco espacio libre en el servidor
          </span>
        )}
      </div>
    </TiltCard>
  );
}
