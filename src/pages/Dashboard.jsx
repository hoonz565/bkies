import { BadgeCheck, MapPin, Leaf, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const recentTrips = [
    { id: 1, date: '03 Apr 2026', route: 'H6 -> H1', distance: '850m', cost: '2,000 VND' },
    { id: 2, date: '02 Apr 2026', route: 'Library -> H3', distance: '1.2km', cost: '3,000 VND' },
    { id: 3, date: '01 Apr 2026', route: 'H1 -> Dormitory', distance: '2.5km', cost: '5,000 VND' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-32 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8 mb-16">

        {/* Top Row: Profile & Financial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"
                alt="Nguyen Minh Hung"
                className="w-32 h-32 rounded-full object-cover shadow-sm border-4 border-white"
              />
            </div>
            <div className="flex flex-col items-start text-left pt-2">
              <h2 className="text-3xl font-bold text-[#2d0066]">NGUYEN MINH HUNG</h2>
              <div className="flex items-center gap-2 mt-3">
                <BadgeCheck className="w-5 h-5 text-[#0066cc]" />
                <span className="text-sm text-green-600 font-bold tracking-wide uppercase">Verified Student</span>
              </div>
              <div className="flex flex-col items-start space-y-1 mt-4 text-gray-600 font-medium w-full">
                <p>Student ID: <span className="font-bold text-gray-800">2352438</span></p>
                <p>Faculty: <span className="text-gray-800">Computer Science & Engineering</span></p>
              </div>
            </div>
          </div>

          {/* Financial Overview Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 h-full">

            {/* Left Side: Balance Info */}
            <div className="flex flex-col items-center text-center flex-1 w-full justify-center">
              <h3 className="text-gray-500 font-medium uppercase tracking-wider text-sm">Wallet Balance</h3>
              <div className="mt-3 flex items-baseline justify-center gap-2">
                <span className="text-4xl font-black text-[#2d0066]">45,000</span>
                <span className="text-xl font-bold text-gray-500">VND</span>
              </div>
              <p className="text-sm text-gray-400 font-medium mt-3 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Linked RFID ID: **** 5678
              </p>
            </div>

            {/* Divider Segment */}
            <div className="hidden sm:block w-px h-32 bg-gray-200 opacity-60"></div>
            <div className="block sm:hidden h-px w-3/4 bg-gray-200 opacity-60"></div>

            {/* Right Side: QR Code + Top Up Action */}
            <div className="flex flex-col items-center flex-1 w-full justify-center">
              <div className="bg-white p-3 rounded-2xl mb-4 border border-gray-100 shadow-sm w-[160px] h-[160px] flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://www.youtube.com/watch?v=PKQPey6L42M')}`}
                  alt="Top Up QR Code"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <Link
                to="/Payment"
                className="w-[160px] block bg-[#0066cc] hover:bg-blue-700 text-white shadow-md hover:shadow-lg px-4 py-3 rounded-xl font-bold transition-all text-center text-sm"
              >
                Top Up Balance
              </Link>
            </div>

          </div>
        </div>

        {/* Activity Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 transition hover:-translate-y-1 hover:shadow-md duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0066cc] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Distance</p>
              <p className="text-2xl font-bold text-[#2d0066]">12.5 km</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 transition hover:-translate-y-1 hover:shadow-md duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">CO2 Reduced</p>
              <p className="text-2xl font-bold text-[#2d0066]">3.2 kg</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 transition hover:-translate-y-1 hover:shadow-md duration-300">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Calories Burned</p>
              <p className="text-2xl font-bold text-[#2d0066]">450 kcal</p>
            </div>
          </div>
        </div>

        {/* Recent Trips Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#2d0066]">Recent Trips</h3>
            <button className="text-[#0066cc] font-semibold text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-[#f8f9fa] text-gray-500 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Route</th>
                  <th className="px-8 py-4">Distance</th>
                  <th className="px-8 py-4">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTrips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-8 py-5 text-gray-600 font-medium">{trip.date}</td>
                    <td className="px-8 py-5 text-[#2d0066] font-bold">{trip.route}</td>
                    <td className="px-8 py-5 text-gray-600">{trip.distance}</td>
                    <td className="px-8 py-5">
                      <span className="bg-blue-50 text-[#0066cc] px-3 py-1 rounded-full font-bold text-sm">
                        {trip.cost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
