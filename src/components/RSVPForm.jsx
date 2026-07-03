import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { API_BASE_URL } from "../config";

const RESTRICCIONES = [
  { value: "sin_restricciones", label: "Sin restricciones" },
  { value: "vegetariano", label: "Vegetariano/a" },
  { value: "vegano", label: "Vegano/a" },
  { value: "celiaco", label: "Celíaco/a (sin gluten)" },
  { value: "lactosa", label: "Intolerante a la lactosa" },
  { value: "diabetico", label: "Diabético/a" },
  { value: "otros", label: "Otros (especificar)" },
];

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

const RSVPSection = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [nombreApellido, setNombreApellido] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [restriccion, setRestriccion] = useState("");
  const [restriccionOtro, setRestriccionOtro] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreApellido.trim() || !asistencia) {
      setError("Completá tu nombre y confirmá si venís o no.");
      return;
    }
    if (asistencia === "si" && !restriccion) {
      setError("Contanos si tenés alguna restricción alimenticia (o elegí \"Sin restricciones\").");
      return;
    }
    if (restriccion === "otros" && !restriccionOtro.trim()) {
      setError("Contanos cuál es tu restricción alimenticia.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_apellido: nombreApellido.trim(),
          asistencia,
          restriccion: restriccion || null,
          restriccion_otro: restriccion === "otros" ? restriccionOtro.trim() : null,
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setSubmitted(true);
    } catch (err) {
      setError("No se pudo enviar. Revisá tu conexión y probá de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="rsvp"
      className="relative py-12 md:py-20 px-6 md:px-20 text-center flex flex-col items-center gap-5 md:gap-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F6F1E7 0%, #EFE7D7 50%, #F6F1E7 100%)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            border: "1.5px solid rgba(176,129,63,0.28)",
            top: "50%",
            left: "50%",
          }}
          initial={{ width: 60, height: 60, x: "-50%", y: "-50%", opacity: 0.8 }}
          animate={{ width: 380, height: 380, x: "-50%", y: "-50%", opacity: 0 }}
          transition={{ duration: 3.5, delay: i * 1.15, repeat: Infinity, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="flex items-center gap-2 px-5 py-2 rounded-full z-10"
        style={{
          background: "rgba(255,255,255,0.6)",
          border: "1.5px solid rgba(176,129,63,0.45)",
          boxShadow: "0 2px 12px rgba(176,129,63,0.25)",
        }}
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 2px 12px rgba(176,129,63,0.25)", "0 4px 24px rgba(176,129,63,0.5)", "0 2px 12px rgba(176,129,63,0.25)"] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <span>⏰</span>
        <span className="font-body font-semibold text-base tracking-wide" style={{ color: "#20302A" }}>
          Confirmá antes del <strong>21 de octubre</strong>
        </span>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="z-10"
      >
        <FaHeart className="text-5xl" style={{ color: "#B0813F" }} />
      </motion.div>

      <p
        className="font-body uppercase z-10"
        style={{ fontSize: "0.72rem", letterSpacing: "0.42em", color: "#B0813F" }}
      >
        Confirmá tu asistencia
      </p>

      <h2 className="font-script drop-shadow z-10" style={{ color: "#20302A", fontSize: "clamp(2.2rem, 8vw, 4rem)" }}>
        Contanos si venís
      </h2>

      <div
        className="w-24 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #B0813F, transparent)" }}
      />

      <p className="font-body text-xl md:text-2xl max-w-2xl leading-relaxed z-10" style={{ color: "#2A2A28" }}>
        Nos encantaría tenerte. Por favor confirmá tu asistencia antes del <strong>21 de octubre</strong>.
        Por cuestiones de organización quien no confirme antes de esa fecha no podrá ser incluido después.
        ¡Gracias por comprendernos!
      </p>

      <div className="flex gap-3 z-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 0.85, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaChevronDown className="text-lg" style={{ color: "#B0813F" }} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-xl">
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
              key="rsvp-form"
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
                  boxShadow: "0 10px 40px rgba(32,48,42,0.15)",
                  padding: "28px 24px",
                }}
              >
                {submitted ? (
                  <div className="text-center py-6">
                    <p className="text-4xl mb-2">💛</p>
                    <p className="font-body text-lg" style={{ color: "#20302A" }}>
                      ¡Gracias por confirmar! Ya quedó registrado.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="font-body text-sm block mb-1" style={{ color: "#8B6530" }}>
                        Nombre y apellido
                      </label>
                      <input
                        type="text"
                        style={inputStyle}
                        value={nombreApellido}
                        onChange={(e) => setNombreApellido(e.target.value)}
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div>
                      <label className="font-body text-sm block mb-1" style={{ color: "#8B6530" }}>
                        Asistencia
                      </label>
                      <div className="flex gap-3">
                        {[
                          { value: "si", label: "Sí, confirmo" },
                          { value: "no", label: "No podré asistir" },
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.value}
                            onClick={() => setAsistencia(opt.value)}
                            className="font-body text-sm px-4 py-2 rounded-full flex-1"
                            style={{
                              border: "1.5px solid rgba(176,129,63,0.5)",
                              background: asistencia === opt.value ? "#B0813F" : "transparent",
                              color: asistencia === opt.value ? "#F6F1E7" : "#20302A",
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {asistencia === "si" && (
                      <div>
                        <label className="font-body text-sm block mb-1" style={{ color: "#8B6530" }}>
                          Restricciones alimenticias *
                        </label>
                        <select
                          style={inputStyle}
                          value={restriccion}
                          onChange={(e) => setRestriccion(e.target.value)}
                        >
                          <option value="">Elegí una opción</option>
                          {RESTRICCIONES.map((r) => (
                            <option key={r.value} value={r.value}>
                              {r.label}
                            </option>
                          ))}
                        </select>
                        {restriccion === "otros" && (
                          <input
                            type="text"
                            style={{ ...inputStyle, marginTop: 10 }}
                            value={restriccionOtro}
                            onChange={(e) => setRestriccionOtro(e.target.value)}
                            placeholder="Contanos cuál"
                          />
                        )}
                      </div>
                    )}

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
                      {submitting ? "Enviando…" : "Confirmar"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="font-body italic text-base z-10" style={{ color: "#8B6530" }}>
          ¡Va a ser una noche que no vas a olvidar! ✨
        </p>
      </div>
    </motion.section>
  );
};

export default RSVPSection;
