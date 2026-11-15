import { motion } from "framer-motion";
import { FaDownload, FaPaperPlane } from "react-icons/fa";
import TiltCard from "../components/TiltCard";
import { formatBytes, formatDate } from "./mediaUtils";

const STATUS = {
  processing: { label: "Armando zip…", color: "#B0813F" },
  sent: { label: "Enviado", color: "#2f6b3f" },
  failed: { label: "Falló (se reintenta solo)", color: "#a13b2e" },
  expired: { label: "Vencido", color: "#888" },
  pending: { label: "En cola", color: "#B0813F" },
};

export default function BatchesCard({ batches, onSendNow, sending, canSend }) {
  return (
    <TiltCard className="card-gold mb-8" style={{ padding: "20px 24px" }} maxTilt={2}>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div>
          <h3 className="font-serif font-bold" style={{ color: "#20302A", fontSize: 20 }}>
            Lotes enviados por mail
          </h3>
          <p className="font-body" style={{ color: "#6b4423", fontSize: 14 }}>
            Cada lote es un zip guardado en la nube. Los links duran 30 días: bájenlos antes de que venzan.
          </p>
        </div>
        <motion.button
          onClick={onSendNow}
          disabled={sending || !canSend}
          className="btn-gold flex items-center gap-2"
          style={{ padding: "11px 22px", fontSize: 16, minHeight: "auto", opacity: sending || !canSend ? 0.55 : 1 }}
          whileHover={sending || !canSend ? {} : { y: -2, scale: 1.03 }}
          whileTap={sending || !canSend ? {} : { scale: 0.96 }}
        >
          <FaPaperPlane /> {sending ? "Enviando…" : "Enviar lote ahora"}
        </motion.button>
      </div>

      {batches.length === 0 ? (
        <p className="font-body" style={{ color: "#6b4423", fontSize: 15 }}>
          Todavía no se envió ningún lote.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {batches.map((b) => {
            const st = STATUS[b.status] || STATUS.pending;
            return (
              <li
                key={b.id}
                className="flex items-center justify-between gap-3 flex-wrap"
                style={{ borderTop: "1px solid rgba(176,129,63,0.18)", paddingTop: 8 }}
              >
                <div className="font-body" style={{ color: "#20302A", fontSize: 15 }}>
                  <strong>Lote #{b.id}</strong>{" "}
                  <span style={{ color: st.color, fontWeight: 700 }}>· {st.label}</span>
                  <div style={{ color: "#6b4423", fontSize: 13.5 }}>
                    {formatDate(b.sent_at || b.created_at)}
                    {b.file_count > 0 && ` · ${b.file_count} archivos · ${formatBytes(b.size_bytes)}`}
                    {b.trigger === "auto" ? " · automático" : " · manual"}
                    {b.status === "sent" && b.expires_at && ` · vence ${formatDate(b.expires_at)}`}
                  </div>
                  {b.error && b.status !== "sent" && (
                    <div style={{ color: "#a13b2e", fontSize: 13 }}>{b.error}</div>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {b.links.map((l) => (
                    <a
                      key={l.part}
                      href={l.url}
                      className="font-body flex items-center gap-1"
                      style={{ color: "#B0813F", fontWeight: 700, fontSize: 15 }}
                    >
                      <FaDownload size={12} /> {b.links.length > 1 ? `Parte ${l.part}` : "Bajar zip"}
                    </a>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </TiltCard>
  );
}
