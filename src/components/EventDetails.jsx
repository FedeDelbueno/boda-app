import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaChurch, FaGlassCheers } from "react-icons/fa";

const TiltCard = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 260,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 260,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="card-gold p-6 md:p-10 flex flex-col items-center text-center cursor-default"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
    >
      {children}
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
};

const EventDetails = () => {
  return (
    <section className="relative py-12 md:py-20 px-6 md:px-20 overflow-hidden" style={{ background: "#FDFAF2" }}>

      {/* Lavenders decorativos */}
      <img src="/images/lavender.png" className="absolute top-0 right-0 w-32 md:w-52 opacity-[0.18] pointer-events-none" alt="" />
      <img src="/images/lavender.png" className="absolute bottom-0 left-0 w-32 md:w-52 opacity-[0.18] pointer-events-none scale-x-[-1]" alt="" />

      {/* Encabezado */}
      <motion.div
        className="text-center mb-8 md:mb-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p className="section-label text-amber-600 mb-3" variants={itemVariants}>
          — Los esperamos el 25 de noviembre —
        </motion.p>
        <motion.h2 className="font-serif text-3xl md:text-4xl font-bold text-amber-900" variants={itemVariants}>
          Detalles del Evento
        </motion.h2>
        <motion.div className="gold-divider mt-5 max-w-xs" variants={itemVariants} />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Ceremonia */}
        <motion.div variants={itemVariants}>
          <TiltCard>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
              style={{ background: "linear-gradient(135deg, #FDE68A, #D4AF37)" }}
            >
              <FaChurch className="text-2xl text-amber-900" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 mb-3">Ceremonia</h3>
            <div className="w-10 h-px mb-5" style={{ background: "#D4AF37" }} />
            <p className="font-body text-lg text-amber-800 mb-1">
              25 de noviembre a las <strong>20:00</strong> horas
            </p>
            <p className="font-body text-lg text-amber-700 mb-7">
              Parroquia Sagrado Corazón de Jesús
            </p>
            <a
              href="https://maps.google.com/?q=Parroquia+Sagrado+Corazon+de+Jesus"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-semibold mt-auto tracking-wide transition-opacity hover:opacity-70"
              style={{ color: "#B8962E" }}
            >
              Ver en Google Maps →
            </a>
          </TiltCard>
        </motion.div>

        {/* Fiesta */}
        <motion.div variants={itemVariants}>
          <TiltCard>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md"
              style={{ background: "linear-gradient(135deg, #FDE68A, #D4AF37)" }}
            >
              <FaGlassCheers className="text-2xl text-amber-900" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 mb-3">Fiesta</h3>
            <div className="w-10 h-px mb-5" style={{ background: "#D4AF37" }} />
            <p className="font-body text-lg text-amber-800 mb-1">
              Después de la ceremonia, a las <strong>21:00</strong> hs
            </p>
            <p className="font-body text-lg text-amber-700 mb-7">
              Asociación Rural General Madariaga
            </p>
            <a
              href="https://maps.google.com/?q=Asociacion+Rural+General+Madariaga"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-semibold mt-auto tracking-wide transition-opacity hover:opacity-70"
              style={{ color: "#B8962E" }}
            >
              Ver en Google Maps →
            </a>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
