import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/dashboard", label: "Confirmaciones", end: true },
  { to: "/dashboard/canciones", label: "Canciones" },
  { to: "/dashboard/fotos", label: "Fotos y videos" },
];

const linkStyle = ({ isActive }) => ({
  padding: "12px 26px",
  borderRadius: 999,
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 700,
  fontSize: 19,
  letterSpacing: "0.02em",
  whiteSpace: "nowrap",
  transition: "all 0.2s ease",
  background: isActive ? "linear-gradient(135deg, #C7A063, #B0813F)" : "rgba(246,241,231,0.06)",
  color: isActive ? "#20302A" : "#F6F1E7",
  border: isActive ? "1.5px solid transparent" : "1.5px solid rgba(199,160,99,0.4)",
  boxShadow: isActive ? "0 4px 18px rgba(176,129,63,0.4)" : "none",
});

export default function DashboardNav() {
  return (
    <nav className="flex gap-3 flex-wrap mb-9">
      {TABS.map((tab) => (
        <NavLink key={tab.to} to={tab.to} end={tab.end} style={linkStyle}>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
