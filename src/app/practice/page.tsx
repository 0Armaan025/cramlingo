"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const topics = [
  "Atomic Structure",
  "Periodic Table",
  "Chemical Bonds",
  "Stoichiometry",
  "Acids & Bases",
  "Thermodynamics",
  "Organic Chemistry",
];

const content = {
  "Atomic Structure": "Atoms are made up of protons, neutrons, and electrons.",
  "Periodic Table": "The periodic table arranges elements based on atomic number.",
  "Chemical Bonds": "Ionic and covalent bonds hold atoms together.",
  "Stoichiometry": "Stoichiometry helps in calculating reactants and products in a reaction.",
  "Acids & Bases": "Acids donate protons, bases accept them.",
  "Thermodynamics": "Energy changes in chemical reactions are explained by thermodynamics.",
  "Organic Chemistry": "The study of carbon-containing compounds.",
};

const PracticePage = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <motion.aside
        className="w-64 bg-white shadow-lg p-6 sticky top-0 h-screen hidden md:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Topics</h2>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li
              key={topic}
              className={`p-2 rounded-md cursor-pointer transition ${
                selectedTopic === topic ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </li>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main
        className="flex-1 p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">{selectedTopic}</h1>
        <p className="mt-4 text-lg text-gray-700">{content[selectedTopic]}</p>
      </motion.main>
    </div>
  );
};

export default PracticePage;
