import { useState } from 'react';
import step1Img from '../assets/step1.png';
import step2Img from '../assets/step2.png';
import step3Img from '../assets/step3.png';
import step4Img from '../assets/step4.png';

const steps = [
  { id: '01', title: 'Tap Student ID', desc: 'Place your HCMUT ID on the RFID reader for quick validation.', img: step1Img },
  { id: '02', title: 'Instant Unlock', desc: 'The smart lock disengages within 3 seconds upon successful ID verification.', img: step2Img },
  { id: '03', title: 'Commute Effortlessly', desc: 'Navigate between lecture halls efficiently using our 18kg lightweight e-bikes.', img: step3Img },
  { id: '04', title: 'Dock & Auto-pay', desc: 'Return the bike at any station. Your fare is automatically calculated based on distance.', img: step4Img },
];

export default function HowToUse() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-to-use" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 md:mb-16 text-center uppercase">HOW TO USE</h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <div className="w-full md:w-1/2 space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer p-5 md:p-6 rounded-2xl transition-all border-l-4 select-none ${activeStep === index ? 'bg-white shadow-xl border-blue-600 scale-[1.02] md:scale-105' : 'border-transparent opacity-50'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl md:text-2xl font-black text-blue-600 flex-shrink-0">{step.id}</span>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                {activeStep === index && <p className="mt-3 text-gray-600 leading-relaxed text-sm md:text-base">{step.desc}</p>}
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-white">
            <img src={steps[activeStep].img} alt="How it works" className="w-full h-auto object-contain transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}