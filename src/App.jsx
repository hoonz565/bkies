import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import HowToUse from './components/HowToUse'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />
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