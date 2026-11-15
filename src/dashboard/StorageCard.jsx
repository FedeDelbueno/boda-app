import { FaServer } from "react-icons/fa";
import TiltCard from "../components/TiltCard";
import { formatBytes } from "./mediaUtils";

/**
 * Uso del disco del droplet. La marca vertical es el umbral en el que se
 * arma solo un lote (zip → R2 → mail) y se libera espacio.
 */
export default function StorageCard({ stats, error }) {
  if (error) {
    return (
      <p className="font-body font-semibold text-base mb-6" style={{ color: "#e08a7d" }}>
        {error}
      </p>
    );
  }
  if (!stats) return null;

  const pct = stats.disk_used_percent;
  const threshold = stats.archive_threshold_percent;
  const barColor = pct >= 90 ? "#c0392b" : pct >= threshold ? "#B0813F" : "#7c9072";

  return (
    <TiltCard className="card-gold mb-6" style={{ padding: "20px 24px" }} maxTilt={3}>
      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <span className="font-body font-bold flex items-center gap-2" style={{ color: "#20302A", fontSize: 15 }}>
          <FaServer /> Espacio en el servidor
        </span>
        <span className="font-body font-semibold" style={{ color: "#6b4423", fontSize: 14 }}>
          {formatBytes(stats.disk_used_bytes)} de {formatBytes(stats.disk_total_bytes)} · {pct}%
        </span>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ height: 10, borderRadius: 999, background: "rgba(176,129,63,0.15)", overflow: "hidden" }}>
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
        <div
          title={`Al llegar al ${threshold}% se envía un lote automático`}
          style={{
            position: "absolute",
            top: -3,
            bottom: -3,
            left: `${Math.min(threshold, 100)}%`,
            width: 2,
            background: "#20302A",
            opacity: 0.55,
            borderRadius: 2,
          }}
        />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <span className="font-body" style={{ color: "#6b4423", fontSize: 13.5 }}>
          En el servidor: {formatBytes(stats.media_bytes)} ({stats.photo_count} fotos · {stats.video_count} videos)
          {stats.archived_count > 0 && <> · {stats.archived_count} ya enviados por mail</>}
          {stats.uploading_count > 0 && <> · {stats.uploading_count} subiéndose ahora</>}
        </span>
        <span className="font-body" style={{ color: "#6b4423", fontSize: 13.5, opacity: 0.85 }}>
          Al llegar al {threshold}% se arma un zip, se les manda por mail y se libera el espacio automáticamente.
        </span>
      </div>
    </TiltCard>
  );
}
