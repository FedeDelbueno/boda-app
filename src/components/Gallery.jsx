import { motion } from "framer-motion";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/luciayagustin1.jpeg",
  "/images/luciayagustin2.jpeg",
  "/images/luciayagustin3.jpeg",
];

const Gallery = () => {
  return (
    <section className="py-12 md:py-20 overflow-hidden relative" style={{ background: '#EFE7D7' }}>

      {/* Encabezado */}
      <div className="text-center mb-8 md:mb-12 px-6">
        <p className="font-body uppercase mb-3" style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#B0813F" }}>
          Mirá nuestros recuerdos
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "#20302A" }}>Nuestra Historia</h2>
        <div className="gold-divider mt-5 max-w-xs" />
        <p className="font-body text-lg mt-5 max-w-xl mx-auto" style={{ color: "#2A2A28" }}>
          Momentos felices que queremos compartir con vos
        </p>
      </div>

      {/* Carrusel horizontal infinito */}
      <div className="overflow-hidden relative mb-16">
        <motion.div
          className="flex gap-6"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...images, ...images].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Foto ${i + 1}`}
              className="w-64 h-64 object-cover rounded-2xl shadow-xl flex-shrink-0"
              style={{ border: '2px solid rgba(176,129,63,0.3)' }}
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Sección de agradecimiento */}
      <div
        className="mx-4 md:mx-20 rounded-3xl py-10 md:py-14 px-5 md:px-16 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #20302A 0%, #2c4438 50%, #20302A 100%)",
          border: "1px solid rgba(176,129,63,0.25)",
        }}
      >
        <p className="font-body uppercase mb-4" style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#C7A063" }}>
          Con todo nuestro amor
        </p>
        <h3
          className="font-script mb-4 drop-shadow"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: "#F6F1E7" }}
        >
          ¡Gracias por acompañarnos!
        </h3>
        <div className="w-16 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #B0813F, transparent)' }} />
        <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(246,241,231,0.82)" }}>
          Cada sonrisa, cada abrazo y cada recuerdo compartido hace que nuestro día sea aún más especial.
        </p>
      </div>
    </section>
  );
};

export default Gallery;
