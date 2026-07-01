import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

// Reemplazá con el link real de tu carpeta de Google Drive / álbum compartido
const DRIVE_URL = "https://drive.google.com/drive/folders/REEMPLAZAR_CON_LINK_REAL";

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
        Compartí tus fotos
      </h2>

      <div className="w-24 h-px" style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }} />

      {/* Descripción */}
      <p className="font-body text-xl md:text-2xl max-w-xl leading-relaxed" style={{ color: "rgba(246,241,231,0.82)" }}>
        Escaneá el código y subí las fotos y videos que saques durante la fiesta.
        ¡Queremos verlo todo desde tus ojos!
      </p>

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
        Apuntá la cámara de tu celular al código y subí tus fotos y videos
      </p>
    </motion.section>
  );
};

export default DrivePhotoSection;
