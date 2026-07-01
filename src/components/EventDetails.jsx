import { motion } from "framer-motion";
import { FaRing, FaGlassCheers, FaMapMarkerAlt } from "react-icons/fa";

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
    <section id="evento" className="relative py-12 md:py-20 px-6 md:px-20 overflow-hidden" style={{ background: "#F6F1E7" }}>

      <img src="/images/lavender.png" className="absolute top-0 right-0 w-32 md:w-52 opacity-[0.15] pointer-events-none" alt="" />
      <img src="/images/lavender.png" className="absolute bottom-0 left-0 w-32 md:w-52 opacity-[0.15] pointer-events-none scale-x-[-1]" alt="" />

      <motion.div
        className="text-center mb-8 md:mb-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          className="font-body uppercase mb-3"
          style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#B0813F" }}
          variants={itemVariants}
        >
          El gran día
        </motion.p>
        <motion.h2
          className="font-script drop-shadow"
          style={{ color: "#20302A", fontSize: "clamp(2.2rem, 8vw, 4rem)" }}
          variants={itemVariants}
        >
          ¿Cuándo y dónde?
        </motion.h2>
        <motion.p
          className="font-body mt-3 max-w-md mx-auto"
          style={{ color: "#5a5a52", fontSize: "1.05rem" }}
          variants={itemVariants}
        >
          Ceremonia y fiesta, todo en el mismo lugar. Reservá la fecha y vení a celebrar con nosotros.
        </motion.p>
        <motion.div className="gold-divider mt-5 max-w-xs" variants={itemVariants} />
      </motion.div>

      <motion.div
        className="max-w-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="card-gold p-8 md:p-12 flex flex-col items-center text-center gap-8"
          variants={itemVariants}
        >
          {/* Lugar */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg, #C7A063, #B0813F)" }}
            >
              <FaMapMarkerAlt className="text-3xl" style={{ color: "#F6F1E7" }} />
            </div>
            <h3 className="font-serif text-3xl font-bold" style={{ color: "#20302A" }}>El lugar</h3>
            <div className="w-10 h-px" style={{ background: "#B0813F" }} />
            <p className="font-body text-xl leading-relaxed" style={{ color: "#2A2A28" }}>
              Calle 425 entre 206 y 216<br />
              <strong>Arturo Seguí</strong>
            </p>
            <a
              href="https://www.google.com/maps/place/34%C2%B055'59.7%22S+58%C2%B009'22.5%22W/@-34.933236,-58.1588349,722m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d-34.933236!4d-58.15626?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-semibold tracking-wide transition-opacity hover:opacity-70 text-lg"
              style={{ color: "#B0813F" }}
            >
              Ver en Google Maps →
            </a>
          </div>

          <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }} />

          {/* Programa */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center gap-5">
              <div
                className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center shadow"
                style={{ background: "linear-gradient(135deg, #C7A063, #B0813F)" }}
              >
                <FaRing className="text-2xl" style={{ color: "#F6F1E7" }} />
              </div>
              <div className="text-left">
                <p className="font-serif text-2xl font-bold" style={{ color: "#20302A" }}>Ceremonia Civil</p>
                <p className="font-body text-xl" style={{ color: "#5a5a52" }}>21 de noviembre · <strong>18:00 hs</strong></p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div
                className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center shadow"
                style={{ background: "linear-gradient(135deg, #C7A063, #B0813F)" }}
              >
                <FaGlassCheers className="text-2xl" style={{ color: "#F6F1E7" }} />
              </div>
              <div className="text-left">
                <p className="font-serif text-2xl font-bold" style={{ color: "#20302A" }}>Fiesta</p>
                <p className="font-body text-xl" style={{ color: "#5a5a52" }}>A continuación · <strong>19:00 hs</strong></p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
