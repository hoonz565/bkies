import React from 'react';
import campus1 from '../assets/campus1.png';
import campus2 from '../assets/campus2.png';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Text Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">About BKies</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg text-left">
            <p>
              <span className="font-bold text-blue-700">BKies</span> is a public bike-sharing service service designed specifically for students
              and faculty at Ho Chi Minh City University of Technology (HCMUT).
              Our mission is to provide a smart, convenient, and eco-friendly transportation
              solution within the university campuses.
            </p>
            <p>
              With just a few taps on your smartphone, you can unlock a bike, navigate
              between lecture halls, and return it at any designated station. BKies
              seamlessly connects buildings, study areas, and dormitories, making
              campus life more mobile and time-efficient.
            </p>
            <p className="font-semibold text-blue-800">
              Currently available at:
              <span className="text-gray-700 ml-2">Campus 1 (District 10) & Campus 2 (Di An).</span>
            </p>
          </div>
        </div>

        {/* Campus Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 max-w-5xl mx-auto">

          {/* Campus 1 */}
          <div className="md:col-span-1 rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-100 h-[300px] hover:scale-105 transition-transform duration-300">
            <img
              src={campus1}
              alt="Campus 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Campus 2 */}
          <div className="md:col-span-1 rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-100 h-[300px] hover:scale-105 transition-transform duration-300">
            <img
              src={campus2}
              alt="Campus 2"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}