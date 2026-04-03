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
    <div className="min-h-screen bg-white pt-32 pb-12 px-6 md:px-12 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        
        {/* Left Column: Wallet Info */}
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold mb-4">My Wallet</h2>
            
            {/* Blue Card */}
            <div className="bg-blue-700 rounded-xl text-white p-8 grid grid-cols-2 gap-0 shadow-lg relative min-h-[200px]">
              {/* Divider in the middle */}
              <div className="absolute top-8 bottom-8 left-1/2 w-px bg-white/50"></div>
              
              <div className="flex flex-col items-center justify-between pr-4 h-full">
                <div className="text-center mb-8">
                  <p className="text-sm pb-2">Main balance</p>
                  <p className="text-2xl font-bold">0đ</p>
                </div>
                <div className="text-center">
                  <p className="text-sm pb-2">Debt</p>
                  <p className="text-2xl font-bold">0đ</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-between pl-4 h-full">
                <div className="text-center mb-8">
                  <p className="text-sm pb-2">Promotion</p>
                  <p className="text-2xl font-bold">0đ</p>
                </div>
                <div className="text-center">
                  <p className="text-sm pb-2">Expiration date</p>
                  <p className="text-2xl font-bold">&nbsp;</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Transaction history</h2>
            <p className="text-gray-500 italic text-sm">No transactions have been made yet!</p>
          </div>
        </div>

        {/* Right Column: Payment Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Select top-up amount (VND)</h2>
            <input 
              type="text" 
              placeholder="Enter amount" 
              className="w-full border border-gray-400 rounded px-4 py-3 outline-none focus:border-blue-500 mb-2 mt-1"
              value={amount}
              onChange={handleAmountChange}
            />
            <div className="grid grid-cols-3 gap-0 mt-4">
              {presetAmounts.map((val, index) => (
                <button 
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 text-sm transition border-y border-gray-100 border-r ${index === 0 ? 'border-l rounded-l' : ''} ${index === 2 ? 'rounded-r' : ''} border-r-white`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-xl font-bold mb-4">Select payment method</h2>
            <div className="space-y-4">
              
              {/* ZaloPay */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="payment" 
                  value="zalopay"
                  checked={paymentMethod === 'zalopay'}
                  onChange={() => setPaymentMethod('zalopay')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-800">Zalopay</span>
                  <img src="https://upload.wikimedia.org/wikipedia/vi/7/77/ZaloPay_Logo.png" alt="Zalopay" className="h-5 object-contain" onError={(e) => e.target.style.display='none'}/>
                </div>
              </label>

              {/* MoMo */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="payment" 
                  value="momo"
                  checked={paymentMethod === 'momo'}
                  onChange={() => setPaymentMethod('momo')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-800">Momo</span>
                  <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" className="h-5 object-contain" onError={(e) => e.target.style.display='none'}/>
                </div>
              </label>

              {/* Payoo */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="payment" 
                  value="payoo"
                  checked={paymentMethod === 'payoo'}
                  onChange={() => setPaymentMethod('payoo')}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-gray-800">Bank</span>
                </div>
              </label>

            </div>
          </div>

          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-md transition mt-6">
            Pay
          </button>
          
        </div>

      </div>
    </div>
  );
}
