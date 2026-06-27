import { motion } from "framer-motion";
import { FaMusic } from "react-icons/fa";

const SongsSection = () => {
  return (
    <motion.section
      className="relative py-12 md:py-20 px-6 md:px-20 text-center flex flex-col items-center gap-5 md:gap-6 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ background: "#FAF3E0" }}
    >
      {/* Lavenders decorativos */}
      <img src="/images/lavender.png" className="absolute top-1/2 -translate-y-1/2 left-0 w-28 md:w-44 opacity-[0.18] pointer-events-none scale-x-[-1]" alt="" />
      <img src="/images/lavender.png" className="absolute top-1/2 -translate-y-1/2 right-0 w-28 md:w-44 opacity-[0.18] pointer-events-none" alt="" />

      {/* Icono */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
        style={{ background: 'linear-gradient(135deg, #FDE68A, #D4AF37)' }}
      >
        <FaMusic className="text-xl text-amber-900" />
      </div>

      <p className="section-label text-amber-700">— Armemos la playlist juntos —</p>

      {/* Título */}
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900 drop-shadow-sm">
        ¿Qué canciones no pueden faltar?
      </h2>

      <div className="w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      {/* Descripción */}
      <p className="font-body text-lg md:text-xl max-w-2xl text-amber-800 leading-relaxed">
        ¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar en la fiesta!
      </p>

      {/* Botón */}
      <motion.a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfwShrV1yQcE4sIoonvcv2rjqSrOsVs5LHeSO-spjRPc8-VfQ/viewform?usp=publish-editor"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Sugerir canción
      </motion.a>
    </motion.section>
  );
};

export default SongsSection;
