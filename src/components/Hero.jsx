import heroBikeBg from '../assets/hero_bike_bg.png';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full bg-white pt-[5.5rem] pb-4 md:pb-8 px-4 md:px-8 min-h-[500px] md:min-h-[750px] h-screen flex">
      {/* Inner container mimicking the dark 'screen' */}
      <div className="relative w-full h-full bg-[#0d0d0d] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col justify-center">

        {/* Background Graphic */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <img
            src={heroBikeBg}
            alt="BKies Bike Background"
            className="w-full h-full object-cover mix-blend-lighten opacity-90"
            style={{ objectPosition: '100% center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent"></div>
        </div>

        {/* Main Text */}
        <div className="relative z-10 px-6 md:px-20 max-w-4xl md:mt-[-40px]">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] leading-[1.1] font-semibold text-white tracking-tight mb-4 md:mb-6 mt-2 md:mt-4">
            Smart Mobility for the <br className="hidden md:block" />
            <span className="text-blue-500">Smart Generation.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-3xl font-light">
            The official high-tech bike-sharing system for HCMUT.
          </p>
        </div>

        {/* Bottom Left Social Block */}
        <div className="absolute bottom-0 left-0 z-20">
          <div className="bg-white rounded-tr-2xl md:rounded-tr-3xl px-5 md:px-8 py-3 md:py-5 flex items-center justify-center gap-4 md:gap-6">
            <a href="#" className="text-gray-900 hover:text-blue-600 transition">
              <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="text-gray-900 hover:text-blue-600 transition">
              <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
            </a>
            <a href="#" className="text-gray-900 hover:text-blue-600 transition">
              <svg className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}