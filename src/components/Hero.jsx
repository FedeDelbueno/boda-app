import { motion } from "framer-motion";
import Countdown from "./Countdown";
import DownArrow from "./DownArrow";
import FloatingPetals from "./FloatingPetals";

const Hero = () => {
  const weddingDate = new Date("2026-11-25T17:00:00");

  const item = (delay) => ({
    initial: { opacity: 0, y: 22, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: "easeOut" },
  });

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden px-4">

      {/* Fondo con movimiento de color dorado oscuro ↔ crema */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, #FEF9D9, #FEF9D9, #FDE68A, #D4AF37, #FDE68A, #FEF9D9, #FEF9D9)",
          backgroundSize: "400% 400%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Pétalos dorados flotantes */}
      <FloatingPetals />

      {/* Flores decorativas en esquinas */}
      <img
        src="/images/lavender.png"
        className="absolute top-0 left-0 w-28 md:w-48 opacity-[0.15] pointer-events-none scale-x-[-1]"
        alt=""
      />
      <img
        src="/images/lavender.png"
        className="absolute bottom-0 right-0 w-28 md:w-48 opacity-[0.15] pointer-events-none"
        alt=""
      />

      {/* Orbe decorativo central de fondo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 480,
          maxHeight: 480,
          background: "radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contenido principal con stagger de entrada */}
      <div className="relative z-10 text-center px-2 w-full max-w-3xl">

        <motion.p
          className="font-body italic text-xs mb-4 uppercase"
          style={{ letterSpacing: "0.3em", color: "#4A2E00" }}
          {...item(0.2)}
        >
          Con inmensa alegría anunciamos
        </motion.p>

        {/* Nombre 1 — dorado oscuro sobre fondo animado */}
        <motion.h1
          className="font-script leading-[1.15] mb-0"
          style={{
            fontSize: "clamp(2.2rem, 11vw, 7rem)",
            color: "#4A2E00",
            textShadow: "0 2px 8px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.08)",
          }}
          {...item(0.45)}
        >
          Lucia Navarro
        </motion.h1>

        {/* Separador & */}
        <motion.div
          className="flex items-center justify-center gap-3 my-1"
          {...item(0.65)}
        >
          <div
            className="flex-1 max-w-[70px]"
            style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37)" }}
          />
          <span className="font-body italic text-xl md:text-2xl" style={{ color: "#4A2E00" }}>
            &amp;
          </span>
          <div
            className="flex-1 max-w-[70px]"
            style={{ height: "1px", background: "linear-gradient(90deg, #D4AF37, transparent)" }}
          />
        </motion.div>

        {/* Nombre 2 — dorado oscuro sobre fondo animado */}
        <motion.h1
          className="font-script leading-[1.15] mb-4"
          style={{
            fontSize: "clamp(2.2rem, 11vw, 7rem)",
            color: "#4A2E00",
            textShadow: "0 2px 8px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.08)",
          }}
          {...item(0.85)}
        >
          Agustín Delbueno
        </motion.h1>

        <motion.p
          className="font-body text-sm md:text-lg uppercase mb-6"
          style={{ letterSpacing: "0.3em", color: "#4A2E00" }}
          {...item(1.05)}
        >
          25 · Noviembre · 2026
        </motion.p>

        {/* Contador */}
        <motion.div {...item(1.25)}>
          <Countdown targetDate={weddingDate} />
        </motion.div>
      </div>

      <DownArrow />

      {/* Fundido inferior */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #FFFEF9, transparent)" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default Hero;
