import { useState } from 'react';

export default function Navbar({ onLoginClick, isLoggedIn, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How to use', href: '#how-to-use' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="w-full px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-xl">B</div>
          <span className="text-2xl font-black text-blue-900 tracking-tighter uppercase">BKies</span>
        </div>

        {/* Dynamic Menu Links */}
        <ul className="hidden md:flex gap-8 font-semibold text-gray-600">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href} 
                className="hover:text-blue-600 transition-colors duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Buttons / Avatar */}
        <div className="flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              <button onClick={onLoginClick} className="text-gray-600 font-semibold hover:text-blue-600">Login</button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-md">
                Get App
              </button>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)} 
                className="w-10 h-10 rounded-full bg-gray-200 border-2 border-green-500 overflow-hidden flex items-center justify-center focus:outline-none"
              >
                <svg className="w-8 h-8 text-gray-400 mt-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 z-50 border">
                  <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">Personal Information</a>
                  <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">Payment</a>
                  <div className="border-t my-1"></div>
                  <button 
                    onClick={() => { onLogout(); setShowDropdown(false); }} 
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    LOG OUT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}