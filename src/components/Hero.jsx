export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full bg-black text-white overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558981403-c5f91dbbe980?q=80&w=2070&auto=format&fit=crop" 
          alt="BKies Mobility" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent opacity-90"></div>
      </div>

      <div className="container mx-auto px-10 md:px-20 z-10 relative">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter mb-8 uppercase">
            Solving the <br />
            <span className="text-blue-600">Mobility Gap</span> <br />
            at Bach Khoa.
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            A requirement-driven bike-sharing network designed to transform intra-campus travel 
            into a fluid, fast, and effortless experience for students.
          </p>
          <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Explore Project
          </button>
        </div>
      </div>

      <div className="absolute bottom-[-5%] right-[-5%] z-0 select-none pointer-events-none">
        <span className="text-[25vw] font-black text-white opacity-[0.05] uppercase tracking-tighter">BKies</span>
      </div>
    </section>
  );
}