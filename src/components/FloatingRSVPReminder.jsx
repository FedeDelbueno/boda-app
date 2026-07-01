import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RSVP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScmPzheLlAbxh9m6CUp-oqzpcTSWjQZCTRZ_M51sCM_xacFEw/viewform?usp=publish-editor";

const FloatingRSVPReminder = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      const rsvp = document.getElementById("rsvp");
      if (!rsvp) return;
      const pastRSVP = rsvp.getBoundingClientRect().bottom < 0;
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nearEnd = total > 0 && scrollY / total > 0.91;
      setVisible(pastRSVP && !nearEnd);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-20 left-3 right-3 z-40 flex justify-center"
          initial={{ y: 90, opacity: 0, scale: 0.88 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 90, opacity: 0, scale: 0.88 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          <motion.div
            className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
            style={{ border: "1.5px solid rgba(199,160,99,0.5)" }}
            animate={{
              boxShadow: [
                "0 8px 30px rgba(32,48,42,0.35)",
                "0 10px 50px rgba(32,48,42,0.6)",
                "0 8px 30px rgba(32,48,42,0.35)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div
              className="px-4 py-3 flex items-center justify-between gap-2"
              style={{
                background: "linear-gradient(135deg, #20302A 0%, #2c4438 60%, #20302A 100%)",
              }}
            >
              {/* Texto */}
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-sm leading-tight" style={{ color: "#F6F1E7" }}>
                  ¡No olvides confirmar tu asistencia!
                </p>
                <p className="font-body text-xs mt-0.5" style={{ color: "#C7A063" }}>
                  Antes del 01/10/2026
                </p>
              </div>

              {/* Botón */}
              <motion.a
                href={RSVP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-bold text-sm px-3 py-2 rounded-xl whitespace-nowrap flex-shrink-0"
                style={{
                  background: "rgba(199,160,99,0.25)",
                  border: "1px solid rgba(199,160,99,0.6)",
                  color: "#F6F1E7",
                }}
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.93 }}
              >
                Confirmar →
              </motion.a>

              {/* Cerrar */}
              <button
                className="text-sm leading-none flex-shrink-0 ml-1 transition-opacity hover:opacity-70"
                style={{ color: "#C7A063" }}
                onClick={() => setDismissed(true)}
                aria-label="Cerrar recordatorio"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingRSVPReminder;
