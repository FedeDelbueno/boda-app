import { motion } from "framer-motion";
import { FaHashtag, FaInstagram } from "react-icons/fa";

const HashtagSection = () => {
  return (
    <motion.section
      id="fotos"
      className="relative py-12 md:py-20 px-6 md:px-20 text-center flex flex-col items-center gap-5 md:gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ background: "#EFE7D7" }}
    >
      <img
        src="/images/lavender.png"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-40 md:w-48 opacity-20 pointer-events-none scale-x-[-1]"
        alt=""
      />
      <img
        src="/images/lavender.png"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-40 md:w-48 opacity-20 pointer-events-none"
        alt=""
      />

      <div className="flex items-center gap-4 mb-2 z-10">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          style={{ background: 'linear-gradient(135deg, #C7A063, #B0813F)' }}
        >
          <FaHashtag className="text-lg" style={{ color: "#F6F1E7" }} />
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
          style={{ background: 'linear-gradient(135deg, #C7A063, #B0813F)' }}
        >
          <FaInstagram className="text-lg" style={{ color: "#F6F1E7" }} />
        </div>
      </div>

      <p
        className="font-body uppercase z-10"
        style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#B0813F" }}
      >
        Compartí el momento
      </p>

      <h2
        className="font-serif font-bold z-10"
        style={{ color: '#20302A', fontSize: 'clamp(2.4rem, 8vw, 4rem)', letterSpacing: '0.12em' }}
      >
        #LUYAGUS2026
      </h2>

      <div className="w-24 h-px z-10" style={{ background: 'linear-gradient(90deg, transparent, #B0813F, transparent)' }} />

      <p className="font-body text-xl md:text-2xl max-w-2xl leading-relaxed z-10" style={{ color: "#2A2A28" }}>
        ¡Preparate para nuestro gran día!<br />
        Etiquetanos en Instagram con nuestro hashtag en tus fotos, reels o videos.
      </p>

      <motion.a
        href="https://www.instagram.com/explore/tags/lugus2026/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Ver hashtag
      </motion.a>
    </motion.section>
  );
};

export default HashtagSection;
