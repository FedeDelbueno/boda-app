import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

// Reemplazá SITE_URL por el dominio real donde quede publicado el sitio
// (ej: "https://lucia-y-agustin.com"). En desarrollo local podés dejar
// window.location.origin, que ya apunta a tu localhost.
const SITE_URL = window.location.origin;
const DRIVE_URL = `${SITE_URL}/subir-fotos.html`;

const DrivePhotoSection = () => {
  return (
    <motion.section
      id="fotos"
      className="relative py-12 md:py-20 px-6 md:px-20 text-center flex flex-col items-center gap-6 overflow-hidden"
      style={{ background: "#20302A" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Lavenders decorativos */}
      <img src="/images/lavender.png" className="absolute top-1/2 -translate-y-1/2 left-0 w-28 md:w-44 opacity-[0.08] pointer-events-none scale-x-[-1]" alt="" />
      <img src="/images/lavender.png" className="absolute top-1/2 -translate-y-1/2 right-0 w-28 md:w-44 opacity-[0.08] pointer-events-none" alt="" />

      {/* Icono */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
        style={{ background: "linear-gradient(135deg, #C7A063, #B0813F)" }}
      >
        <FaCamera className="text-xl" style={{ color: "#F6F1E7" }} />
      </div>

      {/* Eyebrow */}
      <p
        className="font-body uppercase"
        style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#C7A063" }}
      >
        Fotos
      </p>

      {/* Título */}
      <h2 className="font-script drop-shadow" style={{ color: "#F6F1E7", fontSize: "clamp(2.2rem, 8vw, 4rem)" }}>
        ¡Revivamos la fiesta!
      </h2>

      <div className="w-24 h-px" style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }} />

      {/* Descripción */}
      <p className="font-body text-xl md:text-2xl max-w-xl leading-relaxed" style={{ color: "rgba(246,241,231,0.82)" }}>
        Gracias por ser parte de nuestro día. Si sacaste fotos o videos,
        subilos acá: queremos revivir la fiesta desde tus ojos.
      </p>

      {/* Botón directo (desde el celu no se puede escanear el QR de la misma pantalla) */}
      <a
        href={DRIVE_URL}
        className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-body uppercase shadow-lg transition-transform hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #C7A063, #B0813F)",
          color: "#F6F1E7",
          letterSpacing: "0.22em",
          fontSize: "0.9rem",
          textDecoration: "none",
        }}
      >
        <FaCamera /> Subir fotos y videos
      </a>

      {/* QR */}
      <div className="bg-white rounded-2xl p-5 shadow-2xl">
        <QRCodeSVG
          value={DRIVE_URL}
          size={190}
          bgColor="#ffffff"
          fgColor="#20302A"
          level="M"
        />
      </div>

      {/* Instrucción */}
      <p
        className="font-body italic max-w-[260px] leading-relaxed"
        style={{ color: "rgba(246,241,231,0.55)", fontSize: "0.9rem" }}
      >
        ¿Estás en la compu? Escaneá el código con el celular y subí lo que tengas en la galería
      </p>
    </motion.section>
  );
};

export default DrivePhotoSection;
