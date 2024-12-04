import React from "react";
import { FaSun, FaMoon, FaAdjust } from "react-icons/fa";
import { motion } from "framer-motion"; 

const ThemeToggle = ({ setTheme, currentTheme }) => {
  return (
    <div className="theme-toggle">
      <motion.button
        className="theme-button"
        onClick={() => setTheme("light")}
        title="Light Mode"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaSun />
      </motion.button>
      <motion.button
        className="theme-button"
        onClick={() => setTheme("shadow")}
        title="Shadow Mode"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaAdjust />
      </motion.button>
      <motion.button
        className="theme-button"
        onClick={() => setTheme("dark")}
        title="Dark Mode"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaMoon />
      </motion.button>
    </div>
  );
};

export default ThemeToggle;
