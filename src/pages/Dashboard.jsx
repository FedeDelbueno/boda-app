import { Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import AnimatedPineBackground from "../components/AnimatedPineBackground";
import FloatingPetals from "../components/FloatingPetals";
import ClickSparkle from "../components/ClickSparkle";
import DashboardNav from "../dashboard/DashboardNav";
import RsvpPanel from "../dashboard/RsvpPanel";
import SongsPanel from "../dashboard/SongsPanel";
import DrivePanel from "../dashboard/DrivePanel";

export default function Dashboard() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <AnimatedPineBackground className="absolute inset-0" />
        <FloatingPetals />

        <motion.img
          src="/images/lavender_dorado.png"
          className="absolute top-0 left-0 w-40 md:w-64 scale-x-[-1]"
          style={{ opacity: 0.42, filter: "brightness(1.4)", transformOrigin: "top center" }}
          animate={{ rotate: [-3, 2, -3], y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          alt=""
        />
        <motion.img
          src="/images/lavender_dorado.png"
          className="absolute bottom-0 right-0 w-40 md:w-64"
          style={{ opacity: 0.42, filter: "brightness(1.4)", transformOrigin: "bottom center" }}
          animate={{ rotate: [2, -3, 2], y: [0, 8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          alt=""
        />
      </div>

      <motion.div
        className="fixed rounded-full pointer-events-none -z-10"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 420,
          maxHeight: 420,
          background: "radial-gradient(circle, rgba(124,144,114,0.14), transparent 70%)",
          top: "-10%",
          right: "-10%",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <ClickSparkle />

      <header
        className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-12 py-7"
        style={{ borderBottom: "1.5px solid rgba(199,160,99,0.25)" }}
      >
        <div>
          <p
            className="font-body font-semibold text-base uppercase mb-1"
            style={{ color: "#C7A063", letterSpacing: "0.32em" }}
          >
            Panel privado
          </p>
          <h1
            className="font-script leading-none"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.4rem)", color: "#F6F1E7", textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
          >
            Lucía &amp; Agustín
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="btn-ghost-gold flex items-center gap-2"
          style={{ padding: "12px 26px", fontSize: 17, minHeight: "auto" }}
        >
          <FaSignOutAlt /> Salir
        </button>
      </header>

      <main className="px-6 md:px-12 py-10">
        <DashboardNav />
        <Routes>
          <Route index element={<RsvpPanel />} />
          <Route path="canciones" element={<SongsPanel />} />
          <Route path="fotos" element={<DrivePanel />} />
        </Routes>
      </main>
    </div>
  );
}
