import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onLoginClick, isLoggedIn, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'About', href: '/#about' },
    { name: 'Features', href: '/#features' },
    { name: 'How to use', href: '/#how-to-use' },
    { name: 'Pricing', href: '/#pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="w-full px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => setMenuOpen(false)}>
          <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-black text-xl">B</div>
          <span className="text-2xl font-black text-blue-900 tracking-tighter uppercase">BKies</span>
        </Link>

        {/* Desktop Menu Links */}
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

        {/* Right Side: Actions + Hamburger */}
        <div className="flex gap-3 items-center">
          {/* Desktop: Login / Avatar */}
          {!isLoggedIn ? (
            <button
              onClick={onLoginClick}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition shadow-md text-sm md:text-base md:px-8"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`w-11 h-11 rounded-full overflow-hidden flex items-center justify-center focus:outline-none transition-all duration-300 shadow-sm border-2 ${showDropdown ? 'border-blue-500 ring-4 ring-blue-100' : 'border-white hover:border-blue-500 hover:ring-4 hover:ring-blue-50'}`}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 z-50 border">
                  <Link to="/Profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setShowDropdown(false); setMenuOpen(false); }}>Dashboard</Link>
                  <Link to="/Payment" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setShowDropdown(false); setMenuOpen(false); }}>Payment</Link>
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

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-100 ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="block py-3 px-2 font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
          {isLoggedIn && (
            <>
              <div className="border-t border-gray-100 my-2"></div>
              <li>
                <Link to="/Profile" className="block py-3 px-2 font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              </li>
              <li>
                <Link to="/Payment" className="block py-3 px-2 font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Payment</Link>
              </li>
              <li>
                <button onClick={() => { onLogout(); setMenuOpen(false); }} className="w-full text-left py-3 px-2 font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors">Log Out</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}