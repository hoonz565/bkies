export default function Pricing() {
  const plans = [
    { title: 'Single Ride', price: '5,000 VND', duration: '30 mins', desc: 'Perfect for a quick trip across campus.' },
    { title: 'Daily Pass', price: '20,000 VND', duration: '24 hours', desc: 'Unlimited rides within a single day.' },
    { title: 'Student Monthly', price: '50,000 VND', duration: '30 days', desc: 'Best value for daily commuting students.', popular: true },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-16 text-gray-900">Service Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="p-8 rounded-3xl border-2 border-transparent bg-white shadow-sm transition-all duration-300 hover:border-blue-600 hover:shadow-2xl hover:scale-105 group cursor-pointer flex flex-col">
              <div className="h-8 flex items-start">
                {plan.popular && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">Most Popular</span>}
              </div>
              <h3 className="text-2xl font-bold mt-2">{plan.title}</h3>
              <div className="my-6">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-gray-400 ml-2">/ {plan.duration}</span>
              </div>
              <p className="text-gray-600 mb-8 flex-1">{plan.desc}</p>
              <button className="w-full py-3 rounded-xl font-bold transition-colors bg-gray-100 text-gray-800 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}