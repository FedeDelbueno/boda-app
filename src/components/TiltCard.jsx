import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { isMobile } from "react-device-detect";

export default function TiltCard({ children, className = "", style = {}, maxTilt = 10, ...rest }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 260, damping: 22, mass: 0.6 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springCfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springCfg);
  const scale = useSpring(1, springCfg);
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(280px circle at ${gx} ${gy}, rgba(199,160,99,0.22), transparent 65%)`
  );

  if (isMobile) {
    return (
      <div className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleEnter = () => scale.set(1.04);
  const handleLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      className={className}
      style={{ ...style, rotateX, rotateY, scale, transformPerspective: 900, position: "relative" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: glowBackground,
        }}
      />
      {children}
    </motion.div>
  );
}
