export default function Footer() {
  return (
    <footer className="bg-[#062828] text-white py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="text-2xl font-black mb-6">BKies</div>
          <p className="text-gray-400">Smart mobility for the smart generation at HCMUT.</p>
        </div>
        <div>
          <h5 className="font-bold mb-6">Quick Links</h5>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-white cursor-pointer transition">Guide</li>
            <li className="hover:text-white cursor-pointer transition">Pricing</li>
            <li className="hover:text-white cursor-pointer transition">Stations</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6">Contact</h5>
          <ul className="space-y-4 text-gray-400">
            <li>info@bkies.hcmut.edu.vn</li>
            <li>+84 1900 XXXX</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6">Download App</h5>
          <div className="flex flex-col gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="w-32 cursor-pointer" alt="Play Store" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="w-32 cursor-pointer" alt="App Store" />
          </div>
        </div>
      </div>
      <div className="text-center mt-16 pt-8 border-t border-white/10 text-gray-500 text-sm">
        © 2026 BKies Project - Built by Software Engineering Students.
      </div>
    </footer>
  );
}