import React from 'react';
import BikeImage from '../assets/bike.png';

export default function Features() {
  const callouts = [
    {
      id: 1,
      title: 'Scan Student ID Card',
      subtitle: 'to unlock',
      icon: '🪪',
      position: 'top-[8%] right-10 md:right-40',
      lineWidth: 'w-[238px]',
      lineAngle: 'rotate-[350deg]',
      linePosition: 'bottom-0 right-full',
      dotPosition: 'right-[220px]',
    },
    {
      id: 2,
      title: 'Wheel Sensor',
      subtitle: 'to track distance',
      icon: '📏',
      position: 'top-[30%] left-20 md:left-40',
      lineWidth: 'w-[140px]',
      lineAngle: 'rotate-[360deg]',
      linePosition: 'bottom-2 left-full',
      dotPosition: 'left-[140px]',
    },
  ];

  return (
    <section id="features" className="relative py-16 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Title Section */}
        <div className="mb-10 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">Features</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          <p className="mt-6 text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            A requirement-driven system utilizing existing campus infrastructure and precise sensing technology.
          </p>
        </div>

        {/* Desktop: Bike + floating callouts */}
        <div className="hidden md:flex relative justify-center items-center h-[600px] border-2 border-dashed border-gray-100 rounded-3xl p-10 bg-gray-50/50">
          {/* Bike Image */}
          <div className="relative z-10 w-[900px] h-auto group">
            <img src={BikeImage} alt="BKies Bike" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-[100px] opacity-10"></div>
          </div>

          {/* Callouts and Lines */}
          {callouts.map((c) => (
            <div key={c.id} className={`absolute ${c.position} z-20`}>
              <div className="bg-white p-6 rounded-2xl shadow-2xl border border-blue-50 w-[280px] text-left hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{c.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-lg">{c.title}</h4>
                    <p className="text-blue-700 font-semibold">{c.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className={`absolute ${c.linePosition} ${c.lineWidth} h-px bg-blue-400/50 origin-left ${c.lineAngle}`}>
                <div className={`absolute ${c.dotPosition} top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-md`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Bike image + cards below */}
        <div className="md:hidden flex flex-col items-center gap-8">
          {/* Bike image — constrained to screen width */}
          <div className="relative w-full max-w-sm mx-auto">
            <img src={BikeImage} alt="BKies Bike" className="w-full h-auto object-contain" />
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-[80px] opacity-10 pointer-events-none"></div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
            {callouts.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-2xl shadow-md border border-blue-50 text-left flex items-center gap-4">
                <span className="text-4xl flex-shrink-0">{c.icon}</span>
                <div>
                  <h4 className="font-extrabold text-gray-900 text-base">{c.title}</h4>
                  <p className="text-blue-700 font-semibold text-sm">{c.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}