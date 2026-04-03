import { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export default function Payment() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('zalopay');

  const presetAmounts = ['50.000', '100.000', '200.000'];

  const formatAmount = (value) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    setAmount(formatAmount(e.target.value));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex justify-center text-gray-800">
      <div className="w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Wallet Info */}
        <div className="space-y-8 flex flex-col">
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-gray-500 font-bold mb-6 uppercase tracking-widest text-sm">My Wallet</h2>
            
            {/* Blue Card */}
            <div className="bg-[#0066cc] rounded-3xl text-white p-8 grid grid-cols-2 gap-0 shadow-md relative min-h-[220px]">
              {/* Divider in the middle */}
              <div className="absolute top-8 bottom-8 left-1/2 w-px bg-white/20"></div>
              
              <div className="flex flex-col items-center justify-between pr-4 h-full">
                <div className="text-center mb-8">
                  <p className="text-sm mb-2 font-medium text-blue-100">Main balance</p>
                  <p className="text-3xl font-black">0đ</p>
                </div>
                <div className="text-center">
                  <p className="text-sm mb-2 font-medium text-blue-100">Debt</p>
                  <p className="text-3xl font-black">0đ</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-between pl-4 h-full">
                <div className="text-center mb-8">
                  <p className="text-sm mb-2 font-medium text-blue-100">Promotion</p>
                  <p className="text-3xl font-black">0đ</p>
                </div>
                <div className="text-center">
                  <p className="text-sm mb-2 font-medium text-blue-100">Expiration date</p>
                  <p className="text-3xl font-black select-none text-transparent">-</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex-1">
            <h2 className="text-gray-500 font-bold mb-6 uppercase tracking-widest text-sm">Transaction history</h2>
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium text-sm">No transactions have been made yet</p>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
          <div className="space-y-8">
            <div>
              <h2 className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-sm">Select top-up amount <span className="normal-case tracking-normal">(VND)</span></h2>
              <input 
                type="text" 
                placeholder="Enter amount" 
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-50 transition-all font-bold text-lg text-gray-800 placeholder:text-gray-300 placeholder:font-medium"
                value={amount}
                onChange={handleAmountChange}
              />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {presetAmounts.map((val) => (
                  <button 
                    key={val}
                    onClick={() => setAmount(val)}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 font-bold py-3 text-sm transition-all rounded-xl border border-gray-100 shadow-sm"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-gray-500 font-bold mb-5 uppercase tracking-widest text-sm">Select payment method</h2>
              <div className="space-y-3">
                
                {/* ZaloPay */}
                <label className="flex items-center justify-between cursor-pointer group bg-gray-50 hover:bg-[#ebf4ff] p-4 rounded-xl border border-gray-100 transition-all">
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="zalopay"
                      checked={paymentMethod === 'zalopay'}
                      onChange={() => setPaymentMethod('zalopay')}
                      className="w-5 h-5 text-[#0066cc] border-gray-300 focus:ring-[#0066cc]"
                    />
                    <span className="text-gray-700 font-bold">Zalopay</span>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/vi/7/77/ZaloPay_Logo.png" alt="Zalopay" className="h-6 object-contain" onError={(e) => e.target.style.display='none'}/>
                </label>

                {/* MoMo */}
                <label className="flex items-center justify-between cursor-pointer group bg-gray-50 hover:bg-[#ebf4ff] p-4 rounded-xl border border-gray-100 transition-all">
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="momo"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="w-5 h-5 text-[#0066cc] border-gray-300 focus:ring-[#0066cc]"
                    />
                    <span className="text-gray-700 font-bold">Momo</span>
                  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" className="h-6 object-contain" onError={(e) => e.target.style.display='none'}/>
                </label>

                {/* Bank */}
                <label className="flex items-center justify-between cursor-pointer group bg-gray-50 hover:bg-[#ebf4ff] p-4 rounded-xl border border-gray-100 transition-all">
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="payoo"
                      checked={paymentMethod === 'payoo'}
                      onChange={() => setPaymentMethod('payoo')}
                      className="w-5 h-5 text-[#0066cc] border-gray-300 focus:ring-[#0066cc]"
                    />
                    <span className="text-gray-700 font-bold">Bank Transfer</span>
                  </div>
                </label>

              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full bg-[#0066cc] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-center">
              Pay Securely
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
