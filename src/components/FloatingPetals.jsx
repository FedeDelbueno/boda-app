import { motion } from "framer-motion";

const PETALS = [
  { id: 0,  size: 6,  left: "5%",  delay: 0,   duration: 14, square: false },
  { id: 1,  size: 4,  left: "14%", delay: 2.5, duration: 17, square: true  },
  { id: 2,  size: 8,  left: "27%", delay: 1,   duration: 12, square: false },
  { id: 3,  size: 5,  left: "39%", delay: 3.5, duration: 19, square: true  },
  { id: 4,  size: 10, left: "50%", delay: 0.5, duration: 22, square: false },
  { id: 5,  size: 4,  left: "61%", delay: 4,   duration: 13, square: true  },
  { id: 6,  size: 7,  left: "72%", delay: 2,   duration: 16, square: false },
  { id: 7,  size: 5,  left: "83%", delay: 1.5, duration: 18, square: true  },
  { id: 8,  size: 9,  left: "10%", delay: 5,   duration: 20, square: false },
  { id: 9,  size: 3,  left: "43%", delay: 3,   duration: 11, square: true  },
  { id: 10, size: 6,  left: "58%", delay: 6,   duration: 23, square: false },
  { id: 11, size: 4,  left: "91%", delay: 4.5, duration: 14, square: true  },
];

const BACKGROUNDS = [
  "radial-gradient(circle, rgba(176,129,63,0.55), rgba(199,160,99,0.12))",
  "radial-gradient(circle, rgba(124,144,114,0.5), rgba(176,129,63,0.1))",
  "radial-gradient(circle, rgba(246,241,231,0.6), rgba(199,160,99,0.25))",
];

const FloatingPetals = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {PETALS.map(({ id, size, left, delay, duration, square }) => (
      <motion.div
        key={id}
        style={{
          position: "absolute",
          width: size,
          height: size,
          left,
          bottom: "-5%",
          borderRadius: square ? "2px" : "50%",
          background: BACKGROUNDS[id % 3],
          boxShadow: `0 0 ${size + 2}px rgba(176,129,63,0.35)`,
        }}
        animate={{
          y: [0, -1500],
          x: [0, id % 2 === 0 ? 40 : -40],
          opacity: [0, 0.85, 0.85, 0],
          scale: [0.3, 1, 1, 0.15],
          rotate: square ? [0, 270] : [0, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

export default FloatingPetals;
