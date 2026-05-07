"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-10 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex flex-col w-full max-w-5xl transition-all duration-500 shadow-xl border border-[#90E0EF] 
                      bg-[#CAF0F8]/80 backdrop-blur-xl ${isOpen ? "rounded-3xl" : "rounded-full"}`}
      >
        {/* Main Nav Row */}
        <div className="flex items-center justify-between w-full px-8 py-5">
          {/* Logo - Flipped to Deep Navy */}
          <Link href="/" className="group cursor-pointer">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-[#03045E] whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
              TELIPOSH <span className="font-light text-[#0077B6]">CHURCH</span>
            </div>
          </Link>

          {/* Desktop Links - Flipped to Deep Navy */}
          <ul className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-widest text-[#03045E]">
            <li>
              <Link
                href="#events"
                className="hover:text-[#00B4D8] transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="#committee"
                className="hover:text-[#00B4D8] transition-colors"
              >
                Committee
              </Link>
            </li>
            <li>
              <Link
                href="#gallery"
                className="hover:text-[#00B4D8] transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="#contactus"
                className="bg-[#03045E] text-white px-6 py-3 rounded-full hover:bg-[#0077B6] transition-all shadow-md"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger - Flipped to Deep Navy */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#03045E] p-2 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="flex flex-col items-center space-y-4 text-sm font-bold uppercase tracking-widest text-[#03045E]">
            <li>
              <Link onClick={() => setIsOpen(false)} href="#events">
                Events
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} href="#committee">
                Committee
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} href="#gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsOpen(false)}
                href="#contactus"
                className="text-[#00B4D8]"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
