const NAV_LINKS = [
  { href: "#historia", label: "Historia" },
  { href: "#evento",   label: "Evento" },
  { href: "#regalos",  label: "Regalos" },
  { href: "#musica",   label: "Música" },
  { href: "#fotos",    label: "Fotos" },
  { href: "#rsvp",     label: "Confirmar" },
];

const Nav = () => (
  <nav
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center overflow-x-auto"
    style={{
      gap: "clamp(0.9rem, 3vw, 2rem)",
      padding: "0.85rem 1rem",
      background: "rgba(23,36,32,0.88)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      scrollbarWidth: "none",
    }}
  >
    {NAV_LINKS.map(({ href, label }) => (
      <a
        key={href}
        href={href}
        style={{
          color: "rgba(246,241,231,0.82)",
          textDecoration: "none",
          fontSize: "0.66rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transition: "color 0.2s",
          fontFamily: "'Jost', 'Cormorant Garamond', sans-serif",
          fontWeight: 400,
        }}
        onMouseEnter={(e) => (e.target.style.color = "#C7A063")}
        onMouseLeave={(e) => (e.target.style.color = "rgba(246,241,231,0.82)")}
      >
        {label}
      </a>
    ))}
  </nav>
);

export default Nav;
