import { motion } from "framer-motion";
import { FaMusic } from "react-icons/fa";

const SongsSection = () => {
  return (
    <motion.section
      id="musica"
      className="relative py-12 md:py-20 px-6 md:px-20 text-center flex flex-col items-center gap-5 md:gap-6 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ background: "#EFE7D7" }}
    >
      <img src="/images/lavender.png" className="absolute top-1/2 -translate-y-1/2 left-0 w-28 md:w-44 opacity-[0.15] pointer-events-none scale-x-[-1]" alt="" />
      <img src="/images/lavender.png" className="absolute top-1/2 -translate-y-1/2 right-0 w-28 md:w-44 opacity-[0.15] pointer-events-none" alt="" />

      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
        style={{ background: 'linear-gradient(135deg, #C7A063, #B0813F)' }}
      >
        <FaMusic className="text-xl" style={{ color: "#F6F1E7" }} />
      </div>

      <p
        className="font-body uppercase"
        style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#B0813F" }}
      >
        Música
      </p>

      <h2 className="font-script drop-shadow" style={{ color: "#20302A", fontSize: "clamp(2.2rem, 8vw, 4rem)" }}>
        ¿Qué tema no puede faltar?
      </h2>

      <div className="w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, #B0813F, transparent)' }} />

      <p className="font-body text-xl md:text-2xl max-w-2xl leading-relaxed" style={{ color: "#4a4a44" }}>
        Ayudanos a armar la playlist de la fiesta. Sumá las canciones que
        quieras escuchar y bailar con nosotros.
      </p>

      <motion.a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfwShrV1yQcE4sIoonvcv2rjqSrOsVs5LHeSO-spjRPc8-VfQ/viewform?usp=publish-editor"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Agregar canción a la playlist
      </motion.a>
    </motion.section>
  );
};

export default SongsSection;
