import { motion } from "framer-motion";
import Countdown from "./Countdown";
import DownArrow from "./DownArrow";
import FloatingPetals from "./FloatingPetals";
import AnimatedPineBackground from "./AnimatedPineBackground";

const Hero = () => {
  const weddingDate = new Date("2026-11-21T18:00:00");

  const item = (delay) => ({
    initial: { opacity: 0, y: 22, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: "easeOut" },
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-24 pb-20">

      {/* Fondo pino oscuro animado */}
      <AnimatedPineBackground />

      <FloatingPetals />

      <motion.img
        src="/images/lavender_dorado.png"
        className="absolute top-0 left-0 w-44 md:w-72 pointer-events-none scale-x-[-1]"
        style={{ opacity: 0.42, filter: "brightness(1.4)", transformOrigin: "top center" }}
        animate={{ rotate: [-3, 2, -3], y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        alt=""
      />
      <motion.img
        src="/images/lavender_dorado.png"
        className="absolute bottom-0 right-0 w-44 md:w-72 pointer-events-none"
        style={{ opacity: 0.42, filter: "brightness(1.4)", transformOrigin: "bottom center" }}
        animate={{ rotate: [2, -3, 2], y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        alt=""
      />

      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 480,
          maxHeight: 480,
          background: "radial-gradient(circle, rgba(124,144,114,0.12), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-20 text-center px-2 w-full max-w-3xl">

        <motion.p
          className="font-body text-base mb-4 uppercase"
          style={{ letterSpacing: "0.42em", color: "#C7A063" }}
          {...item(0.2)}
        >
          Nos casamos
        </motion.p>

        <motion.h1
          className="font-script leading-[1.15] mb-0"
          style={{
            fontSize: "clamp(3rem, 13vw, 8rem)",
            color: "#F6F1E7",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
          {...item(0.45)}
        >
          Lucía Navarro
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-3 my-1"
          {...item(0.65)}
        >
          <div
            className="flex-1 max-w-[70px]"
            style={{ height: "1px", background: "linear-gradient(90deg, transparent, #B0813F)" }}
          />
          <span className="font-body italic text-2xl md:text-3xl" style={{ color: "#C7A063" }}>
            &amp;
          </span>
          <div
            className="flex-1 max-w-[70px]"
            style={{ height: "1px", background: "linear-gradient(90deg, #B0813F, transparent)" }}
          />
        </motion.div>

        <motion.h1
          className="font-script leading-[1.15] mb-4"
          style={{
            fontSize: "clamp(3rem, 13vw, 8rem)",
            color: "#F6F1E7",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
          {...item(0.85)}
        >
          Agustín Delbueno
        </motion.h1>

        <motion.p
          className="font-body font-light text-lg md:text-xl mb-1"
          style={{ letterSpacing: "0.02em", color: "#F6F1E7", fontStyle: "italic" }}
          {...item(1.0)}
        >
          Sábado 21 de noviembre de 2026
        </motion.p>

        <motion.p
          className="font-body text-base uppercase mb-6"
          style={{ letterSpacing: "0.28em", color: "rgba(246,241,231,0.6)" }}
          {...item(1.1)}
        >
          Arturo Seguí · Buenos Aires
        </motion.p>

        <motion.p
          className="font-body italic mb-6 mx-auto"
          style={{
            color: "rgba(246,241,231,0.78)",
            fontSize: "clamp(1.05rem, 2.8vw, 1.25rem)",
            maxWidth: "24ch",
            lineHeight: 1.55,
          }}
          {...item(1.2)}
        >
          Hay momentos que merecen ser compartidos.
        </motion.p>

        <motion.div {...item(1.35)}>
          <Countdown targetDate={weddingDate} />
        </motion.div>
      </div>

      <DownArrow />

      {/* Vignette lateral inferior — oscuro, no blanco */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to top, rgba(23,36,32,0.65), transparent)",
          zIndex: 5,
        }}
      />
    </section>
  );
};

export default Hero;
