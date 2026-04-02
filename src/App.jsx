import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import HowToUse from './components/HowToUse'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Auth from './pages/Auth'

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (showAuth) {
    return <Auth 
      onBack={() => setShowAuth(false)} 
      onLoginSuccess={() => {
        setIsLoggedIn(true);
        setShowAuth(false);
      }} 
    />;
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar 
        onLoginClick={() => setShowAuth(true)} 
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
      />
      <Hero/>
      <About />
      <Features />
      <HowToUse />
      <Pricing />
      <Footer />
    </div>
  )
}

export default App