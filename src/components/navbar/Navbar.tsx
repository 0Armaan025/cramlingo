import React from 'react';
import Link from 'next/link';
import './navbar.css';



const Navbar: React.FC = () => {
    return (
        <nav className="bg-white p-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-black text-2xl font-bold flex items-center">
            <Link href="/">
                <img
                    src="/logo.svg"
                    alt="Cramlingo Logo"
                    className="ml-8 h-20 w-40 self-center"  // Reduced height slightly, centered it
                    style={{ fontFamily: "Poppins" }}
                />
            </Link>
        </div>
    
        {/* Navigation Links */}
        <div className="flex space-x-4 justify-start items-center">
            <Link href="/about" className="text-black text-base" style={{ fontFamily: "Poppins" }}>
                About
            </Link>
            <Link href="/practice">
                <button className="bg-[#010b0c] text-white rounded-md px-4 py-1 text-sm" style={{ fontFamily: "Poppins" }}>
                    Practice
                </button>
            </Link>
        </div>
    </nav>
    

    );
};

export default Navbar;