'use client';

import { useFormState } from 'react-dom';
import { addIncome } from '@/app/actions/incomeActions';

const initialState = { message: null, errors: {} };

export function AddIncome() {
  const [state, dispatch] = useFormState(addIncome, initialState);

  return (
    <form action={dispatch} className="bg-gray-800 p-6 rounded-lg shadow-glow mb-8">
      <h3 className="text-xl font-bold mb-4">Add New Income</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="date" name="date" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="details" placeholder="Details" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="number" name="amount" placeholder="Amount" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="receivedBy" placeholder="Received By" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="text" name="category" placeholder="Category" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button type="submit" className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-all duration-300 ease-in-out shadow-glow">
        Add Income
      </button>
      {state?.message && <p className="mt-4 text-sm text-green-400 text-center">{state.message}</p>}
    </form>
  );
}
