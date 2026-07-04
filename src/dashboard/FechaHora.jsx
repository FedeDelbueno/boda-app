export default function FechaHora({ value }) {
  const d = new Date(value);
  const fecha = d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
  const hora = d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col leading-tight">
      <span
        className="font-serif font-bold"
        style={{ fontSize: 17, color: "#4a3220", letterSpacing: "0.01em" }}
      >
        {fecha}
      </span>
      <span
        className="font-body font-extrabold"
        style={{ fontSize: 18, color: "#8B6530", letterSpacing: "0.04em" }}
      >
        {hora} hs
      </span>
    </div>
  );
}
