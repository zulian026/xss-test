
import React from 'react';
import { SecurityMode } from '../types';

interface NavbarProps {
  securityMode: SecurityMode;
  setSecurityMode: (mode: SecurityMode) => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ securityMode, onHomeClick }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHomeClick}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
            S
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
            SecurePath <span className="text-indigo-600">Blog</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onHomeClick}
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Home
          </button>
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            securityMode === SecurityMode.VULNERABLE 
              ? 'bg-red-100 text-red-600 border border-red-200' 
              : 'bg-green-100 text-green-600 border border-green-200'
          }`}>
            <i className={`fas ${securityMode === SecurityMode.VULNERABLE ? 'fa-triangle-exclamation' : 'fa-shield-halved'} mr-1`}></i>
            {securityMode === SecurityMode.VULNERABLE ? 'Mode Rentan' : 'Mode Aman'}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
