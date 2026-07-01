import { motion } from "framer-motion";
import { FaHeart, FaChevronDown } from "react-icons/fa";

const RSVP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdyNJREO7GgLJ4zIgzSl2RLZT8wcv0kC7lrt0KxrFvHKTZMXA/viewform?usp=publish-editor";

const RSVPSection = () => {
  return (
    <motion.section
      id="rsvp"
      className="relative py-12 md:py-20 px-6 md:px-20 text-center flex flex-col items-center gap-5 md:gap-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F6F1E7 0%, #EFE7D7 50%, #F6F1E7 100%)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            border: "1.5px solid rgba(176,129,63,0.28)",
            top: "50%",
            left: "50%",
          }}
          initial={{ width: 60, height: 60, x: "-50%", y: "-50%", opacity: 0.8 }}
          animate={{ width: 380, height: 380, x: "-50%", y: "-50%", opacity: 0 }}
          transition={{ duration: 3.5, delay: i * 1.15, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="flex items-center gap-2 px-5 py-2 rounded-full z-10"
        style={{
          background: "rgba(255,255,255,0.6)",
          border: "1.5px solid rgba(176,129,63,0.45)",
          boxShadow: "0 2px 12px rgba(176,129,63,0.25)",
        }}
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 2px 12px rgba(176,129,63,0.25)", "0 4px 24px rgba(176,129,63,0.5)", "0 2px 12px rgba(176,129,63,0.25)"] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span>⏰</span>
        <span className="font-body font-semibold text-base tracking-wide" style={{ color: "#20302A" }}>
          Confirmá antes del <strong>21 de octubre</strong>
        </span>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="z-10"
      >
        <FaHeart className="text-5xl" style={{ color: "#B0813F" }} />
      </motion.div>

      <p
        className="font-body uppercase z-10"
        style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#B0813F" }}
      >
        Confirmá tu asistencia
      </p>

      <h2 className="font-script drop-shadow z-10" style={{ color: "#20302A", fontSize: "clamp(2.2rem, 8vw, 4rem)" }}>
        Contanos si venís
      </h2>

      <div
        className="w-24 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }}
      />

      <p className="font-body text-xl md:text-2xl max-w-2xl leading-relaxed z-10" style={{ color: "#2A2A28" }}>
        Nos encantaría tenerte. Por favor confirmá tu asistencia antes del <strong>21 de octubre</strong>.
        Por cuestiones de organización quien no confirme antes de esa fecha no podrá ser incluido después.
        ¡Gracias por comprendernos!
      </p>

      <div className="flex gap-3 z-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 0.85, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaChevronDown className="text-lg" style={{ color: "#B0813F" }} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.a
          href={RSVP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold text-lg md:text-xl px-10 md:px-14 py-4 font-bold"
          animate={{
            scale: [1, 1.07, 1],
            boxShadow: [
              "0 4px 20px rgba(176,129,63,0.4)",
              "0 10px 50px rgba(176,129,63,0.85)",
              "0 4px 20px rgba(176,129,63,0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          ¡Confirmar asistencia!
        </motion.a>

        <p className="font-body italic text-base z-10" style={{ color: "#8B6530" }}>
          ¡Va a ser una noche que no vas a olvidar! ✨
        </p>
      </div>
    </motion.section>
  );
};

export default RSVPSection;
