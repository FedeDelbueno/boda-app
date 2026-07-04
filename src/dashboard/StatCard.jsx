import TiltCard from "../components/TiltCard";

export default function StatCard({ value, label, accent = "#B0813F" }) {
  return (
    <TiltCard
      className="card-gold card-gold-interactive flex-1 min-w-[140px] sm:min-w-[160px] flex flex-col items-center justify-center text-center"
      style={{ padding: "clamp(18px, 4vw, 28px) clamp(16px, 5vw, 28px)" }}
    >
      <span
        className="font-serif font-bold"
        style={{ color: accent, fontSize: "clamp(2.2rem, 7vw, 3rem)" }}
      >
        {value}
      </span>
      <span
        className="font-body font-bold uppercase mt-2"
        style={{ color: "#6b4423", letterSpacing: "0.1em", fontSize: "clamp(0.85rem, 2.6vw, 1rem)" }}
      >
        {label}
      </span>
    </TiltCard>
  );
}
