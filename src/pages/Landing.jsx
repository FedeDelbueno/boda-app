import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

import Hero from "../components/Hero";
import RSVPForm from "../components/RSVPForm";
import EventDetails from "../components/EventDetails";
import WelcomeSection from "../components/WelcomeSection";
import GiftSection from "../components/GiftSection";
import InfoSection from "../components/InfoSection";
import SongsSection from "../components/SongsSection";
import DrivePhotoSection from "../components/DrivePhotoSection";
import Footer from "../components/Footer";

import IntroAnimation from "../components/IntroAnimation";
import Nav from "../components/Nav";
import ScrollProgress from "../components/ScrollProgress";
import SectionDivider from "../components/SectionDivider";
import ScrollToTop from "../components/ScrollToTop";
import ClickSparkle from "../components/ClickSparkle";
import FloatingRSVPReminder from "../components/FloatingRSVPReminder";

const CONFETTI_COLORS = ["#C7A063", "#B0813F", "#8B6530", "#D4A96A", "#F6F1E7", "#EFE7D7"];

const HeroTransition = () => (
  <div
    style={{
      background: "linear-gradient(180deg, #172420 0%, #20302A 100%)",
      padding: "18px 0 14px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      overflow: "hidden",
      position: "relative",
    }}
  >
    {/* Shimmer dorado animado */}
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "40%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(199,160,99,0.15), transparent)",
        pointerEvents: "none",
      }}
      animate={{ x: ["-150%", "300%"] }}
      transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
    />

    {/* Línea ornamental */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", maxWidth: "320px" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #B0813F)" }} />
      <span style={{ color: "#C7A063", fontSize: "11px", lineHeight: 1 }}>✦</span>
      <div style={{ width: "18px", height: "1px", background: "#8B6530" }} />
      <span style={{ color: "#C7A063", fontSize: "16px", lineHeight: 1, opacity: 0.9 }}>❧</span>
      <div style={{ width: "18px", height: "1px", background: "#8B6530" }} />
      <span style={{ color: "#C7A063", fontSize: "11px", lineHeight: 1 }}>✦</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #B0813F, transparent)" }} />
    </div>

    {/* Segunda línea inferior */}
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "40px", height: "1px", background: "rgba(176,129,63,0.35)" }} />
      <span style={{ color: "rgba(199,160,99,0.5)", fontSize: "7px", lineHeight: 1 }}>✦</span>
      <div style={{ width: "40px", height: "1px", background: "rgba(176,129,63,0.35)" }} />
    </div>
  </div>
);

const fireConfetti = (origin = { x: 0.5, y: 0.6 }) => {
  confetti({ particleCount: 60, angle: 60,  spread: 55, origin: { x: origin.x - 0.4, y: origin.y }, colors: CONFETTI_COLORS, scalar: 0.85, gravity: 0.9, drift: 0.15 });
  setTimeout(() => {
    confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: origin.x + 0.4, y: origin.y }, colors: CONFETTI_COLORS, scalar: 0.85, gravity: 0.9, drift: -0.15 });
  }, 180);
};

function Landing() {
  const [introComplete, setIntroComplete] = useState(false);
  const firedSections = useRef(new Set());

  // Confetti al hacer scroll a secciones clave
  useEffect(() => {
    const TRIGGERS = ["evento", "rsvp"];
    const observers = TRIGGERS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !firedSections.current.has(id)) {
            firedSections.current.add(id);
            fireConfetti({ x: 0.5, y: 0.65 });
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);

    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 60,
        spread: 65,
        origin: { x: 0.02, y: 0.65 },
        colors: CONFETTI_COLORS,
        scalar: 0.88,
        gravity: 0.85,
        drift: 0.2,
      });
    }, 150);

    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 120,
        spread: 65,
        origin: { x: 0.98, y: 0.65 },
        colors: CONFETTI_COLORS,
        scalar: 0.88,
        gravity: 0.85,
        drift: -0.2,
      });
    }, 350);

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 90,
        spread: 45,
        origin: { x: 0.5, y: 0.75 },
        colors: CONFETTI_COLORS,
        scalar: 0.7,
        gravity: 1,
      });
    }, 600);
  }, []);

  return (
    <div className="App">
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      <Nav />
      <ScrollProgress />
      <ClickSparkle />

      {/* 1. Hero */}
      <Hero />

      {/* Transición Hero → Historia */}
      <HeroTransition />

      {/* 2. Bienvenida — marfil cálido */}
      <WelcomeSection />

      {/* 3. Detalles del evento — marfil claro */}
      <SectionDivider bg="#F6F1E7" />
      <EventDetails />

      {/* 4. Info — pino oscuro */}
      <InfoSection />

      {/* 5. Regalos — marfil claro */}
      <SectionDivider bg="#F6F1E7" />
      <GiftSection />

      {/* 6. Música — marfil cálido */}
      <SectionDivider bg="#EFE7D7" />
      <SongsSection />

      {/* 7. Fotos — pino oscuro */}
      <SectionDivider bg="#20302A" />
      <DrivePhotoSection />

      {/* 8. Confirmar asistencia — marfil */}
      <SectionDivider bg="#EFE7D7" />
      <RSVPForm />

      <Footer />

      <ScrollToTop />
      <FloatingRSVPReminder />
    </div>
  );
}

export default Landing;
