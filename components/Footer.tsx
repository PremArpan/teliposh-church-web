"use client";
import React from 'react';
import { PlayCircle, Camera, Mail } from 'lucide-react'; // Generic icons instead of brand logos

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Teliposh Church. 
            <span className="block md:inline ml-0 md:ml-2 font-light">Community • Faith • Service</span>
          </p>
        </div>
        
        {/* Right Side: Social Links */}
        <div className="flex space-x-8">
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <PlayCircle size={20} className="group-hover:text-red-500" />
            <span className="text-xs uppercase tracking-widest">YouTube</span>
          </a>
          
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <Camera size={20} className="group-hover:text-pink-500" />
            <span className="text-xs uppercase tracking-widest">Instagram</span>
          </a>

          <a 
            href="mailto:info@teliposhchurch.com" 
            className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <Mail size={20} className="group-hover:text-blue-400" />
            <span className="text-xs uppercase tracking-widest">Email</span>
          </a>
        </div>
        
      </div>
    </footer>
  );
}