import { useState } from "react";
import { motion } from "framer-motion";
import { FaGift } from "react-icons/fa";

const ALIAS = "AGUSYLUCASAMIENTO";

const GiftSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ALIAS)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => alert("Alias: " + ALIAS));
  };

  return (
    <section
      id="regalos"
      className="relative py-10 md:py-16 px-6 md:px-20 text-center flex flex-col items-center gap-4 overflow-hidden"
      style={{ background: '#F6F1E7' }}
    >
      <img
        src="/images/lavender.png"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-32 md:w-48 opacity-20 pointer-events-none"
        alt=""
      />
      <img
        src="/images/lavender.png"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-32 md:w-48 opacity-20 pointer-events-none scale-x-[-1]"
        alt=""
      />

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-md z-10"
        style={{ background: 'linear-gradient(135deg, #C7A063, #B0813F)' }}
      >
        <FaGift className="text-2xl" style={{ color: "#F6F1E7" }} />
      </div>

      <p
        className="font-body uppercase z-10"
        style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#B0813F" }}
      >
        Regalos
      </p>

      <h2
        className="font-script z-10 drop-shadow"
        style={{ color: '#20302A', fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}
      >
        Si querés hacernos un regalo
      </h2>

      <div className="w-24 h-px z-10" style={{ background: 'linear-gradient(90deg, transparent, #B0813F, transparent)' }} />

      <p className="font-body text-xl md:text-2xl max-w-xl tracking-wide z-10 leading-relaxed" style={{ color: '#2A2A28' }}>
        Lo más importante es que nos acompañes. Si además querés colaborar,
        te dejamos los datos para una transferencia. ¡Gracias de corazón!
      </p>

      <div className="flex flex-col sm:flex-row gap-3 z-10">
        <motion.button
          className="btn-gold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
        >
          {copied ? "¡Alias copiado! ✓" : "Copiar Alias"}
        </motion.button>

        <motion.button
          className="btn-ghost-gold"
          style={{ color: "#20302A", border: "1.5px solid rgba(176,129,63,0.5)", background: "rgba(176,129,63,0.08)" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
        >
          Ver datos bancarios
        </motion.button>
      </div>

      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
            style={{
              background: "linear-gradient(135deg, #F6F1E7 0%, #EFE7D7 60%, #F6F1E7 100%)",
              border: "1px solid rgba(176,129,63,0.4)",
            }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-xl font-bold transition-opacity hover:opacity-60"
              style={{ color: "#B0813F" }}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-serif text-3xl font-bold text-center mb-2" style={{ color: "#20302A" }}>Datos Bancarios</h3>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #B0813F, transparent)' }} />

            <div className="text-left space-y-5">
              <div>
                <p className="font-body text-sm uppercase tracking-widest mb-1" style={{ color: "#B0813F" }}>CBU</p>
                <p className="font-body text-xl font-semibold tracking-wider" style={{ color: "#20302A" }}>0140068701501505871962</p>
              </div>
              <div className="w-full h-px" style={{ background: "rgba(176,129,63,0.3)" }} />
              <div>
                <p className="font-body text-sm uppercase tracking-widest mb-1" style={{ color: "#B0813F" }}>Alias</p>
                <p className="font-body text-xl font-semibold tracking-wider" style={{ color: "#20302A" }}>AGUSYLUCASAMIENTO</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default GiftSection;
