"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const AnimatedButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const hearts = [
    { id: 1, top: "-1.2em", left: "-1.2em", size: "2.2em" },
    { id: 2, top: "0.6em", left: "-0.6em", size: "2em" },
    { id: 3, top: "-1.1em", right: "-1em", size: "2.5em" },
    { id: 4, top: "1em", right: "-0.8em", size: "2em" },
  ];

  return (
    <motion.button
      type="submit"
      className="relative text-white text-l font-bold px-6 py-4 rounded-none bg-[#084be7] w-max inline self-end"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsClicked(true)}
      onMouseLeave={() => setIsClicked(false)}
    >
      <span className="relative z-10">Done</span>

      {isClicked &&
        hearts.map((heart, index) => (
          <motion.span
            key={heart.id}
            className="absolute bg-contain bg-no-repeat opacity-70"
            style={{
              top: heart.top,
              left: heart.left,
              width: heart.size,
              height: heart.size,
              backgroundImage: "url(/assets/images/events/heart.png)",
              filter:
                "invert(87%) sepia(68%) saturate(1260%) hue-rotate(50deg) brightness(120%) contrast(100%)",
            }}
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
          />
        ))}
    </motion.button>
  );
};

export default AnimatedButton;
