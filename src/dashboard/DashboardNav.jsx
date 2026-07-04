import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const TABS = [
  { to: "/dashboard", label: "Confirmaciones", end: true },
  { to: "/dashboard/canciones", label: "Canciones" },
  { to: "/dashboard/fotos", label: "Fotos y videos" },
];

const linkStyle = ({ isActive }) => ({
  display: "inline-block",
  padding: "12px 26px",
  borderRadius: 999,
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 700,
  fontSize: 19,
  letterSpacing: "0.02em",
  whiteSpace: "nowrap",
  transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
  background: isActive ? "linear-gradient(135deg, #C7A063, #B0813F)" : "rgba(246,241,231,0.06)",
  color: isActive ? "#20302A" : "#F6F1E7",
  border: isActive ? "1.5px solid transparent" : "1.5px solid rgba(199,160,99,0.4)",
  boxShadow: isActive ? "0 4px 18px rgba(176,129,63,0.4)" : "none",
});

export default function DashboardNav() {
  return (
    <nav
      className="flex gap-3 mb-9 overflow-x-auto no-scrollbar"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
    >
      {TABS.map((tab, i) => (
        <motion.div
          key={tab.to}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{ flexShrink: 0 }}
        >
          <NavLink to={tab.to} end={tab.end} style={linkStyle}>
            {tab.label}
          </NavLink>
        </motion.div>
      ))}
    </nav>
  );
}
