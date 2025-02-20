/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { FiBook,  FiGrid, FiShuffle } from "react-icons/fi";
import Cookies from "js-cookie";
import axios from "axios";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const icons: { [key: string]: JSX.Element } = {
  "Periodic Table": <FiGrid />,
  "Dispersion Stuff": <FiShuffle />,
  "Valency Stuff": <FiBook />,
};

// Periodic Table Data
const periodicTable = [
    { num: 1, symbol: "H", name: "Hydrogen", valency: 1 },
    { num: 2, symbol: "He", name: "Helium", valency: 0 },
    { num: 3, symbol: "Li", name: "Lithium", valency: 1 },
    { num: 4, symbol: "Be", name: "Beryllium", valency: 2 },
    { num: 5, symbol: "B", name: "Boron", valency: 3 },
    { num: 6, symbol: "C", name: "Carbon", valency: 4 },
    { num: 7, symbol: "N", name: "Nitrogen", valency: 3 },
    { num: 8, symbol: "O", name: "Oxygen", valency: 2 },
    { num: 9, symbol: "F", name: "Fluorine", valency: 1 },
    { num: 10, symbol: "Ne", name: "Neon", valency: 0 },
    { num: 11, symbol: "Na", name: "Sodium", valency: 1 },
    { num: 12, symbol: "Mg", name: "Magnesium", valency: 2 },
    { num: 13, symbol: "Al", name: "Aluminum", valency: 3 },
    { num: 14, symbol: "Si", name: "Silicon", valency: 4 },
    { num: 15, symbol: "P", name: "Phosphorus", valency: 3 },
    { num: 16, symbol: "S", name: "Sulfur", valency: 2 },
    { num: 17, symbol: "Cl", name: "Chlorine", valency: 1 },
    { num: 18, symbol: "Ar", name: "Argon", valency: 0 },
    { num: 19, symbol: "K", name: "Potassium", valency: 1 },
    { num: 20, symbol: "Ca", name: "Calcium", valency: 2 },
];

const compounds = [
    { name: "Na (Sodium)", status: 'positive',  valency: 1 },
    { name: "K (Potassium)", status: 'positive',  valency: 1 },
    { name: "Ag (Silver)", status: 'positive',  valency: 1 },
    { name: "Cu (Copper)", status: 'positive',  valency: 1 },
    { name: "Mg (Magnesium)", status: 'positive',  valency: 2 },
    { name: "Ca (Calcium)", status: 'positive',  valency: 2 },
    { name: "Zn (Zinc)", status: 'positive',  valency: 2 },
    { name: "Fe (II) (Iron)", status: 'positive',  valency: 2 },
    { name: "Cu (II) (Copper)", status: 'positive',  valency: 2 },
    { name: "Al (Aluminum)", status: 'positive',  valency: 3 },
    { name: "Fe (III) (Iron)", status: 'positive',  valency: 3 },
    { name: "H (Hydrogen)", status: 'positive',  valency: 1 },
    { name: "H (Hyride)", status: 'negative',  valency: 1 },
    { name: "Cl (Chlrodie)", status: 'negative',  valency: 1 },
    { name: "Br (Bromide)", status: 'negative',  valency: 1 },
    { name: "O (Oxide)", status: 'negative',  valency: 2 },
    { name: "S (Sulphide)", status: 'negative',  valency: 2 },
    { name: "I (Iodide)", status: 'negative',  valency: 1 },
    { name: "N (Nitride)", status: 'negative',  valency: 3 },
    { name: "NH4 (Ammonium)", status: 'negative',  valency: 1 },
    { name: "OH (Hydroxide)", status: 'negative',  valency: 1 },
    { name: "NO3 (Nitrate)", status: 'negative',  valency: 1 },
    { name: "HC03 (Hydrogen Carbonate)", status: 'negative',  valency: 1 },
    { name: "CO3 (Carbonate)", status: 'negative',  valency:2 },
    { name: "SO3 (Sulphite)", status: 'negative',  valency: 2 },
    { name: "SO4 (Sulphate)", status: 'negative',  valency: 2 },
    { name: "PO4 (Phosphate)", status: 'negative',  valency: 3 },

    


    




];

