export default function StatCard({ value, label, accent = "#B0813F" }) {
  return (
    <div className="card-gold px-7 py-6 flex flex-col items-center justify-center text-center min-w-[160px]">
      <span className="font-serif text-5xl font-bold" style={{ color: accent }}>
        {value}
      </span>
      <span
        className="font-body font-bold text-base uppercase mt-2"
        style={{ color: "#6b4423", letterSpacing: "0.1em" }}
      >
        {label}
      </span>
    </div>
  );
}
