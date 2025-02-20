/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="homePage flex flex-col items-center justify-center min-h-[80vh] bg-white p-6 pt-20">
      {/* Content Wrapper */}
      <motion.div 
        className="flex flex-col md:flex-row items-center max-w-5xl w-full gap-10 p-6 rounded-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <motion.h3
            className="text-4xl md:text-5xl font-semibold text-gray-900"
            style={{ fontFamily: 'Poppins' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Get started with cramming science stuff that sucks for me, at least!
          </motion.h3>

          <motion.h4
            className="mt-3 text-lg text-gray-700"
            style={{ fontFamily: 'Poppins, serif' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
        It&rsquo;s chemistry, help! 😭
          </motion.h4>

          <Link href="/practice">
          <motion.button
            className="mt-6 px-6 py-3 bg-[#010b0c] text-white rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors flex items-center shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start Cramming 😭
          </motion.button>
          </Link>
        </div>

        {/* Image Section */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <img
            src="https://imgs.search.brave.com/kxOZNp2z0_FN8AwFGlqQvCDljYiwP4oCS7p-gC-lQ7s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Ym9yZWRwYW5kYS5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8xMC9j/aGVtaXN0cnktbWVt/ZXNfNjktNjUyNGVl/YjczMWJjZl9fNzAw/LmpwZw"
            alt="Chemistry Meme"
            className="max-w-xs md:max-w-sm rounded-lg shadow-md"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
