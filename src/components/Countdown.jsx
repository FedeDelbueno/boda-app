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
          width: "clamp(88px, 22vw, 120px)",
          height: "clamp(88px, 22vw, 120px)",
          fontSize: "clamp(1.8rem, 7vw, 2.4rem)",
          background:
            "linear-gradient(135deg, rgba(246,241,231,0.12), rgba(176,129,63,0.18))",
          border: "1.5px solid rgba(199,160,99,0.55)",
          color: "#F6F1E7",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        className="mt-2 font-body italic text-base md:text-lg"
        style={{ color: "#C7A063", letterSpacing: "0.18em" }}
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
