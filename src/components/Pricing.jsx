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
            <div key={index} className={`p-8 rounded-3xl border-2 transition-all ${plan.popular ? 'border-blue-600 shadow-xl scale-105' : 'border-gray-100 hover:border-blue-200'}`}>
              {plan.popular && <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Most Popular</span>}
              <h3 className="text-2xl font-bold mt-4">{plan.title}</h3>
              <div className="my-6">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-gray-400 ml-2">/ {plan.duration}</span>
              </div>
              <p className="text-gray-600 mb-8">{plan.desc}</p>
              <button className={`w-full py-3 rounded-xl font-bold transition ${plan.popular ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}