export default function Navbar({ onLoginClick }) {
  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How to use', href: '#how-to-use' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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

        {/* Action Buttons */}
        <div className="flex gap-4 items-center">
          <button onClick={onLoginClick} className="text-gray-600 font-semibold hover:text-blue-600">Login</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-md">
            Get App
          </button>
        </div>
      </div>
    </nav>
  );
}