"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white px-4 py-2 md:px-40 md:py-4 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
      <div className="text-xl md:text-2xl font-bold flex items-center">
        <span className="text-green-400">CF</span> Predict
      </div>
      <div className="flex items-center space-x-4 md:space-x-0">
        <nav className=" md:flex">
          <motion.div
            whileHover={{
              scale: 1.05,
              backgroundColor: "#2D3748",
              borderRadius: "0.25rem",
            }}
            className="transition-transform duration-200 px-3 py-1 rounded flex items-center"
          >
            <a
              href="https://github.com/callmeanupam/CodeForces-Rating-Predictor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex items-center"
            >
              <span>Give ⭐️ </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 0C4.48 0 0 4.48 0 10c0 4.42 2.86 8.15 6.84 9.48.5.09.68-.22.68-.49v-1.78c-2.78.61-3.37-1.33-3.37-1.33-.45-1.14-1.11-1.44-1.11-1.44-.91-.62.07-.61.07-.61 1 .07 1.5 1.03 1.5 1.03.89 1.5 2.33 1.07 2.89.82.09-.64.35-1.07.63-1.32-2.2-.25-4.53-1.1-4.53-4.91 0-1.08.38-1.97 1.01-2.67-.1-.25-.44-1.26.09-2.62 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.84.01 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.53 1.36.2 2.37.1 2.62.63.7 1.01 1.59 1.01 2.67 0 3.81-2.33 4.66-4.54 4.9.36.31.68.93.68 1.87v2.78c0 .27.18.59.68.49C17.14 18.15 20 14.42 20 10 20 4.48 15.52 0 10 0z" />
              </svg>
            </a>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}
