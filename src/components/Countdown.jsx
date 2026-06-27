import { useEffect, useState, useCallback } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTime = useCallback(() => {
    const now = new Date();
    const distance = targetDate - now;
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / 1000 / 60) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  const Circle = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <div
        className="pulse-gold flex items-center justify-center rounded-full font-serif font-bold"
        style={{
          width: "clamp(72px, 18vw, 96px)",
          height: "clamp(72px, 18vw, 96px)",
          fontSize: "clamp(1.35rem, 5.5vw, 1.85rem)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(253,230,138,0.25))",
          border: "1.5px solid rgba(212,175,55,0.6)",
          color: "#5C3A00",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        className="mt-2 font-body italic text-xs md:text-sm"
        style={{ color: "#7D6212", letterSpacing: "0.18em" }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <section
      id="CountdownSection"
      className="flex justify-center flex-wrap py-4"
      style={{ gap: "clamp(10px, 4vw, 40px)" }}
    >
      <Circle label="Días" value={timeLeft.days} />
      <Circle label="Horas" value={timeLeft.hours} />
      <Circle label="Minutos" value={timeLeft.minutes} />
      <Circle label="Segundos" value={timeLeft.seconds} />
    </section>
  );
};

export default Countdown;
