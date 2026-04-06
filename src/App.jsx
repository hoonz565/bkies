import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import HowToUse from './components/HowToUse'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import Payment from './pages/Payment'
import Dashboard from './pages/Dashboard'
import PageTransition from './components/PageTransition'

// Fade wrapper for Auth modal-style appearance
function FadeWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.2,0.8,0.2,1)',
      }}
    >
      {children}
    </div>
  );
}
 b b    function AppRoutes({ isLoggedIn, onLogout, onLoginClick }) {
  return (
    <>
      <Navbar
        onLoginClick={onLoginClick}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />
      <PageTransition>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Features />
              <HowToUse />
              <Pricing />
            </>
          } />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Profile" element={<Dashboard />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
}

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (showAuth) {
    return (
      <FadeWrapper>
        <Auth
          onBack={() => setShowAuth(false)}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowAuth(false);
          }}
        />
      </FadeWrapper>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      <AppRoutes
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        onLoginClick={() => setShowAuth(true)}
      />
    </div>
  );
}

export default App