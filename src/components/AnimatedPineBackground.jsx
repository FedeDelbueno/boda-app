import { motion } from "framer-motion";

const AnimatedPineBackground = ({ className = "absolute inset-0" }) => (
  <motion.div
    className={className}
    style={{
      background:
        "linear-gradient(120deg, #172420, #172420, #20302A, #2c4438, #20302A, #172420, #172420)",
      backgroundSize: "400% 400%",
    }}
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
  />
);

export default AnimatedPineBackground;
