export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Text Content */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">About BKies</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
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

        {/* App Showcase & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mt-16">
          {/* Phone Mockup */}
          <div className="md:col-span-1 flex justify-center">
            <div className="relative w-64 h-[500px] bg-black rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
               <img 
                src="https://images.unsplash.com/photo-1512428559083-a4979b2b91ef?q=80&w=2070&auto=format&fit=crop" 
                alt="BKies App Interface" 
                className="w-full h-full object-cover"
               />
            </div>
          </div>

          {/* QR & App Stores */}
          <div className="md:col-span-1 flex flex-col items-center justify-center space-y-6">
            <div className="p-4 bg-white shadow-xl rounded-2xl border border-gray-100">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BKies-App" 
                alt="QR Code to Download" 
                className="w-32 h-32"
              />
              <p className="text-center text-xs font-bold mt-2 text-gray-400">SCAN TO DOWNLOAD</p>
            </div>
            <div className="flex flex-col gap-3">
               <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 w-auto cursor-pointer hover:opacity-80" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" className="h-12 w-auto cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* Impact Stats */}
          <div className="md:col-span-1 space-y-12 text-center md:text-left">
            <div>
              <h4 className="text-6xl font-black text-blue-900">50K+</h4>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Total Rides</p>
            </div>
            <div>
              <h4 className="text-6xl font-black text-green-600">10 Tons</h4>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">CO2 Reduced</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}