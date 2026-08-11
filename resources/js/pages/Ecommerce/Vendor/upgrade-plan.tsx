import React from 'react';
import { useForm, Link, router, usePage } from '@inertiajs/react';
import VendorLayout from '@/layouts/vendor-layout';
import { Card } from '@/components/ui/card';

const plans = [
  {
    id: 1,
    name: 'Lifetime Plan',
    amount: 100000,
    currency: 'NGN',
    description: 'One time payment for vendor plan upgrade',
    payment_method: 'paystack',
    agree: false,
  },
  {
    id: 2,
    name: 'Per product',
    amount: 5000,
    currency: 'NGN',
    description: 'Per product payment for vendor plan upgrade',
    payment_method: 'paystack',
    agree: false,
  }
];

export default function UpgradePlan() {
  const {vendor, email} = usePage().props;
  // console.log(vendor, email);
  const {data, setData, post, processing } = useForm({
    email: email,
    amount: null, // amount in kobo
    currency: 'NGN',
    description: '',
    payment_method: 'paystack',
    agree: false,
  });

 

 const handleUpgrade = async (e) => {
    e.preventDefault();
      console.log('Upgrading plan with data:', data);
    if (data.payment_method !== 'paystack') {
      // Handle other payment methods here
      post(route('vendor.upgrade-process'));
      return;
    }
    try {
      const response = await fetch(route('vendor.upgrade-process'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute('content'),
        },

        body: JSON.stringify({
          payment_method: data.payment_method,
          amount: data.amount,
          currency: data.currency,
          agree: data.agree,
          email: data.email,
        }),
        
      });

      const result = await response.json();

      if (result.authorization_url) {
        window.location.href = result.authorization_url; //  Redirect to Paystack
      } else {
        console.error('Payment init failed:', result);
      }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <VendorLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div className="w-full rounded-2xl p-8">
          <div className="max-w-3xl mx-auto">

          {vendor.vendor_plan !== 'free' && vendor.vendor_plan !== 'null' ? (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-4 text-lg">You’re already on the Paid Plan 🎉</p>
              <p className="text-green-800 font-semibold mb-4 text-md">Your current plan is: {vendor.vendor_plan}</p>
              
              <Link
                href={route('vendor.products.index')}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                Go Back to Dashboard
              </Link>
            </div>
          ) : (
            <>
              {/* <form onSubmit={handleUpgrade}>
              <div className="flex md:flex-row flex-col text-center m-4 gap-4 w-full">
              {plans.map((plan) => (
                <Card className='bg-white mx-4 shadow-lg p-4' key={plan.id}>
                <div className=''>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{plan.name}</h2>
            
                  <p className="text-gray-600 mb-6">
                    You’re currently on the <strong>Free Plan</strong>. You can upload just <strong>1</strong> product only.
                    Upgrade to the <strong>Paid Plan</strong> for unlimited product uploads and extra features.
                  </p>
                  <div>
                  </div>
                  
                        <div className="overflow-hidden rounded-md border py-4 border-gray-200">
                          <p className='text-gray-600'>We use Pay Stack for our payment method</p>
                          <p className="text-sm text-gray-600">
                            You will be redirected to PayStack to complete your payment.
                          </p>
                        </div>
                    
                    <div className="mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={data.agree}
                            onChange={(e) => setData('agree', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                          />

                          <span className="ml-2 text-sm text-gray-600">
                            I agree to the{' '}
                            <a href="/terms-conditions" className="text-indigo-600 hover:text-indigo-800">
                              Terms & Conditions
                            </a>{' '}
                            and{' '}
                            <a href="privacy-policy" className="text-indigo-600 hover:text-indigo-800">
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    <button
                      type="submit"
                      disabled={processing}
                      onClick={() => setData({
                          ...data,
                          amount:plan.amount,
                          description:plan.description
                        })
                      }
                      className="w-full bg-green-600 cursor-pointer transition-colors duration-200 text-white py-3 px-3 rounded-md font-semibold hover:bg-green-700"
                      >
                      Upgrade Now ₦{plan.amount.toLocaleString()}
                    </button>

                  <p className="mt-6 text-sm text-gray-500">
                    Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact support</a>
                  </p>
                </div>
                </Card>
              ))}
              </div>
              </form> */}
              <form onSubmit={handleUpgrade}>
                {/* Plans */}
                <div className="flex md:flex-row flex-col text-center m-4 gap-4 w-full">
                  {plans.map((plan) => (
                    <Card className="bg-white mx-4 shadow-lg p-4" key={plan.id}>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                          {plan.name}
                        </h2>

                        <p className="text-gray-600 mb-6">
                          You’re currently on the <strong>Free Plan</strong>. You can upload just{' '}
                          <strong>1</strong> product only. Upgrade to the <strong>Paid Plan</strong>{' '}
                          for unlimited product uploads and extra features.
                        </p>

                        <div className="overflow-hidden rounded-md border py-4 border-gray-200 mb-4">
                          <p className="text-gray-600">We use Pay Stack for our payment method</p>
                          <p className="text-sm text-gray-600">
                            You will be redirected to PayStack to complete your payment.
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={processing || !data.agree}
                          onClick={() =>
                            setData({
                              ...data,
                              amount: plan.amount,
                              description: plan.description,
                            })
                          }
                          className={`w-full transition-colors duration-200 text-white py-3 px-3 rounded-md font-semibold
                            ${
                              data.agree
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                          Upgrade Now ₦{plan.amount.toLocaleString()}
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* ✅ AGREEMENT CHECKBOX (single, centered) */}
                <div className="mt-6 flex justify-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.agree}
                      onChange={(e) => setData('agree', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      required
                    />

                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="/terms-conditions" className="text-indigo-600 hover:text-indigo-800">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" className="text-indigo-600 hover:text-indigo-800">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </form>

            </>
            
          )}
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
