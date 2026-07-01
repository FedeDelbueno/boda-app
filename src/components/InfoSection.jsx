import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75 } },
};

const INFO_ITEMS = [
  { label: "Código de vestimenta", value: "Elegante" },
  { label: "Confirmación",         value: "Hasta el 21 de octubre" },
];

const InfoSection = () => {
  return (
    <motion.section
      className="py-12 md:py-20 px-6 md:px-20 text-center"
      style={{ background: "linear-gradient(135deg, #20302A 0%, #2c4438 50%, #20302A 100%)" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.p
        className="font-body uppercase mb-3"
        style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#C7A063" }}
        variants={itemVariants}
      >
        Para tener en cuenta
      </motion.p>

      <motion.h2
        className="font-script mb-2 drop-shadow"
        style={{ color: "#F6F1E7", fontSize: "clamp(2.2rem, 8vw, 4rem)" }}
        variants={itemVariants}
      >
        Detalles que ayudan
      </motion.h2>

      <motion.div
        className="w-24 h-px mx-auto mt-4 mb-10"
        style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }}
        variants={itemVariants}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg mx-auto"
        variants={containerVariants}
      >
        {INFO_ITEMS.map(({ label, value }) => (
          <motion.div key={label} variants={itemVariants}>
            <p
              className="font-body uppercase mb-2"
              style={{ fontSize: "0.66rem", letterSpacing: "0.28em", color: "#C7A063" }}
            >
              {label}
            </p>
            <p
              className="font-script"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                color: "#F6F1E7",
                lineHeight: 1.2,
              }}
            >
              {value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default InfoSection;
