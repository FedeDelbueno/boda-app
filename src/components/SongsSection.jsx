import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic, FaChevronDown } from "react-icons/fa";
import { API_BASE_URL } from "../config";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1.5px solid rgba(176,129,63,0.35)",
  background: "#fff",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 17,
  color: "#20302A",
};

const SongsSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [temaInterprete, setTemaInterprete] = useState("");
  const [nombre, setNombre] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!temaInterprete.trim() || !nombre.trim()) {
      setError("Completá el tema/intérprete y tu nombre.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tema_interprete: temaInterprete.trim(),
          nombre: nombre.trim(),
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setSubmitted(true);
      setTemaInterprete("");
    } catch (err) {
      setError("No se pudo enviar. Revisá tu conexión y probá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

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

      <div className="w-full max-w-xl flex flex-col items-center gap-3">
        <motion.button
          onClick={() => setFormOpen((o) => !o)}
          className="font-body font-semibold text-lg px-9 py-3.5 rounded-full flex items-center gap-2.5"
          style={{
            background: "linear-gradient(135deg, #C7A063, #B0813F)",
            color: "#F6F1E7",
            boxShadow: "0 6px 20px rgba(176,129,63,0.4)",
          }}
          whileTap={{ scale: 0.96 }}
          aria-expanded={formOpen}
        >
          Ver formulario
          <motion.span
            animate={{ rotate: formOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex"
          >
            <FaChevronDown />
          </motion.span>
        </motion.button>

        <AnimatePresence initial={false}>
          {formOpen && (
            <motion.div
              key="songs-form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full overflow-hidden flex flex-col items-center gap-3"
            >
              <div
                className="w-full rounded-2xl overflow-hidden text-left"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(176,129,63,0.35)",
                  boxShadow: "0 10px 40px rgba(32,48,42,0.12)",
                  padding: "28px 24px",
                }}
              >
                {submitted ? (
                  <div className="text-center py-6">
                    <p className="text-4xl mb-2">🎶</p>
                    <p className="font-body text-lg" style={{ color: "#20302A" }}>
                      ¡Gracias! La sumamos a la playlist.
                    </p>
                    <button
                      type="button"
                      className="font-body text-sm underline mt-3"
                      style={{ color: "#8B6530" }}
                      onClick={() => setSubmitted(false)}
                    >
                      Sugerir otra canción
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="font-body text-sm block mb-1" style={{ color: "#8B6530" }}>
                        Tema / intérprete
                      </label>
                      <input
                        type="text"
                        style={inputStyle}
                        value={temaInterprete}
                        onChange={(e) => setTemaInterprete(e.target.value)}
                        placeholder="Ej: Bad Bunny - Titi Me Preguntó"
                      />
                    </div>

                    <div>
                      <label className="font-body text-sm block mb-1" style={{ color: "#8B6530" }}>
                        Tu nombre
                      </label>
                      <input
                        type="text"
                        style={inputStyle}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="¿Quién la sugiere?"
                      />
                    </div>

                    {error && (
                      <p className="font-body text-sm" style={{ color: "#a13b2e" }}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="font-body font-semibold text-lg py-3 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #C7A063, #B0813F)",
                        color: "#F6F1E7",
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      {submitting ? "Enviando…" : "Agregar a la playlist"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SongsSection;
