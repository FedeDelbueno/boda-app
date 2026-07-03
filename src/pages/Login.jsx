import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import AnimatedPineBackground from "../components/AnimatedPineBackground";
import FloatingPetals from "../components/FloatingPetals";
import { useAuth } from "../auth/AuthContext";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1.5px solid rgba(199,160,99,0.35)",
  background: "rgba(246,241,231,0.08)",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 17,
  color: "#F6F1E7",
  outline: "none",
};

const item = (delay) => ({
  initial: { opacity: 0, y: 22, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.85, delay, ease: "easeOut" },
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Completá usuario y contraseña.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await loginUser(username.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6">
      <AnimatedPineBackground />

      <FloatingPetals />

      <motion.img
        src="/images/lavender_dorado.png"
        className="absolute top-0 left-0 w-40 md:w-64 pointer-events-none scale-x-[-1]"
        style={{ opacity: 0.42, filter: "brightness(1.4)", transformOrigin: "top center" }}
        animate={{ rotate: [-3, 2, -3], y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        alt=""
      />
      <motion.img
        src="/images/lavender_dorado.png"
        className="absolute bottom-0 right-0 w-40 md:w-64 pointer-events-none"
        style={{ opacity: 0.42, filter: "brightness(1.4)", transformOrigin: "bottom center" }}
        animate={{ rotate: [2, -3, 2], y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        alt=""
      />

      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 480,
          maxHeight: 480,
          background: "radial-gradient(circle, rgba(124,144,114,0.12), transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-md text-center">
        <motion.p
          className="font-body text-base mb-3 uppercase"
          style={{ letterSpacing: "0.42em", color: "#C7A063" }}
          {...item(0.1)}
        >
          Panel privado
        </motion.p>

        <motion.h1
          className="font-script leading-[1.1] mb-2"
          style={{ fontSize: "clamp(2.6rem, 8vw, 4rem)", color: "#F6F1E7", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          {...item(0.25)}
        >
          Lucía &amp; Agustín
        </motion.h1>

        <motion.p
          className="font-body italic mb-8"
          style={{ color: "rgba(246,241,231,0.7)", fontSize: "1.05rem" }}
          {...item(0.4)}
        >
          Ingresá para ver las respuestas de sus invitados
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="card-gold-dark p-8 flex flex-col gap-4 text-left"
          {...item(0.55)}
        >
          <div>
            <label className="font-body text-sm block mb-1" style={{ color: "#C7A063" }}>
              Usuario
            </label>
            <input
              type="text"
              autoComplete="username"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
            />
          </div>

          <div>
            <label className="font-body text-sm block mb-1" style={{ color: "#C7A063" }}>
              Contraseña
            </label>
            <input
              type="password"
              autoComplete="current-password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>

          {error && (
            <p className="font-body text-sm" style={{ color: "#e08a7d" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-gold mt-2 w-full flex items-center justify-center gap-2">
            {submitting ? "Ingresando…" : "Ingresar"}
            <FaHeart className="text-sm opacity-80" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