const dispersionPairs = [
  { item: "Fogs, clouds, mist", phase: "Liquid", medium: "Gas", type: "Aerosol" },
  { item: "Smoke, automobile exhaust", phase: "Solid", medium: "Gas" , type: "Aerosol"},
  { item: "Shaving Cream", phase: "Gas", medium: "Liquid" , type: "foam"},
  { item: "Milk, face cream", phase: "Liquid", medium: "Liquid" , type: "Emulsion"},
  { item: "Milk of magnesia, mud", phase: "Solid", medium: "Liquid" , type: "Sol"},
  { item: "Foam, rubber, sponge, pumice", phase: "Gas", medium: "Solid" , type: "Foam"},
  { item: "Jelly cheese, butter", phase: "Liquid", medium: "Solid" ,type: "Gel"},
  { item: "Colured gemstone, milky glass", phase: "Liquid", medium: "Solid" , type: "Solid Sol"},
  

  

      
];



const SortableItem = ({ id, symbol }: { id:string,  symbol: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} 
      className="p-3 bg-white shadow rounded-md text-center cursor-grab"
      style={{ transform: CSS.Transform.toString(transform), transition }}>
      {symbol}
    </div>
  );
};

type Quiz = {
  question: string;
  answer: string;
};
const PracticePage = () => {
  const [topics, setTopics] = useState(Object.keys(icons));
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [username, setUsername] = useState<string | null>("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answerInput, setAnswerInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>("");
  const [elements, setElements] = useState<{ num: number; symbol: string; name: string; valency: number }[]>([]);
  const [dispersionGame, setDispersionGame] = useState<{ item: string; phase: string; medium: string; type: string } | null>();
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [valencyQuiz, setValencyQuiz] = useState<{ name: string; valency: number } | null>(null);
  const [selectedValency, setSelectedValency] = useState<string | number>("");
  const [compoundQuiz, setCompoundQuiz] = useState<{ name: string; status: string; valency: number } | null>(null);
  const [selectedPositive, setSelectedPositive] = useState("");
  const [valency, setValency] = useState("");
  const [selectedNegative, setSelectedNegative] = useState("");

  useEffect(() => {
    const storedName = Cookies.get("username");
    if (storedName) setUsername(storedName);
    else requestUserName();
    generatePeriodicQuiz();
    generateElements();
  }, []);

  useEffect(() => {
    if (selectedTopic === "Dispersion Stuff") generateDispersionItem();
    if (selectedTopic === "Valency Stuff") generateValencyQuiz();
  }, [selectedTopic]);

  const requestUserName = () => {
 
  };

  const generatePeriodicQuiz = () => {
    const element = periodicTable[Math.floor(Math.random() * periodicTable.length)];
    setQuiz({ question: `What is the symbol of ${element.name}?`, answer: element.symbol });
  };

  const generateElements = () => {
    setElements(periodicTable.sort(() => 0.5 - Math.random()).slice(0, 20));
  };

  const generateDispersionItem = () => {
    setDispersionGame(dispersionPairs[Math.floor(Math.random() * dispersionPairs.length)]);
    setSelectedPhase("");
    setSelectedMedium("");
  };

  const generateValencyQuiz = () => {
    
      setCompoundQuiz(compounds[Math.floor(Math.random() * compounds.length)] as { name: string; status: string; valency: number });
      setValencyQuiz(null);

  };

  const checkAnswer = () => {
    if (quiz) {
      setFeedback(answerInput.toLowerCase() === quiz.answer.toLowerCase() ? "Correct!" : "Incorrect");
      if(answerInput.toLowerCase() === quiz.answer.toLowerCase()) {

        window.location.reload();
    }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold">Topics</h2>
        <ul className="space-y-2 mt-4">
          {topics.map(topic => (
            <li key={topic} className={`p-2 flex items-center gap-2 cursor-pointer rounded-lg ${selectedTopic === topic ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'}`} 
                onClick={() => setSelectedTopic(topic)}>
              {icons[topic]} {topic}
            </li>
          ))}
        </ul>
      </aside>
      
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{selectedTopic}</h1>

        {selectedTopic === "Periodic Table" && quiz && (
          <div className="mt-6 bg-white p-4 shadow-lg rounded-md">
            <h3 className="font-semibold">{quiz.question}</h3>
            <input type="text" value={answerInput} onChange={e => setAnswerInput(e.target.value)} className="w-full mt-2 p-2 border rounded-md" />
            <button onClick={checkAnswer} className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-md">Submit</button>
            {feedback && <div className={`mt-2 p-2 rounded-md ${feedback === "Correct!" ? 'bg-green-200' : 'bg-red-200'}`}>{feedback}</div>}
          </div>
        )}

        {selectedTopic === "Dispersion Stuff" && dispersionGame && (
    <div className="mt-6 bg-white p-4 shadow-lg rounded-md">
      <h3 className="font-semibold">Match the dispersion:</h3>
      <p className="mt-2">Item: {dispersionGame.item} || Type: {dispersionGame.type}</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <select 
          value={selectedPhase} 
          onChange={(e) => setSelectedPhase(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select Phase</option>
          <option value="Solid">Solid</option>
          <option value="Liquid">Liquid</option>
          <option value="Gas">Gas</option>
        </select>
        
        <select 
          value={selectedMedium} 
          onChange={(e) => setSelectedMedium(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select Medium</option>
          <option value="Solid">Solid</option>
          <option value="Liquid">Liquid</option>
          <option value="Gas">Gas</option>
        </select>
      </div>
      <button 
        onClick={() => {
          const isCorrect = selectedPhase === dispersionGame.phase && 
                           selectedMedium === dispersionGame.medium;
          setFeedback(isCorrect ? "Correct!" : "Incorrect");

          if(isCorrect) {
              window.location.reload();

          }
        }}
        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md"
      >
        Check Answer
      </button>
    </div>
  )}
  {selectedTopic === "Valency Stuff" && (
  <div className="mt-6 bg-white p-4 shadow-lg rounded-md">
    {valencyQuiz ? (
      <>
        <h3 className="font-semibold">What is the valency of {valencyQuiz.name}?</h3>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => {
                setSelectedValency(num);
                setFeedback(num === valencyQuiz.valency ? "Correct!" : "Incorrect");
                if(num === valencyQuiz.valency) {
                    window.location.reload();

                }
            }}
              className={`p-2 rounded-md ${selectedValency === num ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </>
    ) : (
      compoundQuiz && (
        <>
          <h3 className="font-semibold">What valency is there for {compoundQuiz.name}?</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <select
              value={selectedPositive}
              onChange={(e) => setSelectedPositive(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Select charge</option>
              
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              
            </select>
            
            

            <input
          type="number"
          min="1"
          max="8"
          value={selectedValency || ""}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (val >= 1 && val <= 8) {
              setSelectedValency(val);
            }
          }}
          className="w-full mt-2 p-2 border rounded-md placeholder:text-gray-700"
          placeholder="Valency?"
          
        />
          </div>
          <button
            onClick={() => {
              const isCorrect =
                selectedPositive.toLowerCase() === compoundQuiz.status.toLowerCase() &&
                selectedValency == compoundQuiz.valency;
              setFeedback(isCorrect ? "Correct!" : "Incorrect");
              if(isCorrect) {

                  window.location.reload();
              }
            }}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            Check Answer
          </button>
        </>
      )
    )}
  </div>
)}
{feedback && <div className={`mt-2 p-2 rounded-md ${feedback === "Correct!" ? 'bg-green-200' : 'bg-red-200'}`}>{feedback}</div>}

        
      </main>
    </div>
  );
};

export default PracticePage;
