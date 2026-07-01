import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75 } },
};

// Fotos 1600x1200 → landscape 4:3
const photos = [
  "/images/luciayagustin1.jpeg",
  "/images/luciayagustin2.jpeg",
  "/images/luciayagustin3.jpeg",
];

const WelcomeSection = () => {
  return (
    <motion.section
      id="historia"
      className="pt-12 md:pt-20 pb-0 text-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #20302A 0%, #2c4438 50%, #20302A 100%)" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ── Texto de bienvenida ── */}
      <div className="px-6 md:px-20">
        <motion.p
          className="font-body uppercase mb-3"
          style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#C7A063" }}
          variants={itemVariants}
        >
          Nos casamos
        </motion.p>

        <motion.h2
          className="font-script mb-2 drop-shadow-lg"
          style={{
            fontSize: "clamp(3rem, 12vw, 6.5rem)",
            color: "#F6F1E7",
            lineHeight: 1.1,
            textShadow: "0 4px 24px rgba(199,160,99,0.25)",
          }}
          variants={itemVariants}
        >
          ¡Bienvenidos!
        </motion.h2>

        <motion.div
          className="w-20 h-px mx-auto mb-6"
          style={{ background: "linear-gradient(90deg, transparent, #C7A063, transparent)" }}
          variants={itemVariants}
        />

        <motion.p
          className="font-body uppercase mb-4"
          style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "rgba(199,160,99,0.65)" }}
          variants={itemVariants}
        >
          Nuestra historia
        </motion.p>

        <motion.p
          className="mx-auto mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            color: "#F6F1E7",
            lineHeight: 1.45,
            maxWidth: "32ch",
          }}
          variants={itemVariants}
        >
          Elegimos decir "sí" rodeados de las personas que forman parte de nuestra historia.
        </motion.p>

        <motion.div
          className="w-16 h-px mx-auto mb-6"
          style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }}
          variants={itemVariants}
        />

        <motion.p
          className="font-body max-w-xl mx-auto leading-relaxed mb-10"
          style={{ color: "rgba(246,241,231,0.65)", fontSize: "1.05rem" }}
          variants={itemVariants}
        >
          Gracias por compartir con nosotros este día tan especial.
        </motion.p>
      </div>

      {/* ── Carrusel automático landscape ── */}
      <motion.div
        className="relative w-full overflow-hidden mb-12"
        variants={itemVariants}
      >
        {/* Fades laterales */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: "100px", background: "linear-gradient(to right, #20302A, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: "100px", background: "linear-gradient(to left, #20302A, transparent)" }}
        />

        <motion.div
          className="flex"
          style={{ gap: "20px", width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...photos, ...photos].map((src, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl"
              style={{
                // 4:3 landscape — ancho generoso en mobile
                width: "clamp(280px, 55vw, 520px)",
                aspectRatio: "4 / 3",
                border: "1.5px solid rgba(199,160,99,0.3)",
              }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={src}
                alt={`Lucía y Agustín ${(i % photos.length) + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Card de agradecimiento (de Gallery) ── */}
      <motion.div
        className="mx-4 md:mx-20 mb-0 rounded-t-3xl py-10 md:py-14 px-5 md:px-16 text-center"
        style={{
          background: "rgba(0,0,0,0.2)",
          borderTop: "1px solid rgba(199,160,99,0.2)",
          borderLeft: "1px solid rgba(199,160,99,0.15)",
          borderRight: "1px solid rgba(199,160,99,0.15)",
        }}
        variants={itemVariants}
      >
        <p className="font-body uppercase mb-4" style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#C7A063" }}>
          Con todo nuestro amor
        </p>
        <h3
          className="font-script mb-4 drop-shadow"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#F6F1E7" }}
        >
          ¡Gracias por acompañarnos!
        </h3>
        <div className="w-16 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }} />
        <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(246,241,231,0.72)" }}>
          Cada sonrisa, cada abrazo y cada recuerdo compartido hace que nuestro día sea aún más especial.
        </p>

        <motion.p
          className="font-script mt-8 drop-shadow"
          style={{ color: "#C7A063", fontSize: "clamp(2.5rem, 7vw, 4rem)" }}
        >
          Lucía &amp; Agustín
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default WelcomeSection;
